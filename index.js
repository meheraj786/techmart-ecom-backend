require("dotenv").config();
const express = require("express");
const router = require("./routes");
const { dbConnect } = require("./database/dbConnect");
const routeError = require("./middleware/404errorHandler");
const app = express();
const path = require("path");

(async () => {
  try {
    const cors = require("cors");
    app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      })
    );
    app.use(express.static(path.join(__dirname, "public/temp")));
    app.use(express.json());
    const port = process.env.PORT;
    app.use(router);
    app.listen(port, () => console.log("Server is running"));
    dbConnect();
    app.use(routeError);
  } catch (error) {
    console.log(error);
  }
})();
