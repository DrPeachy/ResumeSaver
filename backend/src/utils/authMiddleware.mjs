import jwt from "jsonwebtoken";
const verifyJWT = (req, res, next) => {
  const token = req.headers["Authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "No token provided" });
    console.log('No token provided');
    res.redirect('/login');
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ message: "You failed to authenticate" });
      } else {
        console.log('Token decoded:', decoded);
        req.userId = decoded.id;
        res.redirect('/dashboard');
        next();
      }
    });
  }
};

export default verifyJWT;