const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) res.send("auth failed");
    else {
      req.body.userId = decoded.userId;
      next();
    }
  });
};
module.exports = {
  authentication,
};
