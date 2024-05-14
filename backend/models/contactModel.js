const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true });

const Contact = mongoose.models.contacts || mongoose.model("contacts", contactSchema);

module.exports = Contact;