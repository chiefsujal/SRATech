const express = require("express");
const contactrouter = express.Router();

const contactForm = require("../controllers/contact-controllers");

contactrouter.route("/contact").post(contactForm);

module.exports = contactrouter;