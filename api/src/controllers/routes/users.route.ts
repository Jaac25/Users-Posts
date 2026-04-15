import { Router } from "express";
import { verifyTokenClient } from "../../middlewares/autentication";
import { getUser, getUsers } from "../../repositories/reqresIn/users.req";
import { createUser } from "../../services/users.service";

const userRoutes = Router();

userRoutes.use(verifyTokenClient);

userRoutes.get("/:id", async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

userRoutes.get("/", async (req, res) => {
  try {
    const page = req.query.page?.toString();
    const users = await getUsers({ page });
    return res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

userRoutes.post("/", async (req, res) => {
  try {
    const user = await createUser(req.body);
    return res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default userRoutes;
