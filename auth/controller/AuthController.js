const db = require("../../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const sendMail = require("@sendgrid/mail");
const http = require('http');
const keyvalue = process.env.SECRETKEY;
sendMail.setApiKey(process.env.SENDGRDIDKEY);
// const urls = process.env.URL + ('/verify');
const saltRounds = 10;


// const tokens = jwt.sign( 'Token Data', keyvalue, { expiresIn: "2h" }); 

// const verifytoken = async (req, res) => {
//   const token = await jwt.sign( 'Token Data', keyvalue, { expiresIn: "2h" });
//   console.log(token);
//   res.send(token);
// }



exports.register = async (req, res, next) => {
  const id = Math.floor(Math.random() * 9000000) + 10000000;
  console.log(req.body);
  // console.log(data[0]);
  const emailid = req.body.values.emailid;
  const password = req.body.values.password;
  const name = req.body.values.name;
  const number = req.body.values.number;
  console.log(emailid, password, name, number);

  bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      console.log(
        "*********************************************************************"
      );
      console.log("Hash ", hash);
      db.query(
        "INSERT INTO maxusers (emailid, password, id, number, name) VALUES (?,?,?,?,?)",
        [emailid, hash, id, number, name],
        (err, result) => {
          console.log(err);
        }
      );
    
      sendresponse();
      // verifytoken ();   
    
      sendMail.send(msg).then(
        () => {},
        (error) => {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
        }
      );

    })
    .catch((err) => console.error(err.message));
    function sendresponse() {
    res.send("Please check your email");
  }
 const tokens = jwt.sign({ data: 'Token Data'}, keyvalue, { expiresIn: '2h'} );    
  const msg = {
    to: req.body.values.emailid,
    from: { name: "Maxtradify", email: "maxtradify@gmail.com" },
    subject: "Please Verify Your email",
    text: "and easy to do anywhere, even with Node.js",
    html: `<strong>Click below to verify your email</strong>
    <br/>
    <a href="http://localhost:5000/user/verify/${tokens}">Please click here and start your journey with maxtradify</a>`,
  };
};
exports.tokenverify = async (req, res, next) => {
  
  const {tokens} = req.params;

  jwt.verify(tokens, keyvalue , function(err, decoded) {
    if (err) {
        console.log(err);
        res.send("Email verification failed, Possibly the link is invalid or expired");
    }
    else {
        res.send("Email verifified successfully");
    }
});

 };

exports.login = async (req, res, next) => {
  const { emailid, password } = req.body.values;
  console.log(emailid, password);
  const validateUser = async (data, res) => {
    await bcrypt.compare(password, data[0].password).then((response) => {
      console.log(response);
      if (response == true) {
      var userData = {
        'emailId' : data[0].emailid,
        'username' : data[0].name,
        'usernumber' :data[0].number
      } 
      const token =  jwt.sign({ emailid }, keyvalue, { expiresIn: "2h" });
      // res.setHeader("Content-Type", "application/json");
      res.header('Token', token);
      res.json({
      status: 1,
      code: 200,
      message: 'you have login scucessfully',
      token:   token,
      data: userData,
      });
      
      } else {
        res.send("Wrong  Password");
      }
    });
  };
  const sqlQuery = `select * from maxusers where emailid = '${emailid}'`;
  console.log("sql", sqlQuery);
  await db.query(sqlQuery, async (error, data) => {
    try {
      if (data.length == 0) {
        res.send("User Does Not Exist");
      }
      if (data.length > 0) {
        validateUser(data, res);
      }
    } catch (error) {
      debugger;
      res.send("cath new Error");
    }
  });

//   const createtoken = async (req, res) => {
//     const tokens = await jwt.sign({ emailid }, keyvalue, { expiresIn: "2h" });
//     console.log(tokens);
//      return (tokens);
//   };
// };
 };