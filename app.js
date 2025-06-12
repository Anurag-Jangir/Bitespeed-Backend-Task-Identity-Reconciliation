const express = require("express");
require("dotenv").config();
const sequelize = require("./config/db");
const Contact = require("./models/contact");
const identifyRoutes = require("./routes/identify");

const app = express();
app.use(express.json());

app.use("/", identifyRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log("Database connected and models synced.");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error("DB Connection Error:", err));
