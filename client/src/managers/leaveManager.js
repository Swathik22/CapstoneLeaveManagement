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