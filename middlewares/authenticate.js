const jwt = require("jsonwebtoken");

const { User } = require("../models/users");

const { httpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (token && bearer !== "Bearer") {
    next(httpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      next(httpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(httpError(401));
  }
};

module.exports = authenticate;
