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

const verifyUserPassword = async (password, email) => {
  const values = [email];

  const query = "SELECT * FROM users WHERE email = $1";

  const {
    rows: [userPassword],
  } = await pool.query(query, values);

  const comparePassword = bCrypt.compareSync(password, userPassword.password);

  if (!comparePassword) {
    throw { code: 401, message: "Invalid password" };
  }
};

const loggedInUser = async (id) => {
  const values = [id];
  const query = "SELECT * FROM users WHERE id = $1";
  const {
    rows: [user],
  } = await pool.query(query, values);
  return user;
};

const changeUserData = async (name, id) => {
  const values = [name, id];
  const query = "UPDATE users SET name = $1 WHERE id = $2";

  const {
    rows: [user],
  } = await pool.query(query, values);
  return user;
};

const changeUserPassword = async (newPassword, id) => {
  const hashedPassword = bCrypt.hashSync(newPassword, 10);

  const values = [hashedPassword, id];
  const query = "UPDATE users SET password = $1 WHERE id = $2";

  const {
    rows: [userPassword],
  } = await pool.query(query, values);
  return userPassword;
};

export const userModels = {
  createUser,
  findUserByEmail,
  verifyuser,
  loggedInUser,
  changeUserData,
  verifyUserPassword,
  changeUserPassword,
};
