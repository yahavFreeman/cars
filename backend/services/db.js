import sql from "mssql";
import "dotenv/config";

const config = {
  server: 'db', // Container name of the database
  port: 1433,
  authentication: {
    type: 'default',
    options: { userName: process.env.CARS_DB_USER_CONFIG, password: process.env.CARS_DB_PASSWORD_CONFIG }
  },
  options: {
    database: 'carsDataBase',  // Ensure this is the correct database name
    encrypt: true,
    trustServerCertificate: true,
  },
};


let db = null;

const getDb = async (dbName = null) => {
  config.options.database = dbName || config.options.database; // adding the possibility to switch databases if necessery.
  if (!db) {
    try {
      console.log("Database connection config:", config);
      db = await sql.connect(config);
    } catch (error) {
      console.log("Database connection failed with: ",error)
    }
  }
  return db;
};

export { getDb, sql };
