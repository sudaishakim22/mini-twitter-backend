const pool = require("../db");

const registerUser = async (req, res) => {
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
  registerUser,
};
