import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '../ui/button';
import axios from "axios";
import {  toast } from "react-hot-toast";
import {Trash2} from "lucide-react"

const DeleleContact = ({ id, GetUserContacts}) => {
  const token = JSON.parse(localStorage.getItem("userInfo")).token;
  const deleteContactHandler = async () => {
    const res = await axios.delete(`http://localhost:5000/api/contacts/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await res.data;
    if (data.success) {
      toast.success(data.message);
      GetUserContacts();
    }
    if (!data.success) {
      toast.error(data.message);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          Delete
          <Trash2 strokeWidth={2.25} className=' ml-1' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure To Delete Contect?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Contact and remove All Contact data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteContactHandler();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleleContact
