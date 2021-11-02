const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    avatar: { type: String },
    isAdmin: { type: Boolean, default: false }
})

module.exports = mongoose.model('Users', userSchema);