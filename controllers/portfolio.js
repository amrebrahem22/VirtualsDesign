const Portfolio = require('../models/Portfolio');

exports.createPortfolio = async (req, res) => {
    try {
        const newPortfolio = new Portfolio({...req.body, thumb: req.file.path});
        const portfolio = await newPortfolio.save();

        res.status(201).json({ success: true, portfolio });
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
}

exports.updatePortfolio = async (req, res) => {

    const finalThum = req.file ? req.file.path : req.body.thumb;
    
    try {
        const updated = await Portfolio.findByIdAndUpdate(req.params.id, {$set: {...req.body, thumb: finalThum}}, { new: true });

        res.status(200).json({success: true, updated});
    } catch(err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.deletePortfolio = async (req, res) => {
    
    try {
        const updated = await Portfolio.findByIdAndDelete(req.params.id);

        res.status(200).json({success: true, updated});
    } catch(err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.detailPortfolio = async (req, res) => {
    
    try {
        const post = await Portfolio.findById(req.params.id);

        res.status(200).json({success: true, post});
    } catch(err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.listPortfolio = async (req, res) => {
    
    try {
        const portfolio = await Portfolio.find().sort('-createdAt');

        res.status(200).json({success: true, portfolio});
    } catch(err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message })
    }
}
