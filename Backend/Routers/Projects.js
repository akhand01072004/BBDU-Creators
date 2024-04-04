// app.js or routes.js
const express = require('express');
const mongoose = require('mongoose');
const Project = require('./models/Project'); // Import your model

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
mongoose.connect('mongodb://localhost/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true });

// POST route to submit a new project
app.post('/api/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET route to fetch all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
