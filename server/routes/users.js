var express = require('express');
var router = express.Router();
require('dotenv').config();

const db = require('../db');

// The route /users/posts must be declared before /users/:id to avoid unexpected error!
// Get all posts of user
router.get('/posts', async (req, res) => {
	try {
		const username = String(req.query.username);
		const response = await db.query(
			'SELECT * FROM posts WHERE posts.author = $1',
			[username]
		);
		res.status(200).json(response.rows);
	} catch (error) {
		res.status(500).json(error);
	}
});

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
		res.status(201).json(response.rows);
	} catch (error) {
		console.error({ error });
		res.status(500).json({ error });
	}
});

// Get all users
router.get('/', async (req, res) => {
	try {
		const response = await db.query(
			'SELECT user_id, username, email, email_verified, created_date, last_login FROM users'
		);
		res.status(200).json(response.rows);
	} catch (error) {
		res.status(500).json({ error });
	}
});

// Get post with specific ID
router.get('/:id', async (req, res) => {
	try {
		const response = await db.query(
			'SELECT user_id, username, email, email_verified, created_date, last_login FROM users WHERE users.user_id=$1',
			[req.params.id]
		);
		res.status(200).json(response.rows);
	} catch (error) {
		res.status(500).json({ error });
	}
});

// Update users with ID
router.put('/:id', async (req, res) => {
	try {
		const response = await db.query(
			'UPDATE users SET username = $1, email = $2, password = $3, email_verified = $4, last_login = $5 WHERE users.user_id=$6 RETURNING *',
			[
				req.body.user,
				req.body.email,
				req.body.password,
				req.body.email_verified,
				req.body.last_login,
				req.params.id,
			]
		);
		res.status(200).json(response.rows);
	} catch (error) {
		res.status(500).json({ error });
	}
});

// // Delete users with ID, SKIP FOR NOW
// router.delete('/:id', async (req, res) => {
// 	try {
// 		const response = await db.query(
// 			'DELETE FROM users WHERE users.user_id=$1 RETURNING *',
// 			[req.params.id]
// 		);
// 		res.status(200).json(response.rows);
// 		// TODO: Handle case the user has already deleted!
// 	} catch (error) {
// 		res.status(500).json({ error });
// 	}
// });

module.exports = router;
