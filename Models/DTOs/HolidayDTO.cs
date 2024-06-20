using System.ComponentModel.DataAnnotations;

public class HolidayDTO
{
    [Key]
    public int Id { get; set; }
    public DateTime Date{get;set;}
    public string Name{ get; set; }
}
