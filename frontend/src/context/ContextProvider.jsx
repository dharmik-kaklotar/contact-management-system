"use client"
import contactContext from "./contactContext";
import React,{useState,useEffect} from 'react';
import { useRouter } from "next/navigation";



const ContextProvider = ({children}) => {
    const router = useRouter();

  const [user,setUser] = useState();


  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem("userInfo")));
    if(!user){
      router.push("/");
    }else{
      router.push("/home");
    }
  },[]);

  return (
   <contactContext.Provider value={{user,setUser}}>
    {children}
   </contactContext.Provider>
  )
}

export default ContextProvider;
