import { Router } from "express";
import { createTables } from "./models.service.js";

const tablesRouter = Router();

tablesRouter.post("/create-tables", createTables);

export default tablesRouter;
