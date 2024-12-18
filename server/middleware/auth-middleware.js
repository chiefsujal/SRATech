//here we verify json web token by get method to get data and cross check

const jwt = require("jsonwebtoken");
const User = require('../models/user-model');

const authMiddleware = async (req,res,next) => {
  const token = req.header('Authorization');

  if(!token){
    return res.status(401).json({message:"Unauthorized HTTP,Token not provided"});
  }
  console.log("token from auth middleware",token);
  //Assuming token is in the form of "Bearer <jwtToken>", Removing the "Bearer" prefix
  const jwtToken = token.replace("Bearer","").trim();
  console.log("token from auth middleware",jwtToken);

  try {

    const isVerified = jwt.verify(jwtToken,process.env.JWT_KEY);
    console.log(isVerified);

    const userData = await User.findOne({email:isVerified.email}).select({
      password: 0,
    });
    console.log(userData);

    req.user = userData;
    req.token = token;
    req.userID = userData._id;
    
    next();
  } catch (error) {
    return res.status(401).json({message:"Unauthorized HTTP,Token not provided"});
  }
    

};

module.exports = authMiddleware;