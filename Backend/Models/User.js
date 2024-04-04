const {Schema, model} = require('../connection')
const bcrypt = require('bcryptjs');
const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});

userSchema.pre("save",async function(next){
    if(this.isModified('password')){
        this.password  = await bcrypt.hash(this.password,8);
    }
    next();
})

module.exports = model('user', userSchema)