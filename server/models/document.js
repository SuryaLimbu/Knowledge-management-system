const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    documentId: { type: Number },
    name: { type: String },
    uploadedBy: { type: Number },
    createDate: { type: Date, default: Date.now() }
});

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;