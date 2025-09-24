const express=require("express")
const routeError=express.Router()

routeError.use((req, res, next) => {
  res.status(404).send('Sorry, the page you requested was not found!');
});

module.exports=routeError
