const _apiURL=`/api/leaveStatus`;

export const getAllLeaveStatus=async()=>{
    return await fetch(_apiURL).then((res=>res.json()))
}

export const getLeaveStatusById=async(id)=>{
    return await fetch(`${_apiURL}/${id}`).then((res)=>res.json())
}