using System.ComponentModel.DataAnnotations;

public class LeaveType
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(255)]
    public string Type { get; set; }

    [Required]
    public int NumberOfDays { get; set; }

    [MaxLength(255)]
    public string Description { get; set; }

    public List<Leave>? Leaves { get; set; }
}
