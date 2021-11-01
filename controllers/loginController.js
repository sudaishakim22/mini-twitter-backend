const pool = require("../db");

const userLogin = async (req, res) => {
  try {
    const { userName, userPassword } = req.body;
    const result = await pool.query(
      "SELECT user_id, user_name, user_email FROM users WHERE user_name = $1 AND user_password = $2",
      [userName, userPassword]
    );
    if (result.rowCount === 1) {
      res.json({
        message: "login success",
        data: result.rows[0],
      });
    } else {
      res.send({
        message: "No User Found",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

module.exports = {
  userLogin,
};
