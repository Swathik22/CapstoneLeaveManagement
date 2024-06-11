using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CapstoneLeaveManagement.Models.DTOs;

public class LeaveDTO
{
    [Key]
    public int Id { get; set; }

   
    public int EmployeeId { get; set; }
    public UserProfileDTO? Employee { get; set; }

   
    public DateTime StartDate { get; set; }

 
    public DateTime EndDate { get; set; }

   
    public int LeaveTypeId { get; set; }
    public LeaveTypeDTO? LeaveType { get; set; }
    public int? StatusId { get; set; }
    public LeaveStatusDTO? Status { get; set; }
}
