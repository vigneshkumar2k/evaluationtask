const express = require("express");
const cors = require("cors");

const app = express();
const Sequelize = require("sequelize");
const sequel = new Sequelize("postgres", "postgres", "Vignesh@2000", {
  host: "localhost",
  dialect: "postgres",
});

app.use(express.json());
app.use(cors());

const db = {};
db.Sequelize = Sequelize;
db.sequel = sequel;

const Data = db.sequel.define("UserData", {
    Name: {
      type: Sequelize.STRING,
    },
    Phone: {
      type: Sequelize.STRING,
    },
    Email: {
      type: Sequelize.STRING,
    },
    Password: {
      type: Sequelize.STRING,
    },
  });
  db.sequel.sync().then(function () {

  });

  app.post("/register", (req, res) => {
    const username = req.body.name;
    const phoneNo = req.body.phoneNo;
    const mail = req.body.email;
    const password = req.body.password;
    Data.bulkCreate([
      {
        Name: username,
        Phone:phoneNo,
        Email: mail,
        Password: password,
      },
    ])
      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch();
  });
  app.post("/login", (req, res) => {
    const mail = req.body.email;
    const password = req.body.password; 
    Data.findOne({
      where: {
        Email: mail,
        Password: password,
      },
    })
      .then((data) => {
        console.log(data);
        if (data) {
            res.send({success:true});
        } else {
          res.send({success:false,message: 'wrong password or email'});
        }
      })
      .catch((error) => {
        console.log(error);
        res.send("Error searching the database");
      }); 
  });

  app.post('/check-email', (req, res) => {
    const email = req.body.email;
    User.findOne({ where: { email: email } })
      .then((user) => {
        if (user) {
          return res.status(400).send({ message: 'Email already in use' });
        }
        return res.send({ message: 'Email is available' });
      })
      .catch((error) => {
        return res.status(500).send({ message: 'Error checking email availability' });
      });
  });

  app.listen(3001, () => {
    console.log("server is running in 3001");
  }); 