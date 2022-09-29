const express = require("express");
const createHttpError = require("http-errors");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const errorMiddleware = require("./middlewares/errorMiddleware");

connectDB();

const app = express();

// for parsing json requests
app.use(express.json());

// import routes
const user = require("./routes/userRoutes");

app.use("/api/v1", user);
app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This route does not exist"));
});
// use error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
