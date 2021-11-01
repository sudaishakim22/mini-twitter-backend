CREATE DATABASE minitwitter;

CREATE TABLE users(
   user_id INT GENERATED ALWAYS AS IDENTITY,
   user_name VARCHAR(255) NOT NULL,
   user_email VARCHAR(100),
   user_password VARCHAR(100),
   PRIMARY KEY(user_id)
);

CREATE TABLE tweet (
    tweet_id SERIAL,
    user_id INT,
    tweet_body VARCHAR(240),
    create_at DATE NOT NULL DEFAULT CURRENT_DATE,
    update_at DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY(tweet_id),
    CONSTRAINT fk_users
      FOREIGN KEY(user_id) 
	  REFERENCES users(user_id)
);