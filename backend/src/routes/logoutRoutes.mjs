import express from 'express';
import { User } from '../models/User.mjs';
import passport from 'passport';

const router = express.Router();

router.get('/logout', (req, res) => {
  req.logout(()=>{

    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          res.status(500).json({ message: 'Error logging out' });
        } else {
          res.clearCookie('connect.sid');
          res.status(200).json({ message: 'Logout successful' });
        }
      });
    } else {
      // no session object
      res.status(200).json({ message: 'No session' });
    }
  });
  
});


export default router;