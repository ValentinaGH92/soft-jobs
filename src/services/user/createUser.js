const pool = require("../../db");
const encryptPassword = require("../../helpers/encryptPassword");

const createUser = async (req, res) => {
  try {
    const { email, password, rol = "NULL", lenguage = "NULL" } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "email or password is not defined",
      });
    }

    const findUserExist = await pool.query(
      `SELECT * FROM usuarios WHERE email='${email}'`
    );

    if (findUserExist.rowCount) {
      return res.status(400).send({
        message: "email is already found",
      });
    }

    const passwordEncripted = await encryptPassword(password);

    const result = await pool.query(
      `INSERT INTO usuarios(email, password, rol, lenguage) VALUES ('${email}', '${passwordEncripted}', '${rol}', '${lenguage}')`
    );

    if (result.rowCount) {
      return res
        .status(201)
        .send({ message: "user created sucessfully", userCreated: req.body });
    }

    return res.status(200).send("user not created");
  } catch (error) {
    res.status(500).send({
      message: "Error al crear un usuario",
    });

    throw error;
  }
};

module.exports = createUser;
