const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')

const UserRouter = require('./Routers/User');
const ProjRouter = require('./Routers/Projects');
const UtilRouter = require('./Routers/util');
const AdminRouter = require('./Routers/Admin');





app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

// middleware
app.use(express.json());

// app.use((req , res,next) => {
//     var Token = req.headers.cookie;
//     const token = Token.substring(11);
//     try {
//         const decode = jwt.verify(token, process.env.SECRETKEY);
//         res.status(201).json({login: true, data: decode});
//         next();
//     } catch (error) {
//         return res.status(401).send({message: "unauthorized"});
//     }
// })


app.use('/util', UtilRouter);
app.use('/user', UserRouter);
app.use('/project', ProjRouter);
app.use('/admin', AdminRouter);

app.use(express.static('./static/uploads'))


app.listen(port, () => {
    console.log('Server is running at the port 3000')
})


