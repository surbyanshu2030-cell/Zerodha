require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const HoldingsModel = require("./model/HoldingsModel");
const PositionsModel = require("./model/PositionsModel");
const OrdersModel = require("./model/OrdersModel");

const app = express();
const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// ================= CONNECT DB =================
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ================= ADD HOLDINGS =================
app.get("/addHoldings", async (req, res) => {
  try {
    const tempHoldings = [
      { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
      { name: "HDFCBANK", qty: 2, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
      { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%" },
      { name: "ITC", qty: 5, avg: 202.0, price: 207.9, net: "+2.22%", day: "+0.80%" }
    ];

    await HoldingsModel.deleteMany({});
    await HoldingsModel.insertMany(tempHoldings);

    res.send("✅ Holdings added successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= ADD POSITIONS =================
app.get("/addPositions", async (req, res) => {
  try {
    const tempPositions = [
      {
        product: "CNC",
        name: "JUBLFOOD",
        qty: 1,
        avg: 3124.75,
        price: 3082.65,
        net: "-10.04%",
        day: "-1.35%",
        isLoss: true
      }
    ];

    await PositionsModel.deleteMany({});
    await PositionsModel.insertMany(tempPositions);

    res.send("✅ Positions added successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= GET DATA =================
app.get("/allHoldings", async (req, res) => {
  const data = await HoldingsModel.find({});
  res.json(data);
});

app.get("/allPositions", async (req, res) => {
  const data = await PositionsModel.find({});
  res.json(data);
});

// ================= CREATE ORDER =================
app.post("/newOrder", async (req, res) => {
  try {
    const newOrder = new OrdersModel(req.body);
    await newOrder.save();
    res.send("✅ Order saved");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
