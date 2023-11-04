function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("authenticated");
    next();
  }else{
    console.log("not authenticated");
    res.status(401).json({ message: "You are not authenticated to see this secret message." });
  }
  // If not authenticated, redirect to the signup page
}

export {
  checkAuthenticated
};