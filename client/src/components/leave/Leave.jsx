import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Button, Table } from "reactstrap";
import {
  deleteLeave,
  getLeavesByEmployeeId,
} from "../../managers/leaveManager";
import {
  getAllLeaveTypes,
  getLeaveTypeById,
} from "../../managers/leaveTypeManager";
import { getAllLeaveStatus } from "../../managers/leaveStatusManager";
import "./LeaveStyles.css";

export const Leave = ({ loggedInUser }) => {
  const [allLeavesByEmployee, setAllLeavesByEmployee] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveStatuses, setLeaveStatus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser?.id) {
      getLeavesByEmployeeId(loggedInUser.id).then((data) => {
        setAllLeavesByEmployee(data);
      });

      getAllLeaveTypes().then((types) => {
        setLeaveTypes(types);
      });

      getAllLeaveStatus().then((statuses) => {
        setLeaveStatus(statuses);
      });
    }
  }, [loggedInUser]);

  const getLeaveType = (id) => {
    const leaveType = leaveTypes.find((type) => type.id === id);
    return leaveType ? leaveType.type : "Unknown";
  };

  const getLeaveStatus = (id) => {
    const leaveStatus = leaveStatuses.find((type) => type.id === id);
    return leaveStatus ? leaveStatus.status : "Unknown";
  };

  const handleEdit = (e) => {
    navigate(`/leave/${e.target.name}`);
  };

  const handleDelete = (e) => {
    deleteLeave(e.target.name).then(() => {
      getLeavesByEmployeeId(loggedInUser.id).then((data) => {
        setAllLeavesByEmployee(data);
      });
      navigate(`/leave`);
    });
  };

  return (
    <>
      <div style={{ float: "left", marginLeft : "85px", marginTop: "15px", fontWeight:"bold", fontSize:"20px" }}>
        <Link to="createLeave">Apply Leave</Link>
      </div>
      <div className="userprofile-container">
        <Table striped>
          <thead>
            <tr>
              <th>start Date</th>
              <th>End Date</th>
              <th>LeaveType</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allLeavesByEmployee?.map((l) =>{
              let statusColor = 'secondary';
              switch (l.statusId) {
                case 1:
                  statusColor = 'warning';
                  break;
                case 2:
                  statusColor = 'success';
                  break;
                default:
                  statusColor = 'danger';
              }
             return (
              <tr key={l.id}>
                <td>
                  {new Date(l.startDate).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>
                  {new Date(l.endDate).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>{getLeaveType(l.leaveTypeId)}</td>
                <td><Badge color={statusColor}>{getLeaveStatus(l.statusId)}</Badge></td>
                <td>
                  {
                    getLeaveStatus(l.statusId) === "Approved" ||getLeaveStatus(l.statusId) === "Rejected"
                    ?  <></>                  
                  :
                  <div>
                      <Button color="success" name={l.id} onClick={handleEdit}>
                        Edit
                      </Button>

                      <Button color="danger" name={l.id} onClick={handleDelete}>
                        Delete
                      </Button>
                  </div>
                  }

                </td>
              </tr>
            )
            
          }
            
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};
