var express = require('express');
var router = express.Router();
require('dotenv').config();

const db = require('../db');

// Create user
router.post('/', async (req, res) => {
	var date_ob = new Date();
	var day = ('0' + date_ob.getDate()).slice(-2);
	var month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
	var year = date_ob.getFullYear();
	var created_date = year + '-' + month + '-' + day;

	try {
		const response = await db.query(
			'INSERT INTO users (username, password, email, created_date) VALUES ($1, $2, $3, $4) RETURNING *',
			[req.body.username, req.body.password, req.body.email, created_date]
		);
		console.log(response.rows);
		res.status(201).json(response.rows);
	} catch (error) {
		console.error({ error });
		res.status(500).json({ error });
	}
});

module.exports = router;
