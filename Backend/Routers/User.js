const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Model=  require('../Models/User');
const verifyToken = require('../Middleware/VerifyToken');
const nodemailer = require('nodemailer');

const secretKey = "abcdefgh567#"
router.post('/add', async(req, res) => {
    console.log(req.body)
    let user = await Model.findOne({
        email: req.body.email,
    });
    if(user){
        return res.status(400).json({
            message: "User already exists"
        });
    }
    await new Model(req.body).save()
    .then((result) => {
       res.json(result) 
    }).catch((err) => {
        res.status(500).json(err)
    });
});
router.get('/getall',(req,res) => {
    // empty brackets will give all the data from the database
    Model.find({})
    .then((result) => {
        res.json(result)
    }).catch((err) => {
        console.error(err)
        res.status(500).json(err)
    });
    
});

router.delete('/delete/:id', async(req,res) => {
    try {
        const response = await Model.findByIdAndDelete(req.params.id);
        res.json(response);
    } catch (error) {
        res.status(500).json({message: "error while deleting user"})
    }
})

router.post('/login', async(req,res) => {
    const {email,password} = req.body;
    try {
        const user = await Model.findOne({email : email});
        if(!user){
            return res.status(400).json({message : "Invalid email"});
        }
        //check whether given pswd match with existing pswd;
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({message : "Wrong Password"});
        }
        const token = jwt.sign({userId: user._id}, secretKey, {expiresIn : '1d'});
        res.cookie("auth_token", token, {httpOnly: false, secure : secretKey});
        res.status(200).json({userId: user._id});
    } catch (error) {
        res.status(500).json({message : "Something went wrong"});
    }
});
// router.use('/middlewarefunc' , async(req,res,next) => {
//     console.log("inside middleware");
//     next();
// })
router.post("/SendEmail",async(req,res) => {
    var otp = Math.floor(100000 + Math.random() * 900000);
    const sender = nodemailer.createTransport({
        service: 'Gmail',
        auth : {
            user : "aktfang@gmail.com",
            pass : "ttaf achp txbs pwwh"
        }
    });
    try {
        const response = sender.sendMail({
            from : "aktfang@gmail.com",
            to : req.body.emailto,
            subject : "One-time verification code",
            text : `You are receving this email because a request was made for email verifcation. Please enter the following code for verification : ${otp}`
        });
        res.status(201).json({message : "email sent successfully", Otp : otp});
    } catch (error) {
        res.status(501).json({message : "failed to sent email"});
    }
    
})

router.get('/validate-otp', async(req,res) => {

})

router.get("/validatetoken", verifyToken , async (req , res) => {
    res.status(200).send({userId : req.userId});
})



module.exports = router;
