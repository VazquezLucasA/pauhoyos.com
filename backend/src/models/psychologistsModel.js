const { pool } = require("../config/db");

async function createPsychologist({ userId, displayName, bio }) {
    const [result] = await pool.query(
        `INSERT INTO psychologists (user_id, display_name, bio)
     VALUES (?, ?, ?)`,
        [userId, displayName, bio]
    );
    return result.insertId;
}

async function getPsychologistById(id) {
    const [rows] = await pool.query("SELECT * FROM psychologists WHERE id = ?", [id]);
    return rows[0];
}

async function getPsychologistByUserId(userId) {
    const [rows] = await pool.query("SELECT * FROM psychologists WHERE user_id = ?", [userId]);
    return rows[0];
}

async function getAllPsychologists() {
    const [rows] = await pool.query("SELECT * FROM psychologists");
    return rows;
}

async function updatePsychologist(id, { displayName, bio }) {
    const fields = [];
    const values = [];

    if (displayName !== undefined) { fields.push("display_name = ?"); values.push(displayName); }
    if (bio !== undefined) { fields.push("bio = ?"); values.push(bio); }

    if (fields.length === 0) return false;

    values.push(id);
    const [result] = await pool.query(
        `UPDATE psychologists SET ${fields.join(", ")} WHERE id = ?`,
        values
    );
    return result.affectedRows > 0;
}

module.exports = {
    createPsychologist,
    getPsychologistById,
    getPsychologistByUserId,
    getAllPsychologists,
    updatePsychologist,
};
