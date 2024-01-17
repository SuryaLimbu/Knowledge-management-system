const mongoose = require("mongoose");

const knowledgeSchema = new mongoose.Schema({
    knowledgeId: { type: Number },
    taskId: { type: Number },
    createdBy: { type: Number },
    title: { type: String },
    desc: { type: String },
    createdDate: { type: Date },
    knowledgeType: { type: String },
    document: { type: File },
    comment: [String]


});

const Knowledge = mongoose.model("Knowledge", userSchema);
module.exports = Knowledge;
