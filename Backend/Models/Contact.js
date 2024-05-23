const{Schema, model} = require("../connection")

const contactSchema = new Schema({
    name: String,
    email: String,
    number: Number,
    message: String,
});

module.exports = model("contact", contactSchema)