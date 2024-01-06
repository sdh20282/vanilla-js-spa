const express = require("express");
const path = require("path");

const app = express();

// middleware 설정
// '/'으로 시작되는 경로로 접속 시 src가 기본 고정 경로로 고정
app.use("/", express.static(path.resolve(__dirname, "src", "")))

// SPA이기 때문에, 모든 경로에서 index.html 호출
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "src", "index.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...")
});