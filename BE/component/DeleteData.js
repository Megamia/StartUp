const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConnection = require('../Config/dbConnection');

router.delete('/:id', async (req, res) => {
  try {
    await dbConnection();
    const pool = await sql.connect(dbConnection);
    const request = pool.request();
    const { id } = req.params;

    const result = await request.query(`DELETE FROM Data WHERE id = ${id}`);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: "Success" });
    } else {
      res.status(404).json({ message: "No data found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error connecting to SQL Server' });
  }
});

module.exports = router;
