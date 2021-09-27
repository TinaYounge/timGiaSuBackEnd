const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("req.headers.authorization", req.headers);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log("token1", token);

    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json(err);
      req.user = user;
      console.log("token", user);
      next();
    });
  } else {
    return res.status(401).json("You are not authenticate");
  }
};
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json("You are not allow to do that!");
    }
  });
};
module.exports = { verifyToken, verifyTokenAndAuthorization };
