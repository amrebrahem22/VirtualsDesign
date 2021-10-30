const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    website: { type: String, trim: true },
    content: { type: String, required: true, trim: true },
    postId: { type: ObjectId, ref: 'Posts', required: true }

}, { timestamps: true })

module.exports = mongoose.model('Comments', commentSchema);