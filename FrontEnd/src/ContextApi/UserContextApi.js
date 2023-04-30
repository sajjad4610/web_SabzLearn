import  {createContext} from "react"

 const userContext=createContext({

    isLogin:false,
    userInfo:null,
    token:null,
    setIsRefresh:()=>{},
    login:()=>{},
    logout:()=>{},
    
})

export default userContext