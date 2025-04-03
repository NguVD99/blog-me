const connection = require('../config/database');

const getAllUsers = async (limit, offset) => {
    const [results] = await connection.query(
        `SELECT * FROM information WHERE deleted_at IS NULL 
         ORDER BY id DESC LIMIT ? OFFSET ?`,
        [limit, offset]
    );
    return results;
};

const getTotalUsers = async () => {
    const [countRows] = await connection.query(
        `SELECT COUNT(*) as total FROM information WHERE deleted_at IS NULL`
    );
    return countRows[0].total;
};

const getTrashedUsers = async () => {
    const [results] = await connection.query(
        `SELECT * FROM information WHERE deleted_at IS NOT NULL ORDER BY deleted_at DESC`
    );
    return results;
};

const deleteInformationById = async (id) => {
    const now = new Date();
    await connection.query(`UPDATE information SET deleted_at = ? WHERE id = ?`, [now, id]);
};

const restoreInformationById = async (id) => {
    await connection.query(`UPDATE information SET deleted_at = NULL WHERE id = ?`, [id]);
};

const forceDeleteInformationById = async (id) => {
    await connection.query(`DELETE FROM information WHERE id = ? AND deleted_at IS NOT NULL`, [id]);
};

module.exports = {
    getAllUsers,
    getTrashedUsers,
    deleteInformationById,
    restoreInformationById,
    forceDeleteInformationById,
    getTotalUsers
};