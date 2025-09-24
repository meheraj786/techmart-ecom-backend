require("dotenv").config();
const express = require("express");
const router = require("./routes");
const { dbConnect } = require("./database/dbConnect");
const routeError = require("./middleware/404errorHandler");
const app = express();

(async () => {
  try {
    const port = process.env.PORT;
    app.use(router);
    app.listen(port, () => console.log("Server is running"));
    dbConnect();
    app.use(routeError);
  } catch (error) {
    console.log(error);
  }
})();
