const express = require("express");
const LedgerController = require("../controllers/ledger");

const router = express.Router();
const ledgerController = new LedgerController();

router.get('/', (req, res) => ledgerController.get(req, res));

module.exports = router;