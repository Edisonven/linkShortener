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

const modifyRegisteredUrl = async (longUrl, title, url_id, id) => {
  const values = [longUrl, title, url_id, id];

  const query =
    "UPDATE url SET longurl = $1, title = $2 WHERE id = $3 AND user_id = $4;";
  const {
    rows: [urlUpdated],
  } = await pool.query(query, values);
  return urlUpdated;
};

export const urlModels = {
  createUrl,
  originalURL,
  userUrls,
  modifyRegisteredUrl,
};
