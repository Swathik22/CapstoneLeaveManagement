import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createLeave } from "../../managers/leaveManager"
import { Button } from "reactstrap";
import { getAllLeaveTypes } from "../../managers/leaveTypeManager";


export const CreateLeave=({loggedInUser})=>{
    // const[leave,setLeave]=useState({})
    const[startDate,setStartDate]=useState(null)
    const[endDate,setEndDate]=useState(null)
    const[allLeaveTypes,setAllLeaveTypes]=useState([])
    const[leaveType,setLeaveType]=useState("")
    const [errors, setErrors] = useState([]);
    const [isStartDateValid, setIsStartDateValid] = useState(true);


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
       
        createLeave(leave).then((res) => {
            if (res.errors) {
                setErrors(res.errors);
            } else {
                navigate("/leave");
            }
            })
    }


    return (
        <>
            <h5 className="page-heading">Apply Leave</h5>
            <form onSubmit={handleSubmit} className="form-new-post">
                <div className="new-post-title">
                    <label>Start Date:</label>
                    <DatePicker
                    required={true}
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd"                        
                        className="form-control"

                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <DatePicker
                    required={true}
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
                        required={true}
                        value={leaveType}
                        onChange={(e)=>setLeaveType(e.target.value)}
                    >
                        <option value="0" >Select LeaveType</option>
                        {allLeaveTypes.map(leaveType => (
                            <option key={leaveType.id} value={leaveType.id}>
                                {leaveType.type}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ color: "red" }}>
                    {/* {Array.isArray(errors)&&Object.keys(errors).map((key) => (
                        <p key={key}>
                        {key}: {errors[key]}
                        </p>
                    ))} */}
                    {
                        Array.isArray(errors)&&errors.map((e,i)=>{
                           return( <p key={i}>
                                {e.value}
                            </p>)
                        })
                    }
                </div>
                <Button type="submit">Apply Leave</Button>
            </form>
        </>
    )
}