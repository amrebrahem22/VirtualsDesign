const express = require("express");
const router = express.Router();
const upload  = require('../multerUpload')
const { authAdmin } = require("../middleware/auth");
const {
    listPosts,
    createPost,
    updatePost,
    deletePost,
    detailPost,
} = require("../controllers/posts");

router.get("/", listPosts);
router.post("/", authAdmin, upload.single('thumb'), createPost);
router.get("/:id", detailPost);
router.put("/:id", authAdmin, upload.single('thumb'), updatePost);
router.delete("/:id", authAdmin, deletePost);

module.exports = router;
