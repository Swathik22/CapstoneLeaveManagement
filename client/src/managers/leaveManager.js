const _apiURL=`/api/leave`;

export const createLeave=async(leaveObj)=>{
    return await fetch(`${_apiURL}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify(userProfile)
    })
}

export const getAllLeaves=async()=>{
    return await fetch(`${_apiURL}`).then((res)=>res.json());
}

export const getLeaveById=async(id)=>{
    return await fetch(`${_apiURL}/${id}`).then((res)=>res.json());
}

export const updateLeave=async(leaveObj)=>{
    return await fetch(`${_apiURL}/${leaveObj.id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify(leaveObj)
    })
}

export const deleteLeave=async(id)=>{
    return await fetch(`${_apiURL}/${id}`,{
        method: "DELETE"
    })
}