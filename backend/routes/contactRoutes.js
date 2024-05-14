const express = require("express");
const { createContact, getUserContacts, updateContact, deletUserChat, getAllUsersContacts, constGetSingleContactUsingId } = require("../controllers/cotactControllers");
const { authUserToken } = require("../middleware/authUser");

const router = express.Router();

// router.route("").get(getAllContacts);
router.route("").post(authUserToken, createContact).get(authUserToken, getUserContacts);
router.route("/:id").put(authUserToken, updateContact).delete(authUserToken, deletUserChat).get(authUserToken, constGetSingleContactUsingId);
router.route("/all/public").get(getAllUsersContacts);


module.exports = router;