import db from "../config/db.js"

export const findByMail = async (email) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );
    return rows[0] || null;
}

