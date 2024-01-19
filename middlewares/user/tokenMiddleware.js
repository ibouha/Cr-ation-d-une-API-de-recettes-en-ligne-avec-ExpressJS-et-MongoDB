const jwt = require("jsonwebtoken");

async function authenticateToken(req, res, next) {
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  const secretKey = process.env.SECRET_KEY;

  try {
    const decodedToken = await jwt.verify(token, secretKey);
    if (decodedToken.isAdmin === true) {
      req.user = decodedToken; // Assuming you want to store the decoded token in the request object
      next();
    }
    return res.status(403).json({ message: "You dont have the eligibility !" });
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
}

module.exports = authenticateToken;
