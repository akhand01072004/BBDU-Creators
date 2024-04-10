const jwt = require('jsonwebtoken');

const secretKey = "abcdefgh567#"
const verifyToken = async (req,res,next) => {
    const token = req.cookies["auth_token"];
    if(!token){
        return res.status(401).json({message: "unauthorized"});
    }
    try {
        const decode = jwt.verify(token, secretKey);
        res.json({login: true, data: decode})
        next();
    } catch (error) {
        return res.status(401).json({message: "unauthorized"});
    }
}

module.exports  = verifyToken;
