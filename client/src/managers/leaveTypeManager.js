const _apiURL = `/api/leaveType`;

export const getAllLeaveTypes = async () => {
  return await fetch(_apiURL).then((res) => res.json());
};

export const getLeaveTypeById = async (id) => {
  return await fetch(`${_apiURL}/${id}`).then((res) => res.json());
};

export const createLeaveType = async (leaveTypeObj) => {
  return await fetch(_apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(leaveTypeObj),
  }).then((res) => {res.json()});
};
