using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using CapstoneLeaveManagement.Models;
using Microsoft.AspNetCore.Identity;
using Npgsql.Internal;

namespace CapstoneLeaveManagement.Data;
public class CapstoneLeaveManagementDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;    
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Leave> Leaves { get; set; }
    public DbSet<LeaveType> LeaveTypes { get; set; }
    public DbSet<LeaveStatus> LeaveStatuses { get; set; }

    public CapstoneLeaveManagementDbContext(DbContextOptions<CapstoneLeaveManagementDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser[]{
        new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        },
        new IdentityUser
        {
            Id = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
            UserName = "JohnDoe",
            Email = "john@doe.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        },
        new IdentityUser
        {
            Id = "a7d21fac-3b21-454a-a747-075f072d0cf3",
            UserName = "JaneSmith",
            Email = "jane@smith.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        },
        new IdentityUser
        {
            Id = "c806cfae-bda9-47c5-8473-dd52fd056a9b",
            UserName = "AliceJohnson",
            Email = "alice@johnson.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        },
        new IdentityUser
        {
            Id = "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
            UserName = "BobWilliams",
            Email = "bob@williams.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        },
        new IdentityUser
        {
            Id = "d224a03d-bf0c-4a05-b728-e3521e45d74d",
            UserName = "EveDavis",
            Email = "Eve@Davis.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        }});

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
       
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile[]
         {
            new UserProfile
            {
                Id = 1,
                IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                FirstName = "Admina",
                LastName = "Strator",
                UserName="Adminastrator",
                Email = "admina@strator.comx",
                Address = "101 Main Street",
                PhoneNumber = 1234567890,
                Photo = "john_doe_photo.png",
                HireDate = DateTime.Now,
                DateOfBirth = new DateTime(1984, 1, 1)
            },
            new UserProfile
            {
                Id = 2,
                FirstName = "John",
                LastName = "Doe",
                UserName="JohnDoe",
                Email = "john@doe.comx",
                PhoneNumber = 1234567890,
                Address = "123 Main St",
                Photo = "john_doe_photo.png",
                DateOfBirth = new DateTime(1985, 1, 1),  
                HireDate = DateTime.Now,       
                IdentityUserId = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
            },
            new UserProfile
            {
                Id = 3,
                FirstName = "Jane",
                LastName = "Smith",
                UserName="JaneSmith",
                Email = "jane@smith.comx",
                PhoneNumber = 2345678901,
                Address = "456 Elm St",
                Photo = "jane_smith_photo.png",
                DateOfBirth = new DateTime(1990, 2, 2),  
                HireDate = DateTime.Now,             
                IdentityUserId = "a7d21fac-3b21-454a-a747-075f072d0cf3",
            },
            new UserProfile
            {
                Id = 4,
                FirstName = "Alice",
                LastName = "Johnson",
                UserName="AliceJohnson",
                Email = "Alice@johnson.comx",
                PhoneNumber = 3456789012,
                Address = "789 Oak St",
                Photo = "alice_johnson_photo.png",
                DateOfBirth = new DateTime(1980, 3, 3),  
                HireDate = DateTime.Now,             
                IdentityUserId = "c806cfae-bda9-47c5-8473-dd52fd056a9b",
            },
            new UserProfile
            {
                Id = 5,
                FirstName = "Eve",
                LastName = "Davis",
                UserName="EveDavis",
                Email = "eve@davis.comx",
                PhoneNumber = 4567890123,
                Address = "101 Pine St",
                Photo = "Eve_davis_photo.png",
                DateOfBirth = new DateTime(1995, 4, 4),   
                HireDate = DateTime.Now,            
                IdentityUserId = "d224a03d-bf0c-4a05-b728-e3521e45d74d",
            },
            new UserProfile
            {
                Id = 6,
                FirstName = "Bob",
                LastName = "Wilson",                
                Email = "bob@wilson.comx",
                UserName="BodWilson",
                PhoneNumber = 5678901234,
                Address = "202 Maple St",
                Photo = "bob_wilson_photo.png",
                DateOfBirth = new DateTime(1987, 5, 5),
                HireDate = DateTime.Now,
                IdentityUserId = "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
            }
        }
        );

        modelBuilder.Entity<LeaveType>().HasData(new LeaveType[]{
            new LeaveType
            {
                Id = 1,
                Type = "Vacation",
                NumberOfDays = 10,
                Description = "Paid vacation leave"
            },
            new LeaveType
            {
                Id = 2,
                Type = "Sick",
                NumberOfDays = 5,
                Description = "Sick leave"
            },
            new LeaveType
            {
                Id = 3,
                Type = "Maternity",
                NumberOfDays = 30,
                Description = "Maternity leave"
            }
        }
        );    

        // Seeding data for LeaveStatus
        modelBuilder.Entity<LeaveStatus>().HasData(new LeaveStatus[]{
            new LeaveStatus
            {
                Id = 1,
                Status = "Pending"
            },
            new LeaveStatus
            {
                Id = 2,
                Status = "Approved"
            },
            new LeaveStatus
            {
                Id = 3,
                Status = "Rejected"
            }
        }
        );

        // Seeding data for Leave
        modelBuilder.Entity<Leave>().HasData(new Leave[]{
            new Leave
            {
                Id = 1,
                EmployeeId = 1,
                StartDate = new DateTime(2023, 6, 1),
                EndDate = new DateTime(2023, 6, 10),
                LeaveTypeId = 1,
                StatusId = 2
            },
            new Leave
            {
                Id = 2,
                EmployeeId = 2,
                StartDate = new DateTime(2023, 7, 1),
                EndDate = new DateTime(2023, 7, 5),
                LeaveTypeId = 2,
                StatusId = 1
            },
            new Leave
            {
                Id = 3,
                EmployeeId = 3,
                StartDate = new DateTime(2023, 8, 1),
                EndDate = new DateTime(2023, 8, 31),
                LeaveTypeId = 3,
                StatusId = 1
            }
        }
        );
        
    }
}