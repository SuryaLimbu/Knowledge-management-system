const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    commentId: { type: Number },
    knowledgeId: { type: Number },
    commentText: { type: String },
    createdBy: { type: Number },
    createdAt: { type: Date, default: Date.now() },

})

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;