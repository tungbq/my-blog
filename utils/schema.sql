CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  created_date DATE,
  last_login DATE
);
CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  user_id REFERENCES users(user_id),
  like_user_id INT [],
  created_date DATE,
  author REFERENCE users(username),
  likes INT DEFAULT 0
);
CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  comment TEXT NOT NULL,
  user_id REFERENCES users(user_id),
  post_id REFERENCES posts(post_id),
  created_date DATE
)