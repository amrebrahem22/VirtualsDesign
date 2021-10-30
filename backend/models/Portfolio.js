const mongoose = require('mongoose');

const portfolioSchem = mongoose.Schema({
    title: { type: String, trim: true, required: true },
    subtitle: { type: String, trim: true, required: true },
    duration: { type: String, trim: true },
    deliverables: { type: String, trim: true },
    category: { type: String, trim: true },
    technologies: { type: String, trim: true, required: true },
    desc: { type: String, trim: true, required: true },
    thumb: { type: String, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchem);