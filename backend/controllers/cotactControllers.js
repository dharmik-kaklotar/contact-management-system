const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");



//@desc            Create New Contact
//@route           POST /api/contacts
//@access          Private (Token required)
const createContact = asyncHandler(async(req, res) => {
    if (req.user) {
        const { name, email, phone } = req.body;

        const existContact = await Contact.findOne({ name, userId: req.user._id });

        if (existContact) {
            res.status(200).json({ message: "Contact Already Exist!", success: false });
        }

        if (!name || !email || !phone) {
            res.status(200).json({ message: "Please Provide All Feilds!", success: false });
        }
        const createdContact = await Contact({ name, email, phone, userId: req.user._id });
        const savedContact = await createdContact.save();

        if (savedContact) {
            res.status(201).json({ message: "Contact Created Successfully !", data: savedContact, success: true });
        } else {
            res.status(200).json({ message: "Contact Not Created! Something Went Wrong" });
        }
    } else {
        res.status(200).json({ message: "User Not LoggedIn! OR invalid User" });
    }
});

//@desc            Get Single Contact using Id
//@route           GET /api/contacts/id
//@access          Private (Token required)
const constGetSingleContactUsingId = asyncHandler(async(req, res) => {
    const id = req.params.id;
    let contact = await Contact.findById(id);
    if (contact) {
        res.status(200).send(contact);
    } else {
        res.status(400).json({ message: "Something Went wrong! Users Not fatched", success: false })
    }
});

//@desc            Get All contact Of User Contact OR Get  Single Contact(search by name, email or number)
//@route           GET /api/contacts  OR  GET /api/contacts?search=ad
//@access          Private (Token required)
const getUserContacts = asyncHandler(async(req, res) => {
    if (req.user) {
        const searched = req.query.search;

        if (searched) {
            function isNumber(input) {
                return /^[0-9]+$/.test(input);
            }
            if (isNumber(searched)) {
                const user = await Contact.find({ userId: req.user._id, phone: searched })
                if (user) {
                    res.json(user)
                } else {
                    res.status(400).json({ message: "No User Found!", success: false })
                }
            } else {
                const searchquery = {
                    $or: [
                        { name: { $regex: req.query.search, $options: 'i' } },
                        { email: { $regex: req.query.search, $options: 'i' } },
                    ],
                    userId: req.user._id
                };
                const users = await Contact.find(searchquery);
                if (users) {
                    res.json(users)
                } else {
                    res.status(400).json({ message: "No User Found!", success: false })
                }
            }

        } else {
            const contacts = await Contact.find({ userId: req.user._id });
            if (contacts) {

                res.status(200).send(contacts);
            } else {
                res.status(400).json({ message: "Something Went wrong! Users Not fatched", success: false })
            }
        }
    } else {
        res.status(400).json({ message: "User Not LoggedIn! OR invalid User" });
    }
});

//@desc            Update a contact Of user
//@route           PUT /api/contacts:id
//@access          Private (Token required)
const updateContact = asyncHandler(async(req, res) => {
    if (req.user) {
        const ctId = req.params.id;
        const { name, email, phone } = req.body;

        const updatedContact = await Contact.findOneAndUpdate({ _id: ctId, userId: req.user._id }, { name, email, phone }, {
            new: true,
        });
        if (updatedContact) {
            res.status(200).json({ message: "updated Contact Successfully", data: updatedContact, success: true });
        } else {
            res.status(200).json({ message: "Someting went wrong !Contact Not Updated", success: true });
        }
    } else {
        res.status(400).json({ message: "User Not LoggedIn! OR invalid User" });
    }
});

//@desc            Delete a contact Of user
//@route           DELETE /api/contacts:id
//@access          Private (Token required)
const deletUserChat = asyncHandler(async(req, res) => {
    const cid = req.params.id;

    const deletedcontact = await Contact.findOneAndDelete({ _id: cid, userId: req.user._id });
    if (deletedcontact) {

        res.status(200).json({ message: "Contact Deleted Successfully", data: deletedcontact, success: true });
    } else {
        res.status(200).json({ message: "Contact Not Deleted , Something went wrong ", success: false });
    }
});

//@desc            Fetch All User's Contacts
//@route           GET /api/contacts/all
//@access          Public

const getAllUsersContacts = asyncHandler(async(req, res) => {
    const allContacts = await Contact.find({}, { name: 1, email: 1, phone: 1 });
    if (allContacts) {
        res.status(200).send(allContacts);
    } else {
        res.status(400).json({ message: "Can't Get All User's Contacts!" });
    }
});

module.exports = { createContact, getUserContacts, updateContact, deletUserChat, getAllUsersContacts, constGetSingleContactUsingId };