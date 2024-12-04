const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConnection = require('../Config/dbConnection');

router.post('/', async (req, res) => {
  try {
    await dbConnection();
    const pool = await sql.connect(dbConnection);
    const request = pool.request();

    const { name, purchase, selling } = req.body;
    const profit=selling-purchase;
    const queryAddData = `INSERT INTO Data (name, purchase, selling, profit) VALUES (@name, @purchase, @selling, @profit)`;

    await request
      .input('name', sql.NVarChar, name) 
      .input('purchase', sql.Decimal, purchase) 
      .input('selling', sql.Decimal, selling) 
      .input('profit', sql.Decimal, profit)
      .query(queryAddData);

    res.status(200).json({ message: "Data added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error connecting to SQL Server' });
  }
});

module.exports = router;
