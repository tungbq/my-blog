var express = require('express');
var router = express.Router();
require('dotenv').config();

const db = require('../db');

// Create comment
router.post('/', async (req, res) => {
	var date_ob = new Date();
	var day = ('0' + date_ob.getDate()).slice(-2);
	var month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
	var year = date_ob.getFullYear();
	var created_date = year + '-' + month + '-' + day;

	try {
		const response = await db.query(
			'INSERT INTO comments (comment, user_id, post_id, author, created_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
			[
				req.body.comment,
				req.body.user_id,
				req.body.post_id,
				req.body.author,
				created_date,
			]
		);
		res.status(201).json(response.rows);
	} catch (error) {
		console.error({ error });
		res.status(500).json({ error });
	}
});

// Get all comments
router.get('/', async (req, res) => {
	try {
		const response = await db.query('SELECT * FROM comments');
		res.status(200).json(response.rows);
	} catch (error) {
		res.status(500).json({ error });
	}
});

// Get post with specific ID
router.get('/:id', async (req, res) => {
	try {
		const response = await db.query('SELECT * FROM comments WHERE comments.comment_id=$1', [req.params.id]);
		res.status(200).json(response.rows);
	} catch (error) {
		res.status(500).json({ error });
	}
});

// Update comments with ID
router.put('/:id', async (req, res) => {
	try {
		const response = await db.query(
			'UPDATE comments SET comment=$1 WHERE comments.comment_id=$2 RETURNING *',
			[req.body.comment, req.params.id]
		);
		res.status(200).json(response.rows)
	} catch (error) {
		res.status(500).json({ error });
	}
});

// Delete comments with ID
router.delete('/:id', async (req, res) => {
	try {
		const response = await db.query('DELETE FROM comments WHERE comments.comment_id=$1 RETURNING *', [req.params.id])
		res.status(200).json(response.rows)
		// TODO: Handle case the comment has already deleted!
	} catch (error) {
		res.status(500).json({error})
	}
})

module.exports = router;
