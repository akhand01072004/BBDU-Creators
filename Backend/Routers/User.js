const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel =  require('../Models/User');
const nodemailer = require('nodemailer');
require('dotenv').config();


router.post('/add', async(req, res) => {
    console.log(req.body)
    let user = await UserModel.findOne({
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
    UserModel.find({})
    .then((result) => {
        res.json(result)
    }).catch((err) => {
        console.error(err)
        res.status(500).json(err)
    });
    
});

router.delete('/delete/:id', async(req,res) => {
    try {
        const response = await UserModel.findByIdAndDelete(req.params.id);
        res.json(response);
    } catch (error) {
        res.status(500).json({message: "error while deleting user"})
    }
})

router.post('/login', async(req,res) => {
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email : email});
        if(!user){
            return res.status(400).json({message : "Invalid email"});
        }
        //check whether given pswd match with existing pswd;
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({message : "Wrong Password"});
        }
        const token = jwt.sign({userId: user._id}, process.env.SECRETKEY , {expiresIn : '1d'});
        res.cookie("auth_token", token, {httpOnly: true, secure : process.env.SECRETKEY});
        res.status(200).json({userId: user._id});
    } catch (error) {
        res.status(500).json({message : "Something went wrong"});
    }
});

var otp;
router.post('/SendEmail' , async(req,res) => {
    otp = Math.floor(100000 + Math.random() * 900000)
    console.log("inside middleware");
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
            subject : "One-time verification code",
            text : `You are receving this email because a request was made for email verifcation. Please enter the following code for verification : ${otp}`
        });
        res.status(201).json({message : "email sent successfully"});
    } catch (error) {
        res.status(501).json({message : "failed to sent email"});
    }
})

router.post('/validate-otp', async(req,res) => {
    const userotp = req.body.otp;
    if(userotp == otp){
        res.status(201).json({message : "email verified successfully"});
    }else{
        res.status(501).json({message : "Please enter correct otp"});
    }
})



router.get("/validatetoken" , async(req , res) => {
    var Token = req.headers.cookie;
    const token = Token?.substring(11);
    try {
        const decode = jwt.verify(token, process.env.SECRETKEY);
        const userdata = await UserModel.findById(decode.userId);
        return res.status(201).send({UserName: userdata.name});
    } catch (error) {
        return res.status(401).send({message: "unauthorized"});
    }
})

router.get("/logout", (req, res) => {
    res.cookie("auth_token", "",{
        expires: new Date(0),
    });
    res.status(201).send();
});



module.exports = router;
