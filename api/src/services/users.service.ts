import { IUser } from "../core/types/user";
import { User } from "../models/users.model";
import { getUser } from "../repositories/reqresIn/users.req";
import {
  findUserDB,
  saveUser,
} from "../repositories/sequelize/users.sequelize";
import bcrypt from "bcryptjs";

export const createUser = async (user: IUser) => {
  if (!user.email) throw new Error("Missing Email");
  if (!user.id) throw new Error("Missing id");
  if (!user.firstName) throw new Error("First name missing");
  if (!user.lastName) throw new Error("Last name missing");
  if (!user.password) throw new Error("Password missing");

  user.password = bcrypt.hashSync(user.password);

  const [newUser] = await saveUser(user);
  return newUser;
};

export const findUser = async (user: Partial<IUser>) => {
  const u = await findUserDB(user);
  return u;
};

export const fillUser = async () => {
  if ((await User.count()) > 0) return;
  const user = await getUser("12");
  if (!user) throw new Error("User not found");
  const encrypted_password = bcrypt.hashSync(
    `${user?.first_name.toLowerCase()}123`,
  );
  const [newUser] = await saveUser({
    id: user?.id,
    email: user?.email,
    firstName: user?.first_name,
    lastName: user?.last_name,
    avatar: user?.avatar,
    password: encrypted_password,
  });
  return newUser;
};

export const countUsers = async () => {
  return await User.count();
};
