const Comments = require('../models/Comments');
const Posts = require('../models/Posts');


exports.createComment = async (req, res) => {
    const { name, email, website, content, postId } = req.body;

    if (name && email && content) {
        const newComment = new Comments({name, email, website, content, postId})
        const comment = await newComment.save();

        await Posts.findByIdAndUpdate(postId, { $push: { comments: comment._id } }, {new: true})

        res.status(201).json({success: true, comment});
    } else {
        res.status(400).json({ success: false, message: 'Please fill the required fields.' })
    }
}

exports.updateComment = async (req, res) => {
    const { commentId } = req.params
    
    try {
        const updated = await Comments.findByIdAndUpdate(commentId, {$set: req.body}, { new: true });

        res.status(200).json({success: true, updated});
    } catch(err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message })
    }
}

exports.deleteComment = async (req, res) => {
    const { commentId } = req.params

    try {
        const deleted = await Comments.findByIdAndDelete(commentId);

        res.status(200).json({success: true, deleted});
    } catch(err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message })
    }
}