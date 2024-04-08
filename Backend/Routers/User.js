const express = require('express');
const router = express.Router();
const Model=  require('../Models/User');


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

router.post('/authenticate', (req,res) => {
    Model.findOne(req.body)
    .then((result) => {
        if (result) res.json(result);
        else res.status(400).json({message: 'login failed'})
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err)
    });
})



module.exports = router;
