const _apiURL=`/api/leaveType`;

export const getAllLeaveTypes=async()=>{
    return await fetch(_apiURL).then((res=>res.json()))
}