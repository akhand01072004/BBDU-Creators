const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
const cors = require('cors')

const UserRouter = require('./Routers/User');
const ProjRouter = require('./Routers/Projects');
const UtilRouter = require('./Routers/util');
const AdminRouter = require('./Routers/Admin');




app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))
app.use(express.json());


app.use('/util', UtilRouter);
app.use('/users', UserRouter);
app.use('/project', ProjRouter);
app.use('/admin', AdminRouter);

app.use(express.static('./static/uploads'))


app.listen(port, () => {
    console.log('Server is running at the port 3000')
})


