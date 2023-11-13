import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
    }

    // Store the user data in the request for further handling
    req.user = user;

    next(); // Continue with the next middleware
  });
}

export default authenticateToken;
