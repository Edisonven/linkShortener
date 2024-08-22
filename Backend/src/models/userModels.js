import pool from "../database/connection.js";
import bCrypt from "bcrypt";

const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const {
    rows: [user],
  } = await pool.query(query, [email]);
  return user;
};

const createUser = async (user) => {
  try {
    let { name, email, password } = user;

    if (!name || !email || !password) {
      throw {
        error: "Not all parameters were provided",
        code: 400,
      };
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      throw {
        error: "This email account already exists",
        code: 400,
      };
    }

    const hashedPassword = bCrypt.hashSync(password, 10);

    const values = [name, email, hashedPassword];
    const query =
      "INSERT INTO users (id, name, email, password) VALUES (DEFAULT, $1, $2, $3) RETURNING *";
    const {
      rows: [userRegistered],
    } = await pool.query(query, values);

    return userRegistered;
  } catch (error) {
    console.error("Error creating user:", error.error || error.message);
    throw {
      error: error.error || "An unexpected error occurred",
      code: error.code || 500,
    };
  }
};

const verifyuser = async (email, password) => {
  const values = [email];
  const query = "SELECT * FROM users WHERE email = $1";
  const {
    rows: [user],
  } = await pool.query(query, values);

  if (!user) {
    throw { code: 404, message: "User not found" };
  }

  const comparePassword = bCrypt.compareSync(password, user.password);

  if (!comparePassword) {
    throw { code: 401, message: "Invalid credentials" };
  }
  return user;
};

const loggedInUser = async (id) => {
  const values = [id];
  const query = "SELECT * FROM users WHERE id = $1";
  const {
    rows: [user],
  } = await pool.query(query, values);
  return user;
};

export const userModels = {
  createUser,
  findUserByEmail,
  verifyuser,
  loggedInUser,
};
