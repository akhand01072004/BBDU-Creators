const mongoose = require('mongoose');

const ApprovedProjectSchema = new mongoose.Schema({
  name: String,
  email: String,
  projectName: String,
  school: String,
  course: String,
  department: String,
  projectDescription : String,
  githubRepo: String,
  projectVideo: String,
  projectImage: String,
  yearOfSubmission : String
}, { timestamps: true });

module.exports = mongoose.model('ApprovedProject', ApprovedProjectSchema);