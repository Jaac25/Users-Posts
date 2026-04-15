import jwt from "jsonwebtoken";

export default class Token {
  static getToken = ({
    idUser,
    email,
    profiles,
    verified,
    expirationTime = "15m",
  }: {
    idUser: string;
    email: string;
    profiles: number[];
    verified: boolean;
    expirationTime?: string;
  }) =>
    jwt.sign(
      {
        user: { idUser, email, profiles, verified },
      },
      JWT_SECRET,
      { expiresIn: expirationTime },
    );

  static verifyToken = (userToken: string) => jwt.verify(userToken, JWT_SECRET);

  static getRefreshToken = ({
    idUser,
    email,
    profiles,
    verified,
    expirationTime = JWT_REFRESH_EXPIRES_IN,
  }: {
    idUser: string;
    email: string;
    profiles: number[];
    verified: boolean;
    expirationTime?: string;
  }) =>
    jwt.sign(
      {
        user: { idUser, email, profiles, verified },
      },
      JWT_REFRESH_SECRET,
      { expiresIn: expirationTime },
    );

  static verifyRefreshToken = (userToken: string) =>
    jwt.verify(userToken, JWT_REFRESH_SECRET);
}
