const { pool } = require("../config/db");

async function getActiveCourses() {
    const [rows] = await pool.query("SELECT * FROM courses WHERE is_active = 1 ORDER BY created_at DESC");
    return rows;
}

async function getCourseMaterials(courseId) {
    const [rows] = await pool.query(
        "SELECT * FROM materials WHERE course_id = ? ORDER BY order_index ASC",
        [courseId]
    );
    return rows;
}

async function createCourse({ title, description, isActive }) {
    const [result] = await pool.query(
        "INSERT INTO courses (title, description, is_active) VALUES (?, ?, ?)",
        [title, description, isActive !== undefined ? isActive : 1]
    );
    return result.insertId;
}

async function createMaterial({ courseId, title, type, url, orderIndex }) {
    const [result] = await pool.query(
        "INSERT INTO materials (course_id, title, type, url, order_index) VALUES (?, ?, ?, ?, ?)",
        [courseId, title, type, url, orderIndex || 0]
    );
    return result.insertId;
}

module.exports = {
    getActiveCourses,
    getCourseMaterials,
    createCourse,
    createMaterial,
};
