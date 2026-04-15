import { IUser } from "../../core/types/user";
import { User } from "../../models/users.model";

export const saveUser = async (user: IUser) => {
  const newUser = await User.upsert(user);
  return newUser;
};

export const countUsersDB = async () => {
  return await User.count();
};

export const findUserDB = async (user: Partial<IUser>) => {
  const newUser = await User.findOne({
    where: {
      ...(user.email && { email: user.email }),
      ...(user.id && { id: user.id }),
    },
  });
  return newUser?.dataValues;
};
