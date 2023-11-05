function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.currentUser = req.user.username;
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