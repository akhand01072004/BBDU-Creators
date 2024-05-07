const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true
    },
    password : {
        type : String
    },
    about: String,
    experience : {
        type : String
    },
    imageurl: String,
    department: String
})

AdminSchema.pre("save",async function(next){
    if(this.isModified('password')){
        this.password  = await bcrypt.hash(this.password,8);
    }
    next();
})

module.exports = mongoose.model('Admin',AdminSchema);