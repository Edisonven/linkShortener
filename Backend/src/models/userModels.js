import pool from "../database/connection.js";
import bCrypt from "bcrypt";

const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const { rows: user } = await pool.query(query, [email]);
  return user;
};

const createUser = async (user) => {
  try {
    let { name, email, password } = user;
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      throw new Error("This email account already exists");
    }
    if (!name.trim() || !email.trim() || !password.trim()) {
        throw new Error("Not all parameters were provided");
      }
    const hashedPassword = bCrypt.hashSync(password, 10);

    const values = [name, email, hashedPassword];
    const query =
      "INSERT INTO users (id, nombre, email, password) VALUES (DEFAULT, $1, $2, $3) RETURNING *";
    const {
      rows: [userRegistered],
    } = await pool.query(query, values);
    return userRegistered;
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw error;
  }
};

export const userModels = {
  createUser,
  findUserByEmail,
};
