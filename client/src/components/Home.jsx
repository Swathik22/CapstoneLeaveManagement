import { useEffect, useState } from "react"
import { getAllPendingLeaves } from "../managers/leaveManager"
import "./Home.css"
import { useNavigate } from "react-router-dom"
import { Button } from "reactstrap"

export const Home=()=>{
const[pendingLeavesCount,setAllPendingLeavesCount]=useState(0)
const navigate=useNavigate()

useEffect(()=>{
    getAllPendingLeaves().then(data=>{
        setAllPendingLeavesCount(data.length)
    }) 

},[])

const handleLeave=()=>{
    navigate('/ApprovePendingLeaves')
}
     
    return (
        <>
        <div className="leave">
            Approve Pending Leaves: {pendingLeavesCount}
            <div>
                <Button onClick={handleLeave}>Manage Leaves</Button>
            </div>
        </div>
        </>
    )
}