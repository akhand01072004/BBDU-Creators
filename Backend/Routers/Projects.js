const express = require('express');
const router = express.Router();
const Project = require('../Models/Projects'); // Import your model


// POST route to submit a new project
router.post('/api/uploadprojects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET route to fetch all projects
router.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/api/projects/:id', async(req,res) => {
  console.log(req.params.id);
  try {
    const data = await Project.findById(req.params.id)
    res.json(data);
  } catch (error) {
    res.status(500).json({message : "Error while fetching"});
  }
 
})

module.exports = router;


