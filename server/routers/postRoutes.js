const express = require("express");
const postController = require("./../controllers/postController");
const router = express.Router();

router.post("/", postController.createPost);          // Create Post
router.get("/", postController.getAllPosts);          // Get All Posts
router.get("/:id", postController.getOnePost);        // Get One Post
router.patch("/:id", postController.updatePost);      // Update Post
router.delete("/:id", postController.deletePost);     // Delete Post

// Export
module.exports = router;