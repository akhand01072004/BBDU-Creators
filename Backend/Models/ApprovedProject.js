const mongoose = require('mongoose');

const ApprovedProjectSchema = new mongoose.Schema({
  name: String,
  email: String,
  projectName: String,
  department: String,
  githubRepo: String,
  projectVideo: String,
  projectImage: String, 
}, { timestamps: true });

module.exports = mongoose.model('ApprovedProject', ApprovedProjectSchema);