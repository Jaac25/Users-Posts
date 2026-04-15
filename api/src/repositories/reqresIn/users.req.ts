import axios from "axios";
import type { IUser } from "../../core/types/user.js";
import { IUserReqRes, IUsersReqRes } from "../../core/reqres/users.js";

const headers = {
  [`${process.env.REQRES_HEADER}`]: process.env.REQRES_HEADER_VALUE,
};

export const getUsers = async ({ page = 1 }: { page?: number }) => {
  const res = await axios.get<IUsersReqRes>(
    `${process.env.REQRES_URL}/users?page=${page}`,
    {
      headers,
    },
  );

  const users = res.data;

  if (!users.data?.length) throw new Error("Users not found");

  return users.data;
};

export const getUser = async (id: string) => {
  const res = await axios.get<IUserReqRes>(
    `${process.env.REQRES_URL}/users/${id}`,
    {
      headers,
    },
  );

  const user = res.data;

  if (!user) throw new Error("User not found");

  return user?.data;
};
