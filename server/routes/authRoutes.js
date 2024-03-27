const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

router.get("/");
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);

module.exports = router;
