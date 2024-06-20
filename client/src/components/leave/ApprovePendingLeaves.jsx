import { useEffect, useState } from "react"
import { approveLeaveRequest, getAllLeaves, getAllPendingLeaves, rejectLeaveRequest } from "../../managers/leaveManager"
import { getAllLeaveTypes } from "../../managers/leaveTypeManager";
import { getAllLeaveStatus } from "../../managers/leaveStatusManager";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./LeaveStyles.css";

export const ApprovePendingLeaves=()=>{
    const[allPendingLeaves,setAllPendingLeaves]=useState([])    
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [leaveStatuses, setLeaveStatus] = useState([]);    
    const navigate=useNavigate()
    
    useEffect(()=>{
        getAllPendingLeaves().then(data=>{
            setAllPendingLeaves(data)
        })

        getAllLeaveTypes().then((types) => {
            setLeaveTypes(types);
          });
    
          getAllLeaveStatus().then((statuses) => {
            setLeaveStatus(statuses);
          });
    },[])

    const getLeaveType = (id) => {
        const leaveType = leaveTypes.find((type) => type.id === id);
        return leaveType ? leaveType.type : "Unknown";
    };

    const getLeaveStatus = (id) => {
        const leaveStatus = leaveStatuses.find((type) => type.id === id);       
        return leaveStatus ? leaveStatus.status : "Unknown";

    };

    const handleLeave = (id) => {
        approveLeaveRequest(id).then(()=>{               
            setTimeout(() => {
                navigate("/");
              }, 250); 
        }
        )
      
      };

      const handleLeaveReject = (id) => {
        rejectLeaveRequest(id).then(()=>{               
            setTimeout(() => {
                navigate("/");
              }, 250); 
        }
        )
      
      };


    return (
        <>      
      <div className="userprofile-container">
      <h4>Manage Employee Leaves</h4>
        <Table striped >
          <thead>
            <tr>
              <th>Employee</th>
              <th>start Date</th>
              <th>End Date</th>
              <th>LeaveType</th>              
              <th>Status</th>
              <th></th>        
            </tr>
          </thead>
          <tbody>
            {allPendingLeaves?.map((l) => (
              <tr key={l.id}>
                <td>
                  {l.employee?.userName}
                </td>
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
                  <Button color="success" onClick={() => handleLeave(l.id)}>
                      Approve
                  </Button>
                  &nbsp;&nbsp;  
                  <Button color="danger" onClick={() => handleLeaveReject(l.id)}>
                      Reject
                  </Button>
                </td>
                               
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
        </>
    )
}