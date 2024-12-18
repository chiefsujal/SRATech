const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controllers");
const {signupSchema, loginSchema} = require("../validators/auth-validators");
const validate = require("../middleware/validator-middleware");
const authMiddleware = require("../middleware/auth-middleware");



// router.route("/").get((req, res) => {
//     res.status(200).send("Welcome to first Project using router.");
// });
// or using home controller
router.route("/").get(authcontrollers.home);

// router.route("/register").get((req,res)=>{
//   res.status(200).send("Welcome to registration page using router.");
// });
// or   
router
  .route("/register")
  .post(validate(signupSchema), authcontrollers.register);
router.route("/login").post(validate(loginSchema),authcontrollers.login);

router.route('/user').get(authMiddleware, authcontrollers.user);
  

module.exports = router;
