var express = require('express');
var router = express.Router();
require('dotenv').config();

const db = require('../db');

// Create post
router.post('/', async (req, res) => {
	var date_ob = new Date();
	var day = ('0' + date_ob.getDate()).slice(-2);
	var month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
	var year = date_ob.getFullYear();
	var created_date = year + '-' + month + '-' + day;

	try {
		const response = await db.query(
			'INSERT INTO posts (title, body, user_id, author, created_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
			[
				req.body.title,
				req.body.body,
				req.body.user_id,
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

// Get all posts
router.get('/', async (req, res) => {
	try {
		const response = await db.query('SELECT * FROM posts');
		res.status(200).json(response.rows);
	} catch (error) {
		res.status(500).json({ error });
	}
});

// Get post with specific ID
router.get('/:id', async (req, res) => {
	try {
		const response = await db.query('SELECT * FROM posts WHERE posts.post_id=$1', [req.params.id]);
		res.status(200).json(response.rows);
	} catch (error) {
		res.status(500).json({ error });
	}
});

// Update posts with ID
router.put('/:id', async (req, res) => {
	try {
		const response = await db.query(
			'UPDATE posts SET title=$1, body=$2 WHERE posts.post_id=$3 RETURNING *',
			[req.body.title, req.body.body, req.params.id]
		);
		res.status(200).json(response.rows)
	} catch (error) {
		res.status(500).json({ error });
	}
});

// Delete posts with ID
router.delete('/:id', async (req, res) => {
	try {
		const response = await db.query('DELETE FROM posts WHERE posts.post_id=$1 RETURNING *', [req.params.id])
		res.status(200).json(response.rows)
		// TODO: Handle case the post has already deleted!
	} catch (error) {
		res.status(500).json({error})
	}
})

module.exports = router;
