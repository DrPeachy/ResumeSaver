import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';

const router = express.Router();
const User = mongoose.model('User');
router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login-success' }));

// Define the login success and failure routes as needed
router.get('/login-success', (req, res) => {
  res.status(200).json({ message: 'Login successful'});
});

router.get('/login-failure', (req, res) => {
  res.status(401).json({ message: 'Login failed'});
});


router.post('/checkUsername', async (req, res) => {
  // Check if username exists in database
  const username = req.body.username;
  const result = await User.findOne({ username: username });
  if (result) {
    res.json({ message: 'Username existed' });
  } else {
    res.json({});
  }

});
export default router; 