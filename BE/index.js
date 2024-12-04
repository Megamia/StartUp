const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const FullDataRouter =require("./component/FullData");
const AddDataRouter =require("./component/AddData")
const DeleteDataRouter =require("./component/DeleteData")

const app = express();
const port = 4000;

app.use(
  session({
    genid: (req) => {
      return uuidv4();
    },
    secret: "as63d1265qw456q41rf32ds1g85456e1r32w1r56qr41_qwe1qw56e42a30s0",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(cors());
app.use(express.json());

app.get("/api/status", (req, res) => {
  res.status(200).send("Backend is up and running.");
});

app.use("/api/fullData", FullDataRouter);
app.use("/api/addData", AddDataRouter);
app.use("/api/deleteData", DeleteDataRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
