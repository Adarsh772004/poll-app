const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/auth");
const {
  getAllUsers,
  updateUserStatus,
  deleteUser,
} = require("../controller/adminUserController");

router.get("/", verifyToken, isAdmin, getAllUsers);
router.patch("/:id/status", verifyToken, isAdmin, updateUserStatus);
router.delete("/:id", verifyToken, isAdmin, deleteUser);

module.exports = router;
