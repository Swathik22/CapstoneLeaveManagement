using CapstoneLeaveManagement.Models;
using CapstoneLeaveManagement.Models.DTOs;
using CapstoneLeaveManagement.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace CapstoneLeaveManagement.Controllers;
[ApiController]
[Route("api/[controller]")]
public class LeaveController:ControllerBase
{
    private CapstoneLeaveManagementDbContext _dbContext;
    public LeaveController(CapstoneLeaveManagementDbContext context)
    {
        _dbContext = context;
    }

    [HttpPost]
    public IActionResult CreateLeave(Leave leave)
    {
        if(leave==null)
        {
            return BadRequest("Invalid data.");
        }

        leave.StatusId=1;

        _dbContext.Leaves.Add(leave);
        _dbContext.SaveChanges();
        return Created();
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetAllLeaves()
    {
        List<LeaveDTO> AllLeaves=_dbContext.Leaves
                                .Include(lt=>lt.LeaveType)
                                .Include(s=>s.Status)
                                .Include(e=>e.Employee)
                                .Select(l=>new LeaveDTO{
                                                        Id=l.Id,
                                                        EmployeeId=l.EmployeeId,
                                                        StartDate=l.StartDate,
                                                        EndDate=l.EndDate,
                                                        LeaveTypeId=l.LeaveTypeId,
                                                        StatusId=l.StatusId,
                                                    Employee=new UserProfileDTO{
                                                        Id=l.Employee.Id,
                                                        UserName=l.Employee.UserName,
                                                    },
                                                    LeaveType=new LeaveTypeDTO{
                                                        Id=l.LeaveType.Id,
                                                        Type=l.LeaveType.Type,
                                                        NumberOfDays=l.LeaveType.NumberOfDays,
                                                        Description=l.LeaveType.Description
                                                    },
                                                    Status=new LeaveStatusDTO{
                                                        Id=l.Status.Id,
                                                        Status=l.Status.Status
                                                    }
        }).ToList();

    if(AllLeaves==null)
    {
        return NotFound("No Leaves applied.");
    }

    return Ok(AllLeaves);
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetLeaveById(int id)
    {
        Leave Leave=_dbContext.Leaves
                                .Include(lt=>lt.LeaveType)
                                .Include(s=>s.Status)
                                .Include(e=>e.Employee)
                                .SingleOrDefault(l=>l.Id==id);

    if(Leave==null)
    {
        return NotFound("Leave not found");
    }

    LeaveDTO leaveById=new LeaveDTO
    {
        Id=Leave.Id,
        EmployeeId=Leave.EmployeeId,
        StartDate=Leave.StartDate,
        EndDate=Leave.EndDate,
        LeaveTypeId=Leave.LeaveTypeId,
        StatusId=Leave.StatusId
    };

    return Ok(leaveById);
    }

    [HttpGet("employee/{empId}")]
    [Authorize]
    public IActionResult GetAllLeavesByEmployeeId(int empId)
    {
        List<LeaveDTO> AllLeaves=_dbContext.Leaves
                                .Include(lt=>lt.LeaveType)
                                .Include(s=>s.Status)
                                .Include(e=>e.Employee)
                                .Where(l=>l.EmployeeId==empId)
                                .Select(l=>new LeaveDTO{
                                                        Id=l.Id,
                                                        EmployeeId=l.EmployeeId,
                                                        StartDate=l.StartDate,
                                                        EndDate=l.EndDate,
                                                        LeaveTypeId=l.LeaveTypeId,
                                                        StatusId=l.StatusId,
                                                    Employee=new UserProfileDTO{
                                                        Id=l.Employee.Id,
                                                        UserName=l.Employee.UserName,
                                                    },
                                                    LeaveType=new LeaveTypeDTO{
                                                        Id=l.LeaveType.Id,
                                                        Type=l.LeaveType.Type,
                                                        NumberOfDays=l.LeaveType.NumberOfDays,
                                                        Description=l.LeaveType.Description
                                                    },
                                                    Status=new LeaveStatusDTO{
                                                        Id=l.Status.Id,
                                                        Status=l.Status.Status
                                                    }
        }).ToList();

    if(AllLeaves==null)
    {
        return NotFound("No Leaves applied.");
    }

    return Ok(AllLeaves);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateLeave(int id,Leave leave)
    {
        Leave leaveToUpdate=_dbContext.Leaves.SingleOrDefault(l=>l.Id==id);

        if(leaveToUpdate==null)
        {
            return NotFound("Leave Not found");
        }

        leaveToUpdate.StartDate=leave.StartDate;
        leaveToUpdate.EndDate=leave.EndDate;
        leaveToUpdate.LeaveTypeId=leave.LeaveTypeId;
        leaveToUpdate.StatusId=leave.StatusId;

        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult deleteLeave(int id)
    {
        Leave leaveToDelete=_dbContext.Leaves.SingleOrDefault(l=>l.Id==id);

         if(leaveToDelete==null)
        {
            return NotFound("Leave Not found");
        }

        _dbContext.Leaves.Remove(leaveToDelete);
        _dbContext.SaveChanges();

        return Ok();
    }
}

   