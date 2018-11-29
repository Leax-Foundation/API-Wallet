const express = require("express");
const Erc20Controller = require("../controllers/erc20");

const router = express.Router();
const erc20Controller = new Erc20Controller();

router.post('/', (req, res) => erc20Controller.create(req, res));
router.post('/login/json', (req, res) => erc20Controller.loginWithJson(req, res));
router.post('/login/seed', (req, res) => erc20Controller.loginWithSeed(req, res));
router.post('/token/balance', (req, res) => erc20Controller.getTokenBalance(req, res));
router.post('/token/send', (req, res) => erc20Controller.sendToken(req, res));
router.post('/eth/balance', (req, res) => erc20Controller.getEthBalance(req, res));
router.post('/eth/send', (req, res) => erc20Controller.sendEth(req, res));
router.post('/recovery/seed', (req, res) => erc20Controller.recoverySeed(req, res));
router.post('/sendFile', (req, res) => erc20Controller.sendFile(req, res));
router.get('/transaction/:address', (req, res) => erc20Controller.getTransactions(req, res));

module.exports = router;