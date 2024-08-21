import pool from "../database/connection.js";
import format from "pg-format";

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

const userUrls = async (limits, page, order_by, id) => {
  const values = [id];

  const offset = (page - 1) * limits;
  const [campo, ordenamiento] = order_by.split("_");

  const query =
    "SELECT * FROM url WHERE user_id = $1 ORDER BY %I %s LIMIT %s OFFSET %s";

  const formatedQuery = format(query, campo, ordenamiento, limits, offset);

  const consultaTotal = `SELECT COUNT(*) AS total FROM url WHERE user_id = $1`;

  const { rows: data } = await pool.query(formatedQuery, values);
  const {
    rows: [totalResult],
  } = await pool.query(consultaTotal, values);

  return { data, totalResult };
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
