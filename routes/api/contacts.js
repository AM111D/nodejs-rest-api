const express = require("express");
const contactsController = require("../../controllers/contactsControllers");
const { authenticate } = require("../../middlewares");

const router = express.Router();

// router.use(authenticate);

router.get("/", authenticate, contactsController.getContacts);
router.get("/:contactId", authenticate, contactsController.getContactById);
router.post("/", authenticate, contactsController.createContact);
router.delete("/:contactId", authenticate, contactsController.deleteContact);
router.put("/:contactId", authenticate, contactsController.updateContact);
router;

module.exports = router;
