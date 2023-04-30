const GetMe =async(token , login)=>{
  await  fetch(`http://localhost:4000/v1/auth/me`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          login(result.decodeToken);
        });
}

export default GetMe