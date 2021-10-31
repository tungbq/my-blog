var express = require('express');
var router = express.Router();
require('dotenv').config();

const db = require('../db');
db.query('SELECT * FROM users').then((result) => console.log(result));

/* GET home page. */
router.get('/', function (req, res, next) {
	res.send({ message: 'Hi, there!' });
});

module.exports = router;
