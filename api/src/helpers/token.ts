import jwt from "jsonwebtoken";
import { IUser } from "../core/types/user";

const JWT_SECRET = process.env.JWT_SECRET ?? "";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? "";
export default class Token {
  static getToken = (user: Partial<IUser>) =>
    jwt.sign(
      {
        user,
      },
      JWT_SECRET,
      { expiresIn: "15m" },
    );

  static verifyToken = (userToken: string) => jwt.verify(userToken, JWT_SECRET);

  static getRefreshToken = (user: Partial<IUser>) =>
    jwt.sign(
      {
        user,
      },
      JWT_REFRESH_SECRET,
      { expiresIn: "1d" },
    );

  static verifyRefreshToken = (userToken: string) =>
    jwt.verify(userToken, JWT_REFRESH_SECRET);
}
