// server/utils/db.js
import mysql from "mysql2/promise";

let pool;

export async function getDb(event) {
  if (!pool) {
    const config = useRuntimeConfig();

    pool = mysql.createPool({
      host: config.mysqlHost,
      user: config.mysqlUser,
      password: config.mysqlPassword,
      database: config.mysqlDatabase,
      port: config.mysqlPort,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  return pool;
}
