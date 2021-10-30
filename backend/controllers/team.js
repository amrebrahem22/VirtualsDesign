const Team = require('../models/Team');

exports.createMember = async (req, res) => {
    try {
        const newMember = new Team({...req.body, picture: req.file.path});
        const member = await newMember.save();

        res.status(201).json({ success: true, member })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.updateMember = async (req, res) => {
    const finalThum = req.file ? req.file.path : req.body.picture;
    try {
        const member = await Team.findByIdAndUpdate(req.params.id, { $set: {...req.body, picture: finalThum} }, { new: true });

        res.status(200).json({ success: true, member })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.deleteMember = async (req, res) => {
    try {
        const member = await Team.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, member })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.detailMember = async (req, res) => {
    try {
        const member = await Team.findById(req.params.id);

        res.status(200).json({ success: true, member })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.listTeam = async (req, res) => {
    try {
        const team = await Team.find().sort('-createdAt');

        res.status(200).json({ success: true, team })
    } catch(err) {
        res.status(500).json({ success: false, message: err.message })
    }
}
