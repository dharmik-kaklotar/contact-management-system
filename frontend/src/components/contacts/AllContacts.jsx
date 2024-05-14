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
import SkeletonLoading from "./SkeletonLoading";

const AllContacts = () => {
  const [loading, setLoading] = useState(false);

  const [contacts, setContacts] = useState(false);

  const GetUserContacts = async () => {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    setLoading(true);
    const res = await axios.get(
      "http://localhost:5000/api/contacts/all/public"
    );
    const data = await res.data;
    setContacts(data);
    setLoading(false);
  };
  useEffect(() => {
    GetUserContacts();
  }, []);
  const searchHandler = (q)=>{
    const filteredContacts = contacts.filter(
      (num) =>
        num.name.toLowerCase().includes(q.toLowerCase().trim()) ||
        num.email.toLowerCase().includes(q.toLowerCase().trim()) ||
        (num.phone &&
          num.phone
            .toString()
            .toLowerCase()
            .includes(q.toLowerCase().trim()))
    );
    setContacts(filteredContacts);
    if(!q){
      GetUserContacts();
    }
  };

  return (
    <div>
      <div className=" mt-4">
        <input
          type="text"
          placeholder="Search Contact By Name Or Email"
          className=" w-80 bg-slate-200 rounded-md focus:outline-none px-1 py-3 ml-5"
          onChange={(e) => {
            searchHandler(e.target.value);
          }}
        />
        <br />
        <br />
        <br />
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

export default AllContacts;
