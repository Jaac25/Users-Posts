import bcrypt from "bcryptjs";
import { findUser } from "./users.service";
import Token from "../helpers/token";
import { IUser } from "../core/types/user";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await findUser({ email });
  if (!user) throw new Error("Wrong email or password");
  const isValid = bcrypt.compareSync(password, user.password);
  const infoForToken: Partial<IUser> = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
  };
  if (!isValid) return;
  return {
    token: Token.getToken(infoForToken),
    refreshToken: Token.getRefreshToken(infoForToken),
  };
};
