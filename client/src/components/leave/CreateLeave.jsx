import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createLeave } from "../../managers/leaveManager"
import { Button } from "reactstrap";
import { getAllLeaveTypes } from "../../managers/leaveTypeManager";
import { getAllLeaveStatus } from "../../managers/leaveStatusManager";
// import "./LeaveStyles.css";

export const CreateLeave=({loggedInUser})=>{
    // const[leave,setLeave]=useState({})
    const[startDate,setStartDate]=useState(null)
    const[endDate,setEndDate]=useState(null)
    const[allLeaveTypes,setAllLeaveTypes]=useState([])
    const[leaveType,setLeaveType]=useState("")
    // const[allLeaveStatus,setAllLeaveStatus]=useState([])
    // const[leaveStatus,setLeaveStatus]=useState("")

    const navigate = useNavigate();

    useEffect(()=>{
        getAllLeaveTypes().then(data=>{
            setAllLeaveTypes(data)
        })

        // getAllLeaveStatus().then(data=>{
        //     setAllLeaveStatus(data)
        // })
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault()
        const leave={
            employeeId: loggedInUser.id,
            startDate:startDate,
            endDate:endDate,
            leaveTypeId:leaveType
        }
       
        createLeave(leave).then(()=>{
            navigate(`/leave`)
        })
    }


    return (
        <>
            <h1 className="page-heading">Apply Leave</h1>
            <form onSubmit={handleSubmit} className="form-new-post">
                <div className="new-post-title">
                    <label>Start Date:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                    />
                </div>
                <div className="new-post-category">
                    <label>LeaveType:</label>
                    <select
                        name="leaveType"
                        value={leaveType}
                        onChange={(e)=>setLeaveType(e.target.value)}
                        required
                    >
                        <option value="0" >Select LeaveType</option>
                        {allLeaveTypes.map(leaveType => (
                            <option key={leaveType.id} value={leaveType.id}>
                                {leaveType.type}
                            </option>
                        ))}
                    </select>
                </div>
                {/* <div className="new-post-category">
                    <label>LeaveStatus:</label>
                    <select
                        name="leaveStatus"
                        value={leaveStatus}
                        onChange={(e)=>setLeaveStatus(e.target.value)}
                        required
                    >
                        <option value="0">Select LeaveStatus</option>
                        {allLeaveStatus.map(leaveStatus => (
                            <option key={leaveStatus.id} value={leaveStatus.id}>
                                {leaveStatus.status}
                            </option>
                        ))}
                    </select>
                </div> */}
                
                
                <Button type="submit">Apply Leave</Button>
            </form>
        </>
    )
}