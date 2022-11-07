const express = require("express");
const users = require("./controllers/users");
const verifyLogin = require("./authentication/verifyLogin");
const transactions = require("./controllers/transactions");

const router = express();

router.post('/users', users.registerUser);
router.post('/login', users.loginUser);

router.use(verifyLogin);

router.put('/users', users.updateUser)

router.post('/transactions', transactions.registerTransaction)

module.exports = router;