const Jobs = require('../models/Jobs');

exports.createJob = async (req, res) => {
    try {

        const newJob = new Jobs(req.body);
        const job = await newJob.save();

        res.status(201).json({ success: true, job })

    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.updateJob = async (req, res) => {
    try {
        const job = await Jobs.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        res.status(200).json({ success: true, job })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.deleteJob = async (req, res) => {
    try {
        const job = await Jobs.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, job })
    } catch(err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.detailJob = async (req, res) => {
    try {
        const job = await Jobs.findById(req.params.id);

        res.status(200).json({ success: true, job })
    } catch(err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.listJobs = async (req, res) => {
    try {
        const jobs = await Jobs.find().sort('-createdAt');

        res.status(200).json({ success: true, jobs })
    } catch(err) {
        res.status(500).json({ success: false, message: err.message })
    }
}