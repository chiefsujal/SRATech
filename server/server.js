require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware");

// let handle cors issue i.e. server and client having different port number 
const corsOptions = {
  origin:"http://localhost:5173",
  method:"GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials:true,
}
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Define Routes
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

// Error Middleware (should come after routes)
app.use(errorMiddleware);

// lets define admin panel
app.use("/api/admin",adminRoute);

// Server Port
const PORT = process.env.PORT || 5000;

// Database Connection and Server Start
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit the process if the database fails to connect
  });
