import express from "express";
const router = express.Router();
import { User } from "../models/User.mjs";
import passport from "passport";

router.post("/signup", (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    passport.authenticate("local")(req, res, () => {
      res.status(201).json({ message: "Registration successful" });
    });
  });
});

router.get("/signup", (req, res) => {
  res.json({ message: "Signup" });
});

export default router;