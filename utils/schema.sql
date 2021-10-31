CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  email_verified BOOLEAN,
  created_date DATE,
  last_login DATE
);
CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  user_id INT REFERENCES users(user_id),
  like_user_id INT [] DEFAULT ARRAY []::INT [],
  created_date DATE,
  author VARCHAR REFERENCES users(username),
  likes INT DEFAULT 0
);
CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  comment TEXT NOT NULL,
  user_id INT REFERENCES users(user_id),
  post_id INT REFERENCES posts(post_id),
  author VARCHAR REFERENCES users(username),
  created_date DATE
)