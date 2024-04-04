const mongoose = require('mongoose');
const url = "mongodb+srv://akhand_is_solivagant:akhand@cluster0.8sjmesc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(url)

.then((result) => {
    console.log('Connected to the database')
}).catch((err) => {
    console.log(err)
});
module.exports = mongoose;


// new upload handle backend logic 

