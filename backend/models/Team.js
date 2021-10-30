const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    picture: { type: String, required: true },
    major: { type: String, required: true, trim: true },
    linkedin: { type: String, required: true, trim: true },
    facebook: { type: String, required: true, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
