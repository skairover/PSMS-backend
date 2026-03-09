
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');



dotenv.config();

const app = express();

app.use(helmet());
app.set('trust proxy', true);


// ===== CORS (Allow frontend with credentials for cookies if needed) =====
app.use(cors({
  origin: ['http://localhost:5173', 'https://team18.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // allow cookies/auth headers
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
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