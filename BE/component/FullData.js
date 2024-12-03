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
    if (data2.recordset.length > 0) {
      res.status(200).json({ data: data2 });
  } else {
      res.status(404).json({ message: "No data found" });  // Trả về JSON với mã 404 khi không có dữ liệu
  }
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error connecting to SQL Server' });
  }
});

module.exports = router;