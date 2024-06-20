using CapstoneLeaveManagement.Models;
using CapstoneLeaveManagement.Models.DTOs;
using CapstoneLeaveManagement.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace CapstoneLeaveManagement.Controllers;
[ApiController]
[Route("api/[controller]")]
public class HolidayController:ControllerBase
{
    private CapstoneLeaveManagementDbContext _dbContext;
    public HolidayController(CapstoneLeaveManagementDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetAllHolidays()
    {
        List<HolidayDTO> AllHolidays=_dbContext.Holidays
                                .Select(l=>new HolidayDTO{
                                                        Id=l.Id,
                                                        Date=l.Date,
                                                        Name=l.Name}).ToList();

    if(AllHolidays==null)
    {
        return NotFound("No Leave types found.");
    }

    return Ok(AllHolidays);
    }
}
