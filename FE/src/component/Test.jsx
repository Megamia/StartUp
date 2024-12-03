import React, { useState,useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import axios from "axios"

  export default function Test() {
  // const [searchTerm, setSearchTerm] = React.useState('');
  // const [fullData,setFullData]=useState("");
  // const data=async()=>{
  //   const response = await axios.get(
  //     `${process.env.REACT_APP_API_URL}/api/fulldata`
  //   );
  //   if (response.data===200){
  //     console.log(response.data)
  //   }
  // }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/fulldata`
        );
  
        if (response.status === 200) { // Sửa từ `response.data` thành `response.status`
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  // const filteredRows = rows.filter((row) =>
  //   row.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className='flex flex-1 mt-[50px] flex-col'>
      {/* <TextField
        label="Tìm kiếm"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '16px' }}
      /> */}
      <TableContainer component={Paper} >
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow >
              <div className=' flex flex-1  text-[30px] mb-[30px]'>
                <span className=' mr-[120px]'>
                  Tên hàng
                </span>
                <span className=''>
                  Giá
                </span>
              {/* <TableCell className='flex flex-1'>Tên mặt hàng</TableCell>
              <TableCell align="left" >Giá</TableCell> */}
              </div>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {filteredRows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <div className='w-[250px] flex flex-1'>

                <TableCell component="th" scope="row" className='flex flex-1'>
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row" className='flex flex-1'>
                  {row.purchase}
                </TableCell>
                <TableCell component="th" scope="row" className='flex flex-1'>
                  {row.selling}
                </TableCell>
                
                <TableCell align="left">{row.profit}</TableCell>
                </div>
              </TableRow>
             ))}  */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}