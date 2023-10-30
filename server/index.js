import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import EmployeeModel from "/Users/raihaanibnshakeel/Authentication MERN Stack/server/models/Employee.js";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employee");

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      EmployeeModel.create({ name, email, password: hash })
        .then((employees) => res.json(employees))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err.message));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          res.json("Success");
        } else {
          res.json("The password is incorrect");
        }
      });
    } else {
      res.json("No record exists.");
    }
  });
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
