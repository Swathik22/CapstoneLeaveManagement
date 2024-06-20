using System.ComponentModel.DataAnnotations;

public class Holiday
{
    [Key]
    public int Id { get; set; }

    public DateTime Date{get;set;}
    public string Name{ get; set; }
}
