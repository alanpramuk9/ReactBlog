function isAdmin(req, res, next) {
    if (req.user.role === "admin") {
      next();
    } else {
      res.sendStatus(403);
    }
  }
  
  export { isAdmin };