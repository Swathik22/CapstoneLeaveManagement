using System.ComponentModel.DataAnnotations;
namespace CapstoneLeaveManagement.Models.DTOs;
public class LeaveStatusDTO
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(255)]
    public string Status { get; set; }

    public List<LeaveDTO> Leaves { get; set; }
}
