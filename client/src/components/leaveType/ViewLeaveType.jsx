import { useEffect, useState } from "react"
import { getAllLeaveTypes } from "../../managers/leaveTypeManager"
import { Table } from "reactstrap"
import { Link } from "react-router-dom"

export const ViewLeaveType=()=>{
    const[leaveTypes,setLeaveTypes]=useState([])

    useEffect(()=>{
        getAllLeaveTypes().then((data)=>{
            setLeaveTypes(data)
        })
    },[])
    return (
        <>
        <div>
       <Link to="createLeaveType">Add LeaveType</Link>
      </div>
      <div className="userprofile-container">
        
        <Table striped>
          <thead>
            <tr>
              <th>LeaveType</th>
              <th>No.Of Days</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {leaveTypes?.map((l) => (
              <tr key={l.id}>
                <td>
                  {l.type}
                </td>
                <td>
                  {l.numberOfDays}
                </td>  
                <td>
                  {l.description}
                </td>               
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
        </>
    )
}