import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getLeaveById, updateLeave } from "../../managers/leaveManager"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getAllLeaveTypes } from "../../managers/leaveTypeManager";
import { Button } from "reactstrap";
import { getLeaveStatusById } from "../../managers/leaveStatusManager";
import "./LeaveStyles.css";

export const UpdateLeave=({loggedInUser})=>{
    const[leave,setLeave]=useState({})
    const[allLeaveTypes,setAllLeaveTypes]=useState([])
    const[leaveStatus,setLeaveStatus]=useState("")
    const {id}=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        getLeaveById(id).then(data=>
            setLeave(data)          
        )

        getAllLeaveTypes().then(data=>{
            setAllLeaveTypes(data)
        })
    },[])

    useEffect(()=>{
        getLeaveStatusById(leave.statusId).then(data=>{
            setLeaveStatus(data)
        })
    },[leave])

    
    const handleInputChangesForForm=(event,date)=>{
        const leaveCopy={...leave}
        if(date==='startDate')
        {
            leaveCopy['startDate']=event
        }
        else if(date==='endDate')
        {
            leaveCopy['endDate']=event
        }
        else
        {
            leaveCopy[event.target.name]=event.target.value
        }
        setLeave(leaveCopy)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        updateLeave(leave).then(()=>{
            navigate(`/leave`)
        })
    }

    return (
        <>
        <h1 className="page-heading">Edit Leave</h1>
            <form onSubmit={handleSubmit} className="form-new-post">
                <div className="new-post-title">
                    <label>Start Date:</label>
                    <DatePicker
                        name="startDate"
                        selected={leave.startDate}
                        onChange={(e)=>handleInputChangesForForm(e,"startDate")}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <DatePicker
                        name="endDate"
                        selected={leave.endDate}
                        onChange={(e)=>handleInputChangesForForm(e,"endDate")}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                    />
                </div>
                <div className="new-post-category">
                    <label>LeaveType:</label>
                    <select
                        name="leaveTypeId"
                        value={leave.leaveTypeId}
                        onChange={(e)=>handleInputChangesForForm(e,"")}
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
                <div className="new-post-title">
                    <label>Status :  </label>
                    {leaveStatus?.status}
                </div>
                
                <div className="edit-post-btns">
                    <Button type="submit">Update Reaction</Button>
                    <Button onClick={() => {
                        navigate("/leave")
                        }}>
                        Cancel
                    </Button>
                </div>
            </form>
        </>
    )
}