const pool = require("../../db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const secretKey = process.env.SECRET_KEY_JWT;
    const jwtVerify = jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return false;
      }

      return decoded;
    });

    if (!jwtVerify) {
      return res.status(401).json({ message: "Token incorrecto" });
    }

    const userId = jwtVerify.id;

    const user = await pool.query(
      `SELECT * FROM usuarios WHERE id='${userId}'`
    );

    return res.status(401).json({ data: user.rows[0] });
  } catch (error) {
    res.status(500).send({
      message: "Error get User",
    });

    throw error;
  }
};

module.exports = getUser;
