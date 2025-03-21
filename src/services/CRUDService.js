const connection = require('../config/database');

const getAllUsers = async () => {
    let [results, fields] = await connection.query(`SELECT * FROM information`);
    return results;
}

const getInformationById = async (informationId) => {
    let [results, fields] = await connection.query(`SELECT * FROM information where id = ?`, [informationId]);

    let user = results && results.length > 0 ? results[0] : {};

    return user;
}

const deleteInformationById = async (id) => {
    let [results, fields] = await connection.query(
        `DELETE FROM information  WHERE id = ?`, [id]
    );
}

module.exports = { getAllUsers, getInformationById, deleteInformationById }