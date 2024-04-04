const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')

const UserRouter = require('./Routers/User');
const ProjRouter = require('./Routers/Projects');



app.use(cors({
    origin: ['http://localhost:5173'],
}))

// middleware
app.use(express.json());

app.use('/user', UserRouter);
app.use('/user', ProjRouter);


app.listen(port, () => {
    console.log('Server is running at the port 3000')
})


