import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";
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
      <Link to="createLeave">Apply Leave</Link>
      <div className="userprofile-container">
        <h2>Leaves</h2>
        <Table striped>
          <thead>
            <tr>
              <th>start Date</th>
              <th>End Date</th>
              <th>LeaveType</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allLeavesByEmployee?.map((l) => (
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
                <td>{getLeaveStatus(l.statusId)}</td>
                <td>
                  <Button color="success" name={l.id} onClick={handleEdit}>
                    Edit
                  </Button>
                </td>
                <td>
                  <Button color="danger" name={l.id} onClick={handleDelete}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
