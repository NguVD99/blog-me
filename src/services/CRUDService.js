const connection = require('../config/database');

const getAllUsers = async () => {
    let [results, fields] = await connection.query(`SELECT * FROM information`);
    return results;
}

module.exports = { getAllUsers }