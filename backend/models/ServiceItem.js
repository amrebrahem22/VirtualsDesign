const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const serviceItemSchema = mongoose.Schema({
    title: { type: String, trim: true, required: true },
    desc: { type: String, trim: true, required: true },
    icon: { type: String, trim: true, required: true },
    service: { type: ObjectId, ref: 'Services' }
}, { timestamps: true });

module.exports = mongoose.model('ServiceItem', serviceItemSchema);
