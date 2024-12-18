const User = require("../models/user-model");
const Contact = require("../models/contact-models");

//-----------------------
// Get all Users logic
//-----------------------

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({},{password:0});
    if(!users || users.length === 0 ){
      return res.status(404).json({message:"No users found"});
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

//-----------------------
// Single user logic
//-----------------------

const getUserById = async(req,res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({_id:id},{password:0}); 
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

//-----------------------
// User Update logic
//-----------------------

const updateUserById = async(req,res) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;

    const updatedData = await User.updateOne({_id:id},{
      $set:updatedUserData,
    });

    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
}

//-----------------------
// Deleting Users logic
//-----------------------

const deleteUserById = async(req,res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({_id:id}); 
    return res.status(200).json({message: "User Deleted Successfully"});
  } catch (error) {
    next(error);
  }
}

//-----------------------
// Get all Contacts logic
//-----------------------

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    console.log(contacts);
    if(!contacts || contacts.length ===0){
      return res.status(404).json({message:"No Contact Found"});
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

//-----------------------
// Deleting Contacts logic
//-----------------------

const deleteContactById = async(req,res) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({_id:id}); 
    return res.status(200).json({message: "Contact Deleted Successfully"});
  } catch (error) {
    next(error);
  }
}

module.exports = {getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById, deleteContactById};