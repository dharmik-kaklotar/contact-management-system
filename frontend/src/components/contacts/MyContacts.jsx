"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toaster } from "react-hot-toast";
import AddOrUpdateContact from "./AddOrUpdateContact";
import SkeletonLoading from "./SkeletonLoading";
import DeleleContact from "./DeleleContact";
import { useRouter } from "next/navigation";

const MyContacts = () => {
  const router = useRouter();
  useEffect(() => {
    GetUserContacts();
    if (localStorage.getItem("userInfo")) {
      router.push("/home");
    } else {
      router.push("/");
    }
  }, []);
  const [loading, setLoading] = useState(false);

  const [contacts, setContacts] = useState(false);

  const GetUserContacts = async () => {
    if (localStorage.getItem("userInfo")) {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/contacts", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.data;
      console.log(data);
      setContacts(data);
      setLoading(false);
    }

    // const accending = data.sort((a, b) => {
    //   const nameA = a.name.toUpperCase();
    //   const nameB = b.name.toUpperCase();
    //   if (nameA < nameB) {
    //     return -1;
    //   }
    //   if (nameA > nameB) {
    //     return 1;
    //   }
    //   return 0;
    // });
    // console.log(accending);
  };

  const searchHandler = (q) => {
    // setLoading(true);
    // const token = JSON.parse(localStorage.getItem("userInfo")).token;
    // const res = await axios.get(`http://localhost:5000/api/contacts?search=${query}`, {
    //   headers: {
    //     authorization: `Bearer ${token}`,
    //   },
    // });
    // const data = await res.data;
    // setLoading(false);
    // setContacts(data);
    // // console.log(data);
    const filteredContacts = contacts.filter(
      (num) =>
        num.name.includes(q) ||
        num.email.includes(q) ||
        (num.phone && num.phone.toString().includes(q))
    );
    setContacts(filteredContacts);
    if (!q) {
      GetUserContacts();
    }
  };

  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className=" flex justify-between my-9 px-4">
        <input
          type="text"
          placeholder="Search Contact By Name/Email/Number"
          className=" w-80 bg-slate-200 rounded-md focus:outline-none px-1"
          onChange={(e) => {
            searchHandler(e.target.value);
          }}
        />
        <AddOrUpdateContact GetUserContacts={GetUserContacts} id="" />
      </div>

      <div className=" mt-4">
        {!loading ? (
          <Table className=" text-center">
            <TableCaption>A list of your All Contacts.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className=" text-center">Index</TableHead>
                <TableHead className=" text-center">Name</TableHead>
                <TableHead className=" text-center">Number</TableHead>
                <TableHead className=" text-center">Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts &&
                contacts.length > 0 &&
                contacts.map((contact, index) => {
                  return (
                    <TableRow key={contact.index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{contact.name}</TableCell>
                      <TableCell>{contact.phone}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>
                        <AddOrUpdateContact
                          GetUserContacts={GetUserContacts}
                          id={contact._id}
                        />
                      </TableCell>
                      <TableCell>
                        <DeleleContact
                          id={contact._id}
                          GetUserContacts={GetUserContacts}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        ) : (
          <SkeletonLoading />
        )}
      </div>
    </div>
  );
};

export default MyContacts;
