import pool from "../database/connection.js";

const createUrl = async (id, longUrl, shortUrl) => {
  const values = [id, longUrl, shortUrl];
  const query =
    "INSERT INTO url (id, user_id, longurl, shorturl, createdat) VALUES (DEFAULT, $1, $2, $3, now()) RETURNING shorturl";
  const {
    rows: [urls],
  } = await pool.query(query, values);
  return urls;
};

const originalURL = async (shortUrl) => {
  const values = [shortUrl];
  const query = "SELECT * FROM url WHERE shorturl = $1";
  const {
    rows: [longURL],
  } = await pool.query(query, values);

  return longURL;
};

const userUrls = async (id) => {
  const values = [id];
  const query = "SELECT * FROM url WHERE user_id = $1";

  const { rows: data } = await pool.query(query, values);
  return data;
};

export const urlModels = {
  createUrl,
  originalURL,
  userUrls,
};
