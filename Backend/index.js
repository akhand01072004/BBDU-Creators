const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')

const UserRouter = require('./Routers/User')

app.use(cors());

app.use(cors({
    origin: ['http://localhost:5174'],
}))

// middleware
app.use(express.json());

app.use('/user', UserRouter)


app.listen(port, () => {
    console.log('Server is running at the port 3000')
})


