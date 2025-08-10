const db = require('../db');

const SchoolModel = {
  add: (name, address, latitude, longitude, callback) => {
    const sql = 'INSERT INTO school (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, address, latitude, longitude], callback);
  },

  getAll: (callback) => {
    const sql = 'SELECT * FROM school';
    db.query(sql, callback);
  }
};

module.exports = SchoolModel;
