const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    title: { type: String, trim: true, required: true },
    desc: { type: String, trim: true, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Services', serviceSchema);
