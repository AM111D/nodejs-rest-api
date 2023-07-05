const { User } = require("../models/users");
const { httpError } = require("../helpers");

const register = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      throw httpError(409, "Email already in use");
    }

    const newUser = await User.create(req.body);

    res.status(201).json({
      email: newUser.email,
      name: newUser.name,
    });
  } catch (error) {
    next(error); // Передаем ошибку в следующий обработчик ошибок
  }
};

module.exports = {
  register,
};
