const userRoutes = require("./user");

const routes = (app) => {
  app.use("/", userRoutes);
};

module.exports = routes;
