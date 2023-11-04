import express from 'express';
import { User } from '../models/User.mjs';
import passport from 'passport';

const router = express.Router();

router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login-success' }));

// Define the login success and failure routes as needed
router.get('/login-success', (req, res) => {
  res.json({ message: 'Login successful' });
});

router.get('/login-failure', (req, res) => {
  res.json({ message: 'Login failed' });
});

export default router; 