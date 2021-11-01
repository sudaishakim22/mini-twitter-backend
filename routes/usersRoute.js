const express = require("express");
const { getUserById, createUser } = require("../controllers/usersControllers");

const router = express.Router();

router.post("/", createUser);

router.get("/:id", getUserById);

module.exports = router;
