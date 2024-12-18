import connection from "./DB/connection.js";
import tablesRouter from "./DB/models/models.controller.js";
import productsRouter from "./modules/products/products.controller.js";
import userRouter from "./modules/users/user.controller.js";

const bootstrap = (app, express) => {
  app.use(express.json());
  app.use("/DB",tablesRouter)
  app.use("/user",userRouter)
  app.use("/products",productsRouter)
  connection
};

export default bootstrap;
