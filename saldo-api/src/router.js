const express = require("express");
const verifyLogin = require("./authentication/verifyLogin")
const balance = require("./controllers/balance")

const router = express();

router.use(verifyLogin);

router.get('/balance', balance.getBalance)

module.exports = router;