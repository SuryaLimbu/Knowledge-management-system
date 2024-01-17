const mongoose = require("mongoose");
const Project = require("./project");

const taskSchema = new mongoose.Schema({
    taskId: { type: Number },
    projectId: { type: Number },
    name: { type: String },
    desc: { type: String },
    dueDate: { type: Date },
    status: { type: Boolean, default: true }

});

const Task = mongoose.model("Task",taskSchema);
module.exports = Task;