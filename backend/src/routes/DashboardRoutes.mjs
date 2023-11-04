import express from "express";
import verifyJWT from "../utils/authMiddleware.mjs"
const router = express.Router();

router.get("/dashboard", verifyJWT, (req, res) => {
  res.send({page: 'dashboard'});
});

export default router;