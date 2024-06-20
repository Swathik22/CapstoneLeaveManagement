using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;
using CapstoneLeaveManagement.Models;
using CapstoneLeaveManagement.Models.DTOs;
using CapstoneLeaveManagement.Data;
using System.Text.RegularExpressions;

namespace CapstoneLeaveManagement.Controllers;


[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private CapstoneLeaveManagementDbContext _dbContext;
    private UserManager<IdentityUser> _userManager;

    public AuthController(CapstoneLeaveManagementDbContext context, UserManager<IdentityUser> userManager)
    {
        _dbContext = context;
        _userManager = userManager;
    }

    [HttpPost("login")]
    public IActionResult Login([FromHeader(Name = "Authorization")] string authHeader)
    {
        try
        {
            string encodedCreds = authHeader.Substring(6).Trim();
            string creds = Encoding
            .GetEncoding("iso-8859-1")
            .GetString(Convert.FromBase64String(encodedCreds));

            // Get email and password
            int separator = creds.IndexOf(':');
            string email = creds.Substring(0, separator);
            string password = creds.Substring(separator + 1);

            var user = _dbContext.Users.Where(u => u.Email == email).FirstOrDefault();
            var userRoles = _dbContext.UserRoles.Where(ur => ur.UserId == user.Id).ToList();
            var hasher = new PasswordHasher<IdentityUser>();
            var result = hasher.VerifyHashedPassword(user, user.PasswordHash, password);
            if (user != null && result == PasswordVerificationResult.Success)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName.ToString()),
                    new Claim(ClaimTypes.Email, user.Email)

                };

                foreach (var userRole in userRoles)
                {
                    var role = _dbContext.Roles.FirstOrDefault(r => r.Id == userRole.RoleId);
                    claims.Add(new Claim(ClaimTypes.Role, role.Name));
                }

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity)).Wait();

                return Ok();
            }

            return new UnauthorizedResult();
        }
        catch (Exception ex)
        {
            return StatusCode(500);
        }
    }

    [HttpGet]
    [Route("logout")]
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
    public IActionResult Logout()
    {
        try
        {
            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme).Wait();
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500);
        }
    }

    [HttpGet("Me")]
    [Authorize]
    public IActionResult Me()
    {
        var identityUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = _dbContext.UserProfiles.SingleOrDefault(up => up.IdentityUserId == identityUserId);
        var roles = User.FindAll(ClaimTypes.Role).Select(r => r.Value).ToList();
        if (profile != null)
        {
            var userDto = new UserProfileDTO
            {
                Id = profile.Id,
                FirstName = profile.FirstName,
                LastName = profile.LastName,
                Address = profile.Address,
                IdentityUserId = identityUserId,
                hireDate=profile.HireDate,
                UserName = User.FindFirstValue(ClaimTypes.Name),
                Photo=profile.Photo,
                Email = User.FindFirstValue(ClaimTypes.Email),
                Roles = roles
            };

            return Ok(userDto);
        }
        return NotFound();
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(Registration registration)
    {
        var user = new IdentityUser
        {
            UserName = registration.UserName,
            Email = registration.Email
        };

// Decode the base64 image and save it
            if (!string.IsNullOrEmpty(registration.photo))
            {
                var base64Data = Regex.Match(registration.photo, @"data:image/(?<type>.+?);base64,(?<data>.+)").Groups["data"].Value;
                var imageType = Regex.Match(registration.photo, @"data:image/(?<type>.+?);base64,(?<data>.+)").Groups["type"].Value;

                if (!string.IsNullOrEmpty(base64Data) && !string.IsNullOrEmpty(imageType))
                {
                    byte[] imageBytes = Convert.FromBase64String(base64Data);
                    string imageName = Guid.NewGuid()+"." + imageType;
                    var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads",imageName);
                    try
                    {
                        System.IO.File.WriteAllBytes(imagePath, imageBytes);
                        registration.photo = imageName; 
                    }
                    catch (Exception ex)
                    {
                        return StatusCode(500, $"Internal server error: {ex.Message}");
                    }
                }
                else
                {
                    return BadRequest("Invalid image format");
                }
            }

        var password = Encoding
            .GetEncoding("iso-8859-1")
            .GetString(Convert.FromBase64String(registration.Password));
      

        var result = await _userManager.CreateAsync(user, password);
        if (result.Succeeded)
        {
            _dbContext.UserProfiles.Add(new UserProfile
            {
                FirstName = registration.FirstName,
                LastName = registration.LastName,
                Address = registration.Address,
                UserName=registration.FirstName+registration.LastName,
                Email=registration.Email,
                HireDate=DateTime.Now,
                Photo=registration.photo,
                IdentityUserId = user.Id,
            });
            _dbContext.SaveChanges();

            var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName.ToString()),
                    new Claim(ClaimTypes.Email, user.Email)

                };
            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimsIdentity)).Wait();

            return Ok();
        }
        return StatusCode(500);
    }
}