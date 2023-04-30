const token = localStorage.getItem("user");
const GetServises = async (GetApi) => {
  const res = await fetch(GetApi, {
    headers: {
        Authorization: `Bearer ${token}`,
      },
  });
    const result = await res.json();
    return result
};
export default GetServises;
