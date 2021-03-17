const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    try{
        const token = req.headers.token;
        console.log(token);

        if(!token) res.status(401).json({message: "no token attached"});

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();

    }catch(err){
        res.status(401).json({message: err});
    }
}