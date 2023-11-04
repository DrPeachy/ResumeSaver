import express from "express";
import * as auth from "../utils/auth.mjs";

const router = express.Router();


router.get("/dashboard", auth.checkAuthenticated, (req, res) => {
  res.status(200).json({ message: "You're authorized to see this secret message." });
});

export default router;