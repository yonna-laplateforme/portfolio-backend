import bcrypt from "bcrypt";
import db from "../src/config/db.js";
import "dotenv/config";

const createAdmin = async () => {
    const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD,
        10
    );

    await db.execute(
        `INSERT INTO user 
    (email, password, role)
    VALUES (?, ?, ?)`,
        [
            process.env.ADMIN_EMAIL,
            hashedPassword,
            "admin",
        ]
    );

    console.log("Administrateur créé");

    process.exit();
};

createAdmin();