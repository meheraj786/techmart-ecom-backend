const jwt=require("jsonwebtoken")

exports.tokenVerify=(req,res,next)=>{
  const token =req.headers.authorization.split(" ")[1]
  jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
  console.log(decoded) 
});
  next()
}