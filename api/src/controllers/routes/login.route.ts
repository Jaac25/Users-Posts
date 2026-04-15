import { Request, Response, Router } from "express";
import { login } from "../../services/login.service";
import { verifyTokenClient } from "../../middlewares/autentication";
import { findUser } from "../../services/users.service";
import Token from "../../helpers/token";
import { IUser } from "../../core/types/user";

const loginRoutes = Router();

const isDevelopment = process.env.DEV === "true";
const FRONT_URL = process.env.FRONT_URL ?? "";

const cookie = {
  httpOnly: true,
  secure: !isDevelopment,
  sameSite: isDevelopment ? ("lax" as "lax") : ("none" as "none"),
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
  ...(isDevelopment
    ? {}
    : FRONT_URL
      ? { domain: FRONT_URL.replace(/^(https?:\/\/)?(www\.)?/i, ".") }
      : {}),
};

loginRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const email: string = req.body?.email?.toLowerCase();
    const password: string = req.body?.password;

    if (!email || !password) throw "Missing email or password";
    const response = await login({ email, password });
    if (!response) throw "Incorrect credentials or missing permissions";
    const { token, refreshToken } = response || {};
    if (!!token) {
      return res
        .cookie("refreshToken", refreshToken, cookie)
        .status(200)
        .json({ token });
    }
    if (!token) throw "Incorrect credentials or missing permissions";
    return res
      .cookie("refreshToken", refreshToken, cookie)
      .status(200)
      .json({ token });
  } catch (error: any) {
    return res.status(400).json({ error: (error?.detail ?? error).toString() });
  }
});

loginRoutes.get(
  "/welcome",
  verifyTokenClient,
  async (req: any, res: Response) => {
    try {
      const infoUser: { idUser: number; email: string } = req?.user ?? {};
      const user = await findUser({ id: infoUser.idUser });

      return user
        ? res.status(200).json({
            ...user,
            password: undefined,
          })
        : res.status(401).json({ error: "Invalid Info" });
    } catch (error: any) {
      return res
        .status(400)
        .json({ error: (error?.detail ?? error).toString() });
    }
  },
);

loginRoutes.post("/refresh", (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: "No refresh token" });
    }

    const refreshTokenInfo = Token.verifyRefreshToken(refreshToken) as
      | {
          user: Partial<IUser>;
        }
      | undefined;

    if (!refreshTokenInfo)
      return res.status(403).json({ error: "Invalid refresh token" });

    const newAccessToken = Token.getToken({
      ...refreshTokenInfo.user,
      password: undefined,
    });

    return res.json({ token: newAccessToken });
  } catch (error: any) {
    return res.status(400).json({ error: (error?.detail ?? error).toString() });
  }
});

loginRoutes.post("/logout", (req, res) => {
  return res
    .clearCookie("refreshToken", { path: "/" })
    .status(200)
    .json({ message: "Logged out" });
});

export default loginRoutes;
