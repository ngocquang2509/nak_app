const {create, getUserByEmail, getUserById, getUsers, updateUser, deleteUser} = require("./service");
  const { hashSync, genSaltSync, compareSync } = require("bcrypt");
  const { sign } = require("jsonwebtoken");
  
  module.exports = {
    createUser: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Email or PhoneNumber already exist"
          });
        }
        return res.status(200).json({
          success: true,
          message: "Register successfully !"
        });
      });
    },
    
    login: (req, res) => {
      const body = req.body;
      getUserByEmail(body.email, (err, results) => {
        if (err) {
          console.log(err);
        }
        if (!results) {
          return res.json({
            success: 0,
            data: "Incorrect email or password"
          });
        }
        const result = compareSync(body.password, results.password);
        if (result) {
          results.password = undefined;
          const jsontoken = sign({ result: results }, "qwe1234", {
            expiresIn: "1h"
          });
          return res.json({
            success: 1,
            message: "login successfully",
            token: jsontoken
            
          });
        } else {
          return res.json({
            success: 0,
            data: "Incorrect email or password"
          });
        }
      });
    },

    getUsers: (req, res) => {
      getUsers((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: true,
          data: results
        });
      });
    },
    
    getUserById: (req, res) => {
      const id = req.params.id;
      getUserById(id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: false,
            message: "Record not Found"
          });
        }
        results.password = undefined;
        return res.json({
          success: true,
          data: results
        });
      });
    },
    updateUser: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      updateUser(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: false,
            message: "Update Failed !"
          });
        }
        return res.json({
          success: true,
          message: "updated successfully"
        });
      });
    },

    
    deleteUser: (req, res) => {
      const data = req.body;
      deleteUser(data, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: false,
            message: "Not Found"
          });
        }
        return res.json({
          success: true,
          message: "user deleted successfully"
        });
      });
    }
  };