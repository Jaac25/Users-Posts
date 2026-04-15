export interface IToken {
  idUser: number;
  email: string;
  profiles: number[];
  verified: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user: IToken;
    }
  }
}
