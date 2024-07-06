const jwt = require ("jsonwebtoken");
const keyvalue = process.env.SECRETKEY;


exports.authJWT = (req, res, next) => {
    console.log("middlewear");
    var token = req.headers.authorization;
    console.log(token);
    newToken = token.split(' ')[1];
    jwt.verify(newToken, keyvalue ,function(err,docs){
      if(err){
        console.log(err);
        res.send({message : "Invalid Token"})
      }
      else{0
        next()
      }
    } );
    //  console.log(userVER);
  } 

   // middlewear
  // const cookieAuth = (req,res,next) => { 
  //   const token = req.cookie.token;
  //   try{
  //      const data = jwt.verify(token ,keyvalue);
  //      req.data = data;
  //      next();
  //   }catch(err){
  //     // res.clearCookie("token");
  //     res.clearCookie("token");
  //     return res.redirect("/");
  //   }
  
  
  // }