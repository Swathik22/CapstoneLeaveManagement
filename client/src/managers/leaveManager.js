const _apiURL="/api/Leave";

// export const createLeave=async(leaveObj)=>{
//     return await fetch(_apiURL,{
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             },
//         body: JSON.stringify(leaveObj)
//     })
// }

export const createLeave = async (leaveObj) => {
    return await fetch(_apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(leaveObj),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 400) {
              return res.json();
            } else {
              return Promise.resolve({ errors: ["Unknown registration error"] });
            }
          });
};


export const getAllLeaves=async()=>{
    return await fetch(_apiURL).then((res)=>res.json());
}

export const getLeavesByEmployeeId=async(empId)=>{
    return await fetch(`${_apiURL}/employee/${empId}`).then((res)=>res.json());
}

export const getLeaveById=async(id)=>{
    return await fetch(`${_apiURL}/${id}`).then((res)=>res.json());
}

export const updateLeave=async(leaveObj)=>{
    const response=await fetch(`${_apiURL}/${leaveObj.id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify(leaveObj)
    })

    if(!response.ok)
    {
        throw new Error("Failed to update post");
    }
}

export const deleteLeave=async(id)=>{
    return await fetch(`${_apiURL}/${id}`,{
        method: "DELETE"
    })
}

export const getAllPendingLeaves=async()=>{
    return await fetch(`${_apiURL}/PendingLeaves`).then((res)=>res.json());
}

export const approveLeaveRequest=async(id)=>{
    return await fetch(`${_apiURL}/${id}/Approve`,{method:"POST"});
}

export const rejectLeaveRequest=async(id)=>{
    return await fetch(`${_apiURL}/${id}/Reject`,{method:"POST"});
}