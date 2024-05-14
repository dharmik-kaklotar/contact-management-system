"use client";
import React, { useContext, useEffect, useState } from 'react';
import contactContext from '@/context/contactContext';
import AllContacts from '@/components/contacts/AllContacts';
import MyContacts from '@/components/contacts/MyContacts';
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const HomePage = () => {
const router = useRouter();
  
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      router.push("/home");
    } else {
      router.push("/");
    }
  }, []);
    const { user, setUser } = useContext(contactContext);
    const [allContects,setAllContacts] = useState(false);

    const logoutHandler = ()=>{
      localStorage.removeItem("userInfo");
      
      router.push('/');
    }
  return (
    <>
      <div className=" bg-slate-700 flex  items-center text-white cursor-pointer">
        <div
          className=" w-[50vw]  h-16 bg-slate-800  flex justify-center items-center"
          onClick={() => setAllContacts(false)}
        >
          My Contacts
        </div>
        <div
          className=" w-[50vw]  h-16 bg-slate-800  flex justify-center items-center"
          onClick={() => setAllContacts(true)}
        >
          All Contacts
        </div>
      </div>
      <div className="flex justify-center items-center">
        <h1 className=" text-2xl text-center font-bold m-2 ">
          {allContects ? "All Contacts" : "My Contacts"}
        </h1>
        <Button variant="outline" className=" absolute right-3" onClick={logoutHandler}>
          Logout <LogOut size={16} className=' ml-2'/>
        </Button>
      </div>
      {allContects ? <AllContacts /> : <MyContacts />}
    </>
  );
}

export default HomePage;
