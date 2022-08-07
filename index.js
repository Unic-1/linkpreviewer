const express = require("express");
const { fetchUrl } = require("./parser");
const cors = require("cors");
const { application } = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile("./index.html", { root: __dirname });
});

app.get("/api/greeting", (req, res) => {
  res.status(200).json({
    greeting: "Hello",
  });
});

app.get("/api/url/info", async (req, res) => {
  const { url } = req.query;
  const urlPattern =
    /((http|https):\/\/)(www.)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  const isValidUrl = url.match(urlPattern);

  if (isValidUrl) {
    const result = await fetchUrl(url);
    return res.status(200).json({
      success: true,
      info: result,
    });
  }

  res.status(400).json({
    success: false,
    message: "Invalid URL",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
