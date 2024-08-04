require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const router = require("./router/auth-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const contactRoute = require("./router/contact-router");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

//for making powerful and enabling changes in json file
app.use(express.json());

app.use("/api/auth", router);
app.use("/api/form", contactRoute);

app.use(errorMiddleware);


const PORT = 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
      console.log(`server is running at port: ${PORT}`);
    });

});