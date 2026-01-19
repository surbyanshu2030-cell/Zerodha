require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const HoldingsModel = require("./models/HoldingsModel");
const PositionsModel = require("./models/PositionsModel");
const OrdersModel = require("./models/OrdersModel");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

/* ------------------ MONGODB CONNECTION ------------------ */
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error(err));

/* ------------------ HOLDINGS ------------------ */
// app.get("/addHoldings", async (req, res) => {
//   try {
//     const holdings = [
//       {
//         name: "BHARTIARTL",
//         qty: 2,
//         avg: 538.05,
//         price: 541.15,
//         net: "+0.58%",
//         day: "+2.99%",
//       },
//       {
//         name: "HDFCBANK",
//         qty: 2,
//         avg: 1383.4,
//         price: 1522.35,
//         net: "+10.04%",
//         day: "+0.11%",
//       },
//     ];

//     await HoldingsModel.insertMany(holdings);
//     res.send("Holdings Added");
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

/* ------------------ POSITIONS ------------------ */
// app.get("/addPositions", async (req, res) => {
//   try {
//     const positions = [
//       {
//         product: "CNC",
//         name: "SBIN",
//         qty: 4,
//         avg: 324.35,
//         price: 430.2,
//         net: "+32.63%",
//         day: "-0.34%",
//         isLoss: false,
//       },
//       {
//         product: "CNC",
//         name: "TATAPOWER",
//         qty: 5,
//         avg: 104.2,
//         price: 124.15,
//         net: "+19.15%",
//         day: "-0.24%",
//         isLoss: false,
//       },
//     ];

//     await PositionsModel.insertMany(positions);
//     res.send("Positions Added");
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

/* ------------------ ORDERS ------------------ */
// app.get("/addOrders", async (req, res) => {
//   try {
//     const orders = [
//       {
//         name: "INFY",
//         qty: 1,
//         price: 1500,
//         mode: "BUY",
//       },
//       {
//         name: "TCS",
//         qty: 2,
//         price: 3200,
//         mode: "SELL",
//       },
//     ];

//     await OrdersModel.insertMany(orders);
//     res.send("Orders Added");
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

/* ------------------ SERVER ------------------ */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});