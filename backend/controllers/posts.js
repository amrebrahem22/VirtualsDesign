const Posts = require("../models/Posts");

exports.listPosts = async (req, res) => {
    const { sort, order, page, limit } = req.query;

    const pageNum = parseInt(page) || 1;
    const perPage = parseInt(limit) || 3;

    try {
        const postsCount = await Posts.find().count()
        const posts = await Posts.find().limit(perPage).skip((pageNum -1) * perPage).populate("category author comments").sort([[sort, order]]);
        const pagesNumber = Math.ceil(postsCount / perPage)

        res.status(200).json({ success: true, postsCount, pagesNumber, page: pageNum, posts });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.detailPost = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id).then(p =>
            p.populate("category author comments")
        );

        res.status(200).json({ success: true, post });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        const newPost = new Posts({ ...req.body, author: req.user._id, thumb: req.file.path });
        const post = await newPost
            .save()
            .then(p => p.populate("category author comments"));

        res.status(201).json({ success: true, post });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updatePost = async (req, res) => {
    console.log(req.body, req.file)
    const finalThum = req.file ? req.file.path : req.body.thumb;
    try {
        const post = await Posts.findByIdAndUpdate(
            req.params.id,
            { $set: { ...req.body, thumb: finalThum } },
            { new: true }
        ).then(p => p.populate("category author comments"));

        res.status(200).json({ success: true, post });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Posts.findByIdAndDelete(req.params.id).then(p =>
            p.populate("category author comments")
        );

        res.status(200).json({ success: true, post });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


