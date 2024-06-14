using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace CapstoneLeaveManagement.Models;

public class UserProfile
{
    public int Id { get; set; }
    [Required]
    [MaxLength(255)]
    public string FirstName { get; set; }
    [Required]
    [MaxLength(255)]
    public string LastName { get; set; }

    public string UserName{get;set;}
    [Required]
    [MaxLength(255)]
    public string Email { get; set; }
    public long? PhoneNumber { get; set; }
    [Required]

    public string Photo { get; set; }

    public DateTime? DateOfBirth { get; set; }
    public DateTime HireDate { get;set;}
    public string Address { get; set; }

    public string IdentityUserId { get; set; }

    public IdentityUser IdentityUser { get; set; }

    public List<Leave> Leaves { get; set; }
}