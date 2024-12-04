import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
function Row({ row, fetchData }) {
  const [open, setOpen] = useState(false);
  const historyData = Array.isArray(row.history) ? row.history : [];
  const delData = async (id, name) => {
    if (window.confirm(`Bạn chắc chắn muốn xóa dữ liệu có tên ${name}?`)) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/deleteData/${id}`
        );
        if (response.status === 200) {
          alert(`Xóa ${name} thành công`);
          fetchData();
        } else {
          alert("Xóa bị hủy bỏ");
        }
      } catch (e) {
        console.log("Error: ", e);
      }
    } else {
      alert("Xóa bị hủy bỏ");
    }
  };

  const updateData = () => { };
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.purchase}</TableCell>
        <TableCell align="center">{row.selling}</TableCell>
        <TableCell align="center">
          {row.profit != null ? row.profit : 0}
        </TableCell>
        <TableCell align="center">
          <div className="flex flex-row items-center justify-between">
            <MdDeleteOutline onClick={() => delData(row.id, row.name)} />
            <IoSettingsOutline onClick={updateData} />
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="history">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historyData.map((historyRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    purchase: PropTypes.number.isRequired,
    selling: PropTypes.number.isRequired,
    profit: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        customerId: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default function CollapsibleTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [dataName, setDataName] = useState("");
  const [dataPurchase, setDataPurchase] = useState("");
  const [dataSelling, setDataSelling] = useState("");
  const [showInput, setShowInput] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/fullData`
      );
      if (response.status === 200 && Array.isArray(response.data.data2)) {
        const dataWithHistory = response.data.data2.map((item) => ({
          ...item,
          history: Array.isArray(item.history) ? item.history : [],
        }));
        setData(dataWithHistory);
      } else {
        console.error("Invalid data format");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  const sortData = (data) => {
    return [...data].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.purchase - b.purchase;
      } else {
        return b.purchase - a.purchase;
      }
    });
  };

  useEffect(() => {
    if (data.length > 0) {
      const sortedData = sortData(data);
      if (JSON.stringify(sortedData) !== JSON.stringify(data)) {
        setData(sortedData);
      }
    }
  }, [sortOrder]);
  const addNewData = async () => {
    if (showInput) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/addData`,
          {
            name: dataName,
            purchase: dataPurchase,
            selling: dataSelling,
          }
        );

        if (response.status === 200) {
          console.log("Thêm mới thành công");
          fetchData();
          setDataName("");
          setDataPurchase("");
          setDataSelling("");
        } else {
          console.log("Thêm mới thất bại");
        }
      } catch (e) {
        console.log("Error: ", e);
      }
    } else {
      setShowInput(true);
    }
  };
  const closeInput=()=>{
    setShowInput(false)
  }

  const totalPurchase =
    Array.isArray(data) && data.length > 0
      ? data.reduce((acc, row) => acc + row.purchase, 0)
      : 0;

  const totalSelling =
    Array.isArray(data) && data.length > 0
      ? data.reduce((acc, row) => acc + row.selling, 0)
      : 0;

  const totalProfit = totalSelling - totalPurchase;
  const filteredData = data.filter((row) => {
    const matchesName = row.name
      .toLowerCase()
      .includes(filterText.toLowerCase());
    const matchesPurchase = row.purchase.toString().includes(filterText);

    return matchesName || matchesPurchase;
  });

  return (
    <div className="flex flex-col flex-1 p-[20px] gap-[20px]">
      <div className="flex w-[45%] justify-between">
        <input
          type="text"
          className="border-[1px] border-black w-[200px] placeholder:pl-[5px] pl-[5px]"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Filter by name or purchase"
        />
        <button
          onClick={addNewData}
          className="bg-[#48B02C] px-[10px] text-white"
        >
          Thêm mới
        </button>
      </div>
      {showInput &&(
        <div className="flex gap-4">
          <input
            type="text"
            className="border-[1px] border-black w-[200px] placeholder:pl-[5px] pl-[5px]"
            value={dataName}
            onChange={(e) => setDataName(e.target.value)}
            placeholder="Enter the name"
            required
          />
          <input
            type="text"
            className="border-[1px] border-black w-[200px] placeholder:pl-[5px] pl-[5px]"
            value={dataPurchase}
            onChange={(e) => setDataPurchase(e.target.value)}
            placeholder="Enter the purchase"
            required
          />
          <input
            type="text"
            className="border-[1px] border-black w-[200px] placeholder:pl-[5px] pl-[5px]"
            value={dataSelling}
            onChange={(e) => setDataSelling(e.target.value)}
            placeholder="Enter the selling"
            required
          />
          <button onClick={closeInput} className="bg-red-500 px-[10px] text-white"> Đóng</button>
        </div>
      )}

      <div className="flex flex-row">
        <TableContainer component={Paper} className="flex flex-1">
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell align="center">
                  <span
                    className="flex items-center gap-2 cursor-pointer hover:text-gray-400"
                    onClick={toggleSortOrder}
                  >
                    {sortOrder === "asc" ? (
                      <>
                        <FaCaretUp /> Purchase Price
                      </>
                    ) : (
                      <>
                        <FaCaretDown /> Purchase Price
                      </>
                    )}
                  </span>
                </TableCell>
                <TableCell align="center">Selling Price</TableCell>
                <TableCell align="center">Profit</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                sortData(filteredData).map((row, index) => (
                  <Row key={index} row={row} fetchData={fetchData} />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    {loading ? "Loading..." : "No data available"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex flex-1 flex-col ml-[100px]">
          <span>Tổng chi: {totalPurchase}</span>
          <span>Tổng thu: {totalSelling}</span>
          <span>Tổng lãi: {totalProfit}</span>
        </div>
      </div>
    </div>
  );
}
