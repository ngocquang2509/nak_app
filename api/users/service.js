const db = require("../../database");

module.exports = {
  create: (data, callBack) => {
    db.query(
      `insert into registration(fullName, email, phoneNumber, gender, password) 
                values(?,?,?,?,?)`,
      [
        data.fullName,
        data.email,
        data.phoneNumber,
        data.gender,
        data.password
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getUsers: callBack => {
    db.query(
      `select id, fullName, email, phoneNumber, gender, password from registration`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getUserById: (id, callBack) => {
    db.query(
      `select id, fullName, email, phoneNumber, gender, password from registration where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getUserByEmail: (email, callBack) => {
    db.query(
      `select * from registration where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  
  updateUser: (data, callBack) => {
    db.query(
      `update registration set fullName=?, email=?, phoneNumber=?, gender=?, password=? where id=?`,
      [
        data.fullName,
        data.email,
        data.phoneNumber,
        data.gender,
        data.password,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  deleteUser: (data, callBack) => {
    db.query(
      `delete from registration where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};