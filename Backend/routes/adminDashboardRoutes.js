const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/auth");
const { getAdminDashboard } = require("../controller/adminDashboardController");

router.get("/summary", verifyToken, isAdmin, getAdminDashboard);

module.exports = router;
