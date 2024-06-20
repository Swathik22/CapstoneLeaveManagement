import { useEffect, useState } from "react"
import { Button } from "reactstrap"
import { createLeaveType } from "../../managers/leaveTypeManager"
import { useNavigate } from "react-router-dom"

export const NewLeaveType=()=>{
    const[leaveType,setLeaveType]=useState("")
    const[noOfDays,setNoOfDays]=useState(0)
    const[desc,setDesc]=useState("")

   const navigate=useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()
        const leaveTypeObjCopy={
            type:leaveType,
            numberOfDays:parseInt(noOfDays),
            description:desc
        }

        createLeaveType(leaveTypeObjCopy).then(()=>{
            navigate('/leaveType')
        })
        
    }
    return (
        <>
            <h4 className="page-heading">Apply Leave</h4>
            <form onSubmit={handleSubmit} className="form-new-post">                
                <div className="new-post-category">
                    <label>LeaveType</label>
                    <input type="text" value={leaveType} onChange={(e)=>{setLeaveType(e.target.value)}}/>
                </div>
                <div className="new-post-category">
                    <label>No. of Days</label>
                    <input type="text" value={noOfDays} onChange={(e)=>{setNoOfDays(e.target.value)}}/>
                </div>
                <div className="new-post-category">
                    <label>Description</label>
                    <textarea  rows={4} cols={40} value={desc} onChange={(e)=>{setDesc(e.target.value)}}/>
                </div>
                <div style={{ color: "red" }}>
                    
                </div>
                <Button type="submit">Save</Button>
            </form>
        </>
    )
}

