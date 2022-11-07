const express = require("express");
const users = require("./controllers/users");
const verifyLogin = require("./authentication/verifyLogin");

const router = express();

router.post('/users', users.registerUser);
router.post('/login', users.loginUser);

router.use(verifyLogin);

router.put('/users', users.updateUser);

module.exports = router;