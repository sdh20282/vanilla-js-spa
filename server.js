const express = require("express");
const path = require("path");

const app = express();

app.use("/", express.static(path.resolve(__dirname, "src", "")))

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "src", "index.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('\x1b[1m%s\x1b[0m', `🏃 Now running on port [${process.env.PORT || 3000}]`);
  console.log(`>> http://localhost:${process.env.PORT || 3000}`);
});