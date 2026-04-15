import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Token from "../helpers/token";

export const verifyTokenClient = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const usuarioToken =
    req?.headers?.authorization?.replace("Bearer ", "") ??
    req.get("token") ??
    "";
  try {
    const userInfo = Token.verifyToken(usuarioToken) as JwtPayload;
    req.user = userInfo.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }
};

export const verifyLoginOwner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const usuarioToken =
    req?.headers?.authorization?.replace("Bearer ", "") ??
    req.get("token") ??
    "";
  try {
    const userInfo = Token.verifyToken(usuarioToken) as JwtPayload;
    req.user = userInfo.user;
    if (!req.user.verified)
      return res
        .status(400)
        .json({ error: "Not verified Email", email: userInfo.user.email });
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }
};

export const verifyToken =
  () => (req: Request, res: Response, next: NextFunction) => {
    const usuarioToken =
      req?.headers?.authorization?.replace("Bearer ", "") ??
      req.get("token") ??
      "";
    try {
      const userInfo = Token.verifyToken(usuarioToken) as JwtPayload;
      req.user = userInfo.user;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid Token" });
    }
  };
