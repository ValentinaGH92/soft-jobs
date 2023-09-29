const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;

app.use(cors());

app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

app.use(express.json());

routes(app);

app.listen(port, () => {
  console.log(`La aplicación está funcionando en http://localhost:${port}`);
});
