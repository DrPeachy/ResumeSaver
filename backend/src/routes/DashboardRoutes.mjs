import express from "express";
import * as auth from "../utils/auth.mjs";

const router = express.Router();


router.get("/dashboard", auth.checkAuthenticated, (req, res) => {
  res.status(200).json({ data: "dashboard info" });
});

router.get("/checkToken", auth.checkAuthenticated, (req, res) => {
  res.sendStatus(200);
});

export default router;