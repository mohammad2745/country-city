import express from "express";
import { exportCitiesToExcel } from "./exporter";

const app = express();
const PORT = 3000;

app.get("/export-cities", async (_req, res) => {
  await exportCitiesToExcel();
  res.send("✅ Cities exported to cities.xlsx");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
