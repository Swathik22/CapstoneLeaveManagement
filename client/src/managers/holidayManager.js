const _apiURL = `/api/holiday`;

export const getAllHolidays = async () => {
  return await fetch(_apiURL).then((res) => res.json());
};