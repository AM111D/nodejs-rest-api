const { httpError } = require("../helpers");
const { User } = require("../models/users");

const verifyToken = async (req, res) => {
  const { verificationToken } = req.params;
  // console.log(verificationToken);
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw httpError(400, "Verify token is not valid");
  }

  if (user.verify) {
    throw httpError(400, "User has already verificated");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    // verificationToken: null,
  });

  return res.json({ message: "Success" });
};

module.exports = verifyToken;
