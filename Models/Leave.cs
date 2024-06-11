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

    [Required]
    public DateTime StartDate { get; set; }

    [Required]
    public DateTime EndDate { get; set; }
    public int LeaveTypeId { get; set; }
    public LeaveType? LeaveType { get; set; }
    public int? StatusId { get; set; }
    public LeaveStatus? Status { get; set; }
}
