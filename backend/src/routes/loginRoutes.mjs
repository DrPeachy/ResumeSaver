import express from 'express';

const router = express.Router();

router.get('/login', (req, res) => {
  res.send({page: 'login'});
});

export default router;