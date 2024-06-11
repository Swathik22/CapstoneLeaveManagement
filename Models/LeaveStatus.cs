using System.ComponentModel.DataAnnotations;

public class LeaveStatus
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(255)]
    public string Status { get; set; }

    public List<Leave> Leaves { get; set; }
}
