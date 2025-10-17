// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname)); // sirve los archivos HTML, CSS y JS
app.use(express.json());

// Ruta para leer memoriales
app.get("/api/memorials", (req, res) => {
  const file = path.join(__dirname, "data.json");
  if (!fs.existsSync(file)) fs.writeFileSync(file, "[]");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  res.json(data);
});

// Ruta para guardar memorial
app.post("/api/memorials", (req, res) => {
  const file = path.join(__dirname, "data.json");
  const newMemorial = req.body;

  let data = [];
  if (fs.existsSync(file)) {
    data = JSON.parse(fs.readFileSync(file, "utf8"));
  }

  data.push(newMemorial);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.status(201).json({ message: "Memorial guardado" });
});

app.listen(PORT, () => console.log(`🌺 Servidor corriendo en http://localhost:${PORT}`));
