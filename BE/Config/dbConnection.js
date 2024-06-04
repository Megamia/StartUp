const sql = require('mssql');
const dbConfig = require('./db');

async function connectToDatabase() {
  try {
    let pool = await sql.connect(dbConfig);
    console.log("Connected SQL");
    return pool;
  } catch (error) {
    console.log('Error connecting to SQL Server:', error);
  }
}

module.exports = connectToDatabase;