import express from "express";
import { getBarChart, getDashboardStats, getLineChart, getPieChart } from "../controllers/stats.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

app.get("/stats",adminOnly,getDashboardStats);
app.get("/pie",adminOnly,getPieChart);
app.get("/bar",adminOnly,getBarChart);
app.get("/line",adminOnly,getLineChart);

export default app;
