import sql from "mssql";

const config = {
  user: 'sa',
  password: 'yourStrong(!)Password',
  server: 'localhost',
  database: 'carsDataBase',
  options: {
    encrypt: true, // for Azure users or if SSL is required
    trustServerCertificate: true, // to avoid SSL certificate errors in development
  },
};

let db = null;

const getDb = async (dbName = null) => {
  config.database = dbName || config.database // adding the possibility to switch databases if necessery.
    if (!db) {
        db = await sql.connect(config);
        console.log('Database connection established');
    }
    return db;
};

export { getDb, sql };