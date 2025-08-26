import express from "express";
import { exportCitiesToExcel, exportCitiesToJSON } from "./exporter";

const app = express();
const PORT = 3000;

app.get("/export-cities", async (_req, res) => {
  await exportCitiesToExcel();
  res.send("Cities exported to cities.xlsx");
});

app.get("/export-cities-json", async (_req, res) => {
  const data = await exportCitiesToJSON();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
