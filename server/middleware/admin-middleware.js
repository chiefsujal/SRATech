const User = require("../models/user-model");

const adminMiddleware = async(req,res,next) => {
  //have to write next in every middleware
  try {
    const adminRole = req.user.isAdmin;
    if(!adminRole){
      return res.status(403).json({message:"Acces denied. User is not an admin."})
    }
    next(); //we write next to tell is user is admin then proceed to next middleware
  } catch (error) {
    next(error);
  }
}

module.exports = adminMiddleware;