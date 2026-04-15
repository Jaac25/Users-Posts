import { Router } from "express";
import { getUser, getUsers } from "../../repositories/reqresIn/users.req";
import { saveUser } from "../../repositories/sequelize/users.sequelize";

const userRouter = Router();

userRouter.get("/:id", async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const page = req.body.page;
    const users = await getUsers({ page });
    return res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const user = await saveUser(req.body);
    return res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default userRouter;
