import { IUser } from "../core/types/user";
import { User } from "../models/users.model";
import { getUser } from "../repositories/reqresIn/users.req";
import { saveUser } from "../repositories/sequelize/users.sequelize";

export const createUser = async (user: IUser) => {
  if (!user.email) throw new Error("Email missing");
  if (!user.firstName) throw new Error("First name missing");
  if (!user.lastName) throw new Error("Last name missing");
  if (!user.password) throw new Error("Password missing");

  const newUser = await saveUser(user);
  return newUser;
};

export const fillUser = async () => {
  const user = await getUser("12");
  if (!user) throw new Error("User not found");
  const [newUser, wasSaved] = await User.upsert({
    email: user?.email,
    firstName: user?.first_name,
    lastName: user?.last_name,
    avatar: user?.avatar,
    password: `${user?.first_name.toLowerCase()}123`,
  });
  return newUser;
};

export const countUsers = async () => {
  return await User.count();
};
