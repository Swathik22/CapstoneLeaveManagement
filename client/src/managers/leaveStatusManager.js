const _apiURL=`/api/leaveStatus`;

export const getAllLeaveStatus=async()=>{
    return await fetch(_apiURL).then((res=>res.json()))
}