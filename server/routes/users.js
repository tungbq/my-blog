var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send({ message: 'Hi, this is user route' });
});

module.exports = router;
