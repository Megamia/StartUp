const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConnection = require('../Config/dbConnection');

router.get('/', async (req, res) => {
  try {
    await dbConnection();
    const pool = await sql.connect(dbConnection);
    const request = pool.request();
    const queryData = `
      SELECT *
      FROM Data
    `;
    const data1 = await request.query(queryData);
    const data2 =data1.recordset;
    res.status(200).json({data2});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error connecting to SQL Server' });
  }
});

module.exports = router;