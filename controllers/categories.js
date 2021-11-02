const Categories = require('../models/Categories');

exports.createCategory = async (req, res) => {
    try {
        const newCategory = new Categories({name: req.body.name})
        const category = await newCategory.save();

        res.status(201).json({success: true, category})
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
}

exports.updateCategory = async (req, res) => {

    Categories.findById(req.params.id, (err, category) => {
        console.log(category)
        !category && res.status(400).json({success: false, message: 'Category with this ID does not exists.'})
    })

    try {
        const updated = await Categories.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name } }, { new: true });

        res.status(200).json({success: true, category: updated})
    } catch(err) {
        res.status(500).json({success: false, message: err.message})
    }
}

exports.deleteCategory = async (req, res) => {

    Categories.findById(req.params.id, (err, category) => {
        console.log(category)
        !category && res.status(400).json({success: false, message: 'Category with this ID does not exists.'})
    })

    try {
        const deleted = await Categories.findByIdAndDelete(req.params.id);

        res.status(200).json({success: true, category: deleted})
    } catch(err) {
        res.status(500).json({success: false, message: err.message})
    }
}

exports.ListCategories = async (req, res) => {

    try {
        const categories = await Categories.find().sort('-createdAt');

        res.status(200).json({success: true, categories: categories})
    } catch(err) {
        res.status(500).json({success: false, message: err.message})
    }
}
