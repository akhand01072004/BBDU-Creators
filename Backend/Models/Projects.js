// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  email: String,
  projectName: String,
  school: String,
  course: String,
  department: String,
  projectDescription : String,
  githubRepo: String,
  projectVideo: String, // Assuming you're handling this as a URL or file reference
  projectImage: String, // Assuming you're handling this as a URL or file reference
  yearOfSubmission: String
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
