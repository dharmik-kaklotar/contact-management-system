import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

const EditContact = () => {
  const EditContactHandler = async () => {
    const token = await JSON.parse(localStorage.getItem("userInfo")).token;
    const id = "660ff41d5c13dcc20a872ab1";

    const data = await res.data;
    console.log(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button>
            Edit Contact
            <FilePenLine strokeWidth={2} className=" ml-2" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className=" text-center">Add New Contact</DialogTitle>
          {/* <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
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
              //  onChange={(e) => SetContact({ ...contact, name: e.target.value })}
              //  value={contact.name}
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
              //  onChange={(e) => SetContact({ ...contact, email: e.target.value })}
              //  value={contact.email}
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
              //  onChange={(e) => SetContact({ ...contact, phone: e.target.value })}
              //  value={contact.phone}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancle</Button>
          </DialogClose>
          <Button onClick={EditContactHandler}>
            {/* {savingContact ? "Loading..." : "Save Contact"} */}
            Save Contact
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditContact;
