# Leave Management in HRM
## Problem Solved
Leave Management in the HRM system streamlines the process of handling employee leave requests. This module enables employees to submit leave applications, specifying the type and duration of the leave. Administrators can review, approve, or reject these requests while ensuring adherence to company policies and maintaining adequate staffing levels.
## Database
Postgre SQL using PgAdmin
## Technologies Used
- React
- JavaScript
- Html5
- CSS and Bootstrap
- EFCore and LINQ
- Migrations
- ASP .Net Core Web API
- SQL, PostgreSQL
## Installation and Setup Instructions
Clone down this repository. You will need node and npm installed globally on your machine,and PGAdmin for the Database.
#### Installation:
>npm install
#### Run Web API:
>Serve
#### Run App:
>npm run dev  
>Redirect to login page  
>http://localhost:5173/login
## Essential Structure
Leave Management consists of several key features:
#### Employee Login
- As an employee, can access to his/her account by login.
#### View Profile
- By clicking on View Profile in the Navbar, employee can view his/her profile details.
#### Apply for Leave
- Employees can navigate to Leaves, he can view his leaves and on clicking Apply Leave, can apply for leave for specific type of leave and time period employee wants to apply
#### Edit or delete the Leave Applied
- Employees can edit and delete the leaves applied as per changes.
#### Admin Login
- Admin Login can manage employees applied leaves.
#### Approve/Reject Leave Applications
- Admin can view all the leaves applied by different Employees, can Approve or Reject the Leave

## WireFrame
  [WireFrame](https://miro.com/app/board/uXjVKA6Mf2w=/?share_link_id=30685031079)

## ERDiagram
  [ERDiagram](https://dbdiagram.io/d/HRManagement-65b980c9ac844320ae14507b)
## Reflection
  In this capstone, I was able to implement the CRUD operations, navigating between react components, able to use Routes and react-router and able to apply CSS my application.
  I connected the application to a database using Entity Framework Core (EF Core), allowing for efficient data handling and persistence.I leveraged LINQ and SQL for effective data querying and manipulation, optimizing the application's performance and functionality.

  One of the main challenges I ran into is Authenticating the userProfile.

  Additionally, I will implement unit tests in my application to verify the individual components and functions for correctness and robustness.  
  And I will work on improvising the application and complete the HRM.

  
  
  
