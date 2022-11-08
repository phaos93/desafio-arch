const express = require("express");
const verifyLogin = require("./authentication/verifyLogin")

const router = express();

router.use(verifyLogin);

module.exports = router;