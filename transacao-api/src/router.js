const express = require("express");
const users = require("./controllers/users");
const verifyLogin = require("./filters/verifyLogin");

const router = express();

router.post('/users', users.registerUser);
router.post('/login', users.loginUser);

router.use(verifyLogin);

module.exports = router;