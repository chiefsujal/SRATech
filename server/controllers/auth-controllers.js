const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

// home page logic

const home = async(req, res) => {
  try{
    res.status(200).send("Welcome to first Project using controller."); 
  }catch(error){
    console.error("Error in home:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};  

const register = async(req, res) => {
  try{
    console.log(req.body);
    const {username , email, phone, password} = req.body;

    const userExist = await User.findOne({email:email});

    if(userExist){
      return res.status(400).json({message:"email already exist"});
    }

    //hash the password
    //? one way .. other way is using premethod in user-model.js i.e. userSchema.pre()
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password,saltRound);
    //if using this way u have to mention in const userCreated that password:hash_password

    const userCreated = await User.create({username , email, phone, password}); //create user if not exist 
    
    res.status(201).json({
          msg: "registeration successfully done",
          token: await userCreated.generateToken(),
          userId: userCreated._id.toString()
       }); 
  }catch(error){
    // res.status(500).json({message: "Internal server error"});
    next(error);
  }
};

// * ----------------
// * USER LOGIN LOGIC
// * ----------------

const login = async (req, res) => {
  try {
    const { email, password} = req.body;

    const userExist = await User.findOne({ email });
    console.log(userExist);
    
    if(!userExist){
      return res.status(400).json({message: " Invalid credentials "});
    }

    const user = await bcrypt.compare(password, userExist.password); //check if registered password and entered is same or not.......if same valid for login if not wrong credentials

    if(user){
      res.status(200).json({
        msg: "Login successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      })
    }else{
      res.status(401).json({message: " Invalid Credentials "});
    }

  } catch (error) {
    res.status(500).json({message: "internal server error"});
  }
}

// * ----------------
// * TO SEND USER DATA -USER LOGIC
// * ----------------

const user = async(req,res)=>{
  try {
    const userData = req.user;
    console.log(userData);
    // res.status(200).json({msg:"hi there"}); /*to check in postman*/
    return res.status(200).json({userData});
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
}

module.exports = {home, register, login, user};

