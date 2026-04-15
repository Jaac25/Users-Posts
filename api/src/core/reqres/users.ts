import { ICommon } from "./common";

interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

/**
 * @url /users/
 * @method GET
 * @type Req
 */
export type IUsersReqRes = ICommon<IUser[]>;

/**
 * @url /users/:id
 * @method GET
 * @type Req
 */
export type IUserReqRes = ICommon<IUser>;
