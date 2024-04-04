const mongoose = require('mongoose');
const url = "mongodb+srv://aktfang:bbdu7948@userdata.b1t4ftm.mongodb.net/?retryWrites=true&w=majority&appName=UserData"
mongoose.connect(url)

.then((result) => {
    console.log('Connected to the database')
}).catch((err) => {
    console.log(err)
});
module.exports = mongoose;


// new upload handle backend logic 

