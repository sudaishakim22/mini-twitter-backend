const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const usersRoutes = require("./routes/usersRoute");
const loginRoutes = require("./routes/loginRoute");
const registerRoutes = require("./routes/registerRoute");

const { PORT } = require("./constants/index");

// middleware
app.use(cors());
app.use(express.json());

// routes //
app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);

// create a tweet

app.post("/tweet", async (req, res) => {
  try {
    const { tweetBody, userId } = req.body;
    const newTweet = await pool.query(
      "INSERT INTO tweet (tweet_body, user_id) VALUES($1, $2) RETURNING *",
      [tweetBody, userId]
    );

    res.send({
      message: "success create new tweet",
      data: newTweet.rows[0],
    });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

// get all tweets

app.get("/tweet", async (req, res) => {
  try {
    const allTweets = await pool.query(
      "SELECT * FROM tweet ORDER BY tweet_id DESC"
    );
    res.json(allTweets.rows);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

/// get all tweet by userId

app.get("/user/tweet/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allTweets = await pool.query(
      "SELECT * FROM tweet WHERE user_id = $1 ORDER BY tweet_id DESC",
      [id]
    );
    res.json(allTweets.rows);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

// get a tweet
app.get("/tweet/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tweet = await pool.query("SELECT * FROM tweet WHERE tweet_id = $1", [
      id,
    ]);
    res.json(tweet.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

// update a tweet

app.put("/tweet/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { tweetBody, update_date } = req.body;

    const updateTweet = await pool.query(
      "UPDATE tweet SET tweet_body = $1, update_at = $2 WHERE tweet_id = $3",
      [tweetBody, update_date, id]
    );

    res.json({
      message: "Tweet was updated",
    });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

// delete a tweet

app.delete("/tweet/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTweet = await pool.query(
      "DELETE FROM tweet WHERE tweet_id = $1",
      [id]
    );

    res.json({
      message: "Tweet was deleted!",
    });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
