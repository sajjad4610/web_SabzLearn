
export const UseUpLoader = async (data, api) => {

  const token = localStorage.getItem("user");

return  await fetch(api, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })
    .then((resPhoto) => {
      return resPhoto.json();
    })
    .then((rsultPhoto) => {
      return(rsultPhoto.uploaded);

    })


};
