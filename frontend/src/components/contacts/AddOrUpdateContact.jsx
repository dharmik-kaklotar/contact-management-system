import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FilePenLine } from "lucide-react";

const AddOrUpdateContact = ({ GetUserContacts, id }) => {
  const [contact, SetContact] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [savingContact, setSavingContact] = useState(false);

  useEffect(() => {
    if (id) {
      getContact();
    }
  }, []);

  const getContact = async () => {
    const token = await JSON.parse(localStorage.getItem("userInfo")).token;
    const res = await axios.get(`http://localhost:5000/api/contacts/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.data;
    SetContact(data);
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (!contact.name || !contact.email || !contact.phone) {
      toast.error("All feilds are Required!");
      return;
    }
    function isNumber(input) {
      return /^[0-9]+$/.test(input);
    }
    let num = contact.phone;
    if (!isNumber(num)) {
      toast.error("Please Enter Digit Only!");
      if (contact.phone.length != 10) {
        toast.error("Please Enter 10 Digit!");
      }
      return;
    }

    const token = await JSON.parse(localStorage.getItem("userInfo")).token;
    setSavingContact(true);
    if (id) {
      const res = await axios.put(
        `http://localhost:5000/api/contacts/${id}`,
        contact,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.data;
      setSavingContact(false);
      if (data.success) {
        toast.success(data.message);
        GetUserContacts();
      }
      if (!data.success) {
        toast.error(data.message);
        GetUserContacts();
        setSavingContact(false);
      }
    } else {
      const res = await axios.post(
        "http://localhost:5000/api/contacts",
        contact,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.data;
      setSavingContact(false);
      if (data.success) {
        toast.success(data.message);
        GetUserContacts();
      }
      if (!data.success) {
        toast.error(data.message);
        GetUserContacts();
        setSavingContact(false);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          {!id ? (
            <Button>
              Create New Contact <Plus strokeWidth={3} className=" ml-1" />
            </Button>
          ) : (
            <Button>
              Edit Contact
              <FilePenLine strokeWidth={2} className=" ml-2" />
            </Button>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className=" text-center">
            {" "}
            {id ? "Edit Contact" : "Add New Contact"}{" "}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              placeholder="Enter Contact Name"
              onChange={(e) => SetContact({ ...contact, name: e.target.value })}
              value={contact.name}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              required
              type="email"
              id="email"
              className="col-span-3"
              placeholder="Enter Contact Email"
              onChange={(e) =>
                SetContact({ ...contact, email: e.target.value })
              }
              value={contact.email}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="num" className="text-right">
              Number
            </Label>
            <Input
              type="number"
              id="num"
              className="col-span-3"
              placeholder="Enter Contact Number"
              onChange={(e) =>
                SetContact({ ...contact, phone: e.target.value })
              }
              value={contact.phone}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancle</Button>
          </DialogClose>
          <Button onClick={SubmitHandler} disabled={savingContact}>
            {savingContact
              ? "Loading..."
              : id
              ? "Update Contact"
              : "Create Contact"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrUpdateContact;
