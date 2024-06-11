using CapstoneLeaveManagement.Models;
using CapstoneLeaveManagement.Models.DTOs;
using CapstoneLeaveManagement.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace CapstoneLeaveManagement.Controllers;
[ApiController]
[Route("api/[controller]")]
public class LeaveStatusController:ControllerBase
{
    private CapstoneLeaveManagementDbContext _dbContext;
    public LeaveStatusController(CapstoneLeaveManagementDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetAllLeaveStatus()
    {
        List<LeaveStatusDTO> AllLeaveStatus=_dbContext.LeaveStatuses
                                .Select(l=>new LeaveStatusDTO{
                                                        Id=l.Id,
                                                        Status=l.Status}).ToList();

    if(AllLeaveStatus==null)
    {
        return NotFound("No Leave Statuses found.");
    }

    return Ok(AllLeaveStatus);
    }

    
}

   