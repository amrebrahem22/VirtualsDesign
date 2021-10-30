const Services = require('../models/Services');
const ServiceItem = require('../models/ServiceItem');

exports.createService = async (req, res) => {
    try {
        const newService = new Services(req.body);
        const service = await newService.save();

        res.status(201).json({ success: true, service })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.updateService = async (req, res) => {
    try {
        const service = await Services.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        res.status(200).json({ success: true, service })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.deleteService = async (req, res) => {
    try {
        const service = await Services.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, service })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.detailService = async (req, res) => {
    try {
        const service = await Services.findById(req.params.id);

        res.status(200).json({ success: true, service })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.listService = async (req, res) => {
    try {
        const service = await Services.find();

        res.status(200).json({ success: true, service })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}


exports.createServiceItem = async (req, res) => {
    try {
        const newService = new ServiceItem(req.body);
        const service = await newService.save();

        res.status(201).json({ success: true, service })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.updateServiceItem = async (req, res) => {
    try {
        const service = await ServiceItem.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        res.status(200).json({ success: true, service })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.deleteServiceItem = async (req, res) => {
    try {
        const service = await ServiceItem.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, service })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.detailServiceItem = async (req, res) => {
    try {
        const service = await ServiceItem.findById(req.params.id);

        res.status(200).json({ success: true, service })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.listServiceItem = async (req, res) => {
    try {
        const service = await ServiceItem.find({service: req.params.id});

        res.status(200).json({ success: true, service })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.listServiceItemAll = async (req, res) => {
    try {
        const service = await ServiceItem.find().sort('-createdAt');

        res.status(200).json({ success: true, service })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}