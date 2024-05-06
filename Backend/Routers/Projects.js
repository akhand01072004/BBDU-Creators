const express = require('express');
const router = express.Router();
const Project = require('../Models/Projects'); // Import your model
const UserModel = require('../Models/User');
const ApprovedProject = require('../Models/ApprovedProject');
const nodemailer = require('nodemailer');



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

//Approve Project
router.post('/api/ApproveProject' , async(req,res) => {
  const useremail = req.body.email;
  try {
    const projects = new ApprovedProject(req.body);
    await UserModel.updateOne({email : useremail,},{$push : {projects : projects._id}}).populate('');
    await projects.save();
    res.status(201).send(projects);
  } catch (error) {
    res.status(400).send(error);
  }
})

// GET route to fetch all projects
router.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

//fetch all approved project
router.get('/api/Approvedprojects', async (req, res) => {
  try {
    const proj = await ApprovedProject.find({});
    res.status(200).send(proj);
  } catch (error) {
    res.status(500).send(error);
  }
});

//get all approved project
router.get("/totalProjects", async(req,res) => {
  const project = await ApprovedProject.find({});
  return res.status(200).json({totalProject : project.length})
})

//fetch approvedproject by id
router.get('/api/Approvedproject/:id', async(req,res) => {
  try {
    const data = await ApprovedProject.findById(req.params.id)
    res.json(data);
  } catch (error) {
    res.status(500).json({message : "Error while fetching"});
  }
})

//send email to the user if his/her project get approved
router.post('/SendProjectStatusEmail' , async(req,res) => {
  const sender = nodemailer.createTransport({
      service: 'Gmail',
      auth : {
          user : process.env.USER,
          pass : process.env.PASS
      }
  });
  try {
      const response = sender.sendMail({
          from : process.env.USER,
          to : req.body.emailto,
          subject : "Regarding Your Project Status",
          text : `Hey ${req.body.name} Congratulation your project has been approved by the department. Now you can see it on the official site www.BbduCreator.in`
      });
      res.status(201).json({message : "email sent successfully"});
  } catch (error) {
      res.status(501).json({message : "failed to sent email"});
  }
})

//ROUTE for deleting project
router.delete('/api/deleteProject/:id' , async(req,res) => {
  try {
    const response = await Project.findByIdAndDelete(req.params.id);
    res.json(response)
  } catch (error) {
    res.status(500).json({message: "Error fetching hotels"});
  }
})

router.get('/api/project/:id', async(req,res) => {
  // console.log(req.params.id);
  try {
    const data = await Project.findById(req.params.id)
    res.json(data);
  } catch (error) {
    res.status(500).json({message : "Error while fetching"});
  }
 
})

module.exports = router;


