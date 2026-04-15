import { IUser } from "../../core/types/user";
import { User } from "../../models/users.model";

export const saveUser = async (user: IUser) => {
  const newUser = await User.create(user);
  return newUser;
};
