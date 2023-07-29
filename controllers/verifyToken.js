const { httpError } = require("../helpers");
const User = require("../models/users");

const verifyToken = async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({ verifyToken: token });

  if (!user) {
    throw httpError(400, "Verify token is not valid");
  }

  if (user.verify) {
    throw httpError(400, "User has already verificated");
  }

  await User.findByIdUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  return res.json({ message: "Success" });
};

module.exports = verifyToken;
