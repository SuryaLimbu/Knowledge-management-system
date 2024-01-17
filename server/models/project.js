const mongoose = require("mongoose")
const User = require("./User")

const projectSchema = new mongoose.Schema({
    porjectId: { type: Number },
    clientId: { type: Number },
    users: [String],
    projectName: { type: String },
    startDate: { type: Date, default: Date.now() },
    endDate: { type: Date },
    desc: { type: String },
    projectManger: { type: String },
    budget: { type: Number }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;