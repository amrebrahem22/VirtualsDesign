const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        location: { type: String, required: true, trim: true },
        desc: { type: String, required: true, trim: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Jobs", jobSchema);
