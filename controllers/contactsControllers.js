const { httpError } = require("../helpers");
const { addSchema, updateSchema } = require("../schemas/schema");
const Contact = require("../models/contacts");
const { User } = require("../models/users");

const getContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "name email");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await Contact.findById(id);
    if (!result) {
      throw httpError(404, "Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw httpError(400, error.message);
    }

    const { _id: owner } = req.user;
    const currentUser = await User.findOne({ _id: owner });
    if (!currentUser) {
      throw httpError(404, "User not found");
    }

    const result = await Contact.create({
      ...req.body,
      owner: currentUser._id,
    });
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw httpError(404, "Contact not found");
  }
  res.json({ message: "Contact deleted successfully", contact: result });
};

const updateContact = async (req, res, next) => {
  const body = req.body;

  try {
    const { error } = addSchema.validate(body);
    if (error) {
      throw httpError(400, error.message);
    }
    const id = req.params.contactId;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw httpError(404, "Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateContactFavorite = async (req, res, next) => {
  try {
    const { error } = updateSchema.validate(req.body);
    if (error) {
      throw httpError(400, error.message);
    }
    const id = req.params.contactId;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw httpError(404, "Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  updateContactFavorite,
};
