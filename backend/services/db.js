import sql from "mssql";
import "dotenv/config";

const config = {
  user: process.env.CARS_DB_USER_CONFIG,
  password: process.env.CARS_DB_PASSWORD_CONFIG,
  server:
    process.env.MODE_ENV === "production"
      ? process.env.MSSQL_HOST
      : "localhost",
  database: process.env.MSSQL_DB, // Ensure this is the correct database name
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  port: parseInt(process.env.CARS_DB_PORT),
};
let db = null;

const getDb = async (dbName = null) => {
  config.options.database = dbName || config.options.database; // adding the possibility to switch databases if necessery.
  if (!db) {
    try {
      db = await sql.connect(config);
    } catch (error) {
      console.log("Database connection failed with: ", error);
    }
  }
  return db;
};

export { getDb, sql };
