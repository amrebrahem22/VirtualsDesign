const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = mongoose.Schema({
    title: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    thumb: { type: String, required: true },
    desc: { type: String, required: true, trim: true },
    category: { type: ObjectId, ref: 'Categories', required: true },
    author: { type: ObjectId, ref: 'Users' },
    comments: [{ type: ObjectId, ref: 'Comments' }],
}, { timestamps: true });

module.exports = mongoose.model('Posts', postSchema);
