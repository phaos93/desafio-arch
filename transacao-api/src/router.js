const express = require("express");
const users = require("./controllers/users");

const router = express();

router.post('/users', users.registerUser);
router.post('/login', users.loginUser);

module.exports = router;