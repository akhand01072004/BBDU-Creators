const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')

const UserRouter = require('./Routers/User');
const ProjRouter = require('./Routers/Projects');
const UtilRouter = require('./Routers/util');





app.use(cors({
    origin: ['http://localhost:5173'],
}))

// middleware
app.use(express.json());


app.use('/util', UtilRouter);
app.use('/user', UserRouter);
app.use('/user', ProjRouter);

app.use(express.static('./static/uploads'))


app.listen(port, () => {
    console.log('Server is running at the port 3000')
})


