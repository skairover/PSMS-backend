
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");



dotenv.config();

const app = express();

app.use(cors({
  origin: 'https://team18.vercel.app', // replace with your Vercel URL
  credentials: true, // if you are using cookies or auth
}));
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));   

app.get("/", (req, res) => {
  res.send("API running");
});

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});