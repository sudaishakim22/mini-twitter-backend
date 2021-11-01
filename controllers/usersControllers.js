const pool = require("../db");

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    res.json(user.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const { userName, userEmail, userPassword } = req.body;

    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *",
      [userName, userEmail, userPassword]
    );

    res.send({
      message: "success create new user",
      data: newUser.rows[0],
    });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

module.exports = {
  getUserById,
  createUser,
};
