const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const contactsShema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",

      // required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactsShema.post("save", handleMongooseError);

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
//   favorite: Joi.boolean().required(),
// });

// const schemas = {
//   addSchema,
// };

const Contact = model("contact", contactsShema);

module.exports = Contact;
