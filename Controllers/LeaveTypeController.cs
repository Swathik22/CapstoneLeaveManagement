using CapstoneLeaveManagement.Models;
using CapstoneLeaveManagement.Models.DTOs;
using CapstoneLeaveManagement.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace CapstoneLeaveManagement.Controllers;
[ApiController]
[Route("api/[controller]")]
public class LeaveTypeController:ControllerBase
{
    private CapstoneLeaveManagementDbContext _dbContext;
    public LeaveTypeController(CapstoneLeaveManagementDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetAllLeaveTypes()
    {
        List<LeaveTypeDTO> AllLeaveTypes=_dbContext.LeaveTypes
                                .Select(l=>new LeaveTypeDTO{
                                                        Id=l.Id,
                                                        Type=l.Type,
                                                        NumberOfDays=l.NumberOfDays,
                                                        Description=l.Description}).ToList();

    if(AllLeaveTypes==null)
    {
        return NotFound("No Leave types found.");
    }

    return Ok(AllLeaveTypes);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public IActionResult CreateLeaveType(LeaveType leaveType)
    {
        if(leaveType==null)
        {
            return BadRequest("Invalid Data");
        }

        _dbContext.LeaveTypes.Add(leaveType);
        _dbContext.SaveChanges();

        return Created($"/api/reaction/{leaveType.Id}",leaveType);
    }
    
}

   