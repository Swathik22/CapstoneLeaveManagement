using System.ComponentModel.DataAnnotations;

namespace CapstoneLeaveManagement.Models;

public class Registration
{
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public string UserName { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public string Address { get; set; }

    [Required]
    public string photo{get;set;}

}