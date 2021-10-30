const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Categories', categorySchema);
