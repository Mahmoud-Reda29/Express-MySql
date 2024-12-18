import { Router } from "express";
import { emailExists } from "../../middleware/emailExists.js";
import {
  addUser,
  alterTable,
  loginUser,
  truncateTable,
} from "./users.service.js";
import { isAdmin } from "../../middleware/isAdmin.js";

const userRouter = Router();

userRouter.post("/signup", emailExists, addUser);
userRouter.post("/login", emailExists, loginUser);
userRouter.post("/alter-table", isAdmin, alterTable);
userRouter.post("/truncate-table", isAdmin, truncateTable);

export default userRouter;
