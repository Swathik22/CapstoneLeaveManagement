using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CapstoneLeaveManagement.Models;

public class Leave
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int EmployeeId { get; set; }
    public UserProfile? Employee { get; set; }

    [Required(ErrorMessage = "Start date is required.")]
    public DateTime StartDate { get; set; }

    [Required(ErrorMessage = "End date is required.")]
    public DateTime EndDate { get; set; }
    public int LeaveTypeId { get; set; }
    public LeaveType? LeaveType { get; set; }
    public int? StatusId { get; set; }
    public LeaveStatus? Status { get; set; }
}
