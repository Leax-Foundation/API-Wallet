const express = require("express");
const router = express.Router();

const seedRoute = require('./seed');
const erc20Route = require('./erc20');
const mailerRoute = require('./mailer');
const ledgerRoute = require('./ledger');

router.use('/seed', seedRoute);
router.use('/erc20', erc20Route);
router.use('/mailer', mailerRoute);
router.use('/ledger', ledgerRoute);

module.exports = router;
