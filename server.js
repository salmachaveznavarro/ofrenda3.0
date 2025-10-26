// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.static(__dirname));
app.use(express.json());

// Leer memoriales
app.get("/api/memorials", (req, res) => {
  const file = path.join(__dirname, "data.json");
  if (!fs.existsSync(file)) fs.writeFileSync(file, "[]");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  res.json(data);
});

// Guardar memorial
app.post("/api/memorials", (req, res) => {
  const file = path.join(__dirname, "data.json");
  const newMemorial = req.body;
  newMemorial.id = Date.now(); // genera ID único

  let data = [];
  if (fs.existsSync(file)) {
    data = JSON.parse(fs.readFileSync(file, "utf8"));
  }

  data.push(newMemorial);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.status(201).json({ message: "Memorial guardado" });
});

// 🚀 NUEVO: borrar memorial
app.delete("/api/memorials/:id", (req, res) => {
  const file = path.join(__dirname, "data.json");
  if (!fs.existsSync(file)) return res.status(404).json({ message: "No existe data.json" });

  let data = JSON.parse(fs.readFileSync(file, "utf8"));
  const id = req.params.id;

  data = data.filter(item => String(item.id) !== String(id));

  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.json({ message: "Memorial borrado" });
});

app.listen(3000, "0.0.0.0", () => console.log("Server ready at http://0.0.0.0:3000"));
