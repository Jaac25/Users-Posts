import { IPost } from "../core/types/post";
import {
  createPostRepo,
  deletePostRepo,
  getPostByIdRepo,
  getPostsRepo,
  updatePostRepo,
} from "../repositories/sequelize/posts.sequelize";

export const createPostService = async (data: IPost) => {
  if (!data.authorId) throw new Error("Author Id missing");
  if (!data.title) throw new Error("Title missing");
  if (!data.content) throw new Error("Content missing");

  return await createPostRepo(data);
};

export const getPostsService = async () => {
  return await getPostsRepo();
};

export const getPostService = async (id: string) => {
  const post = await getPostByIdRepo(id);

  if (!post) throw new Error("NOT_FOUND");

  return post;
};

export const updatePostService = async (id: number, data: any) => {
  const post = await updatePostRepo(id, data);

  if (!post) throw new Error("NOT_FOUND");

  return post;
};

export const deletePostService = async (id: number) => {
  const deleted = await deletePostRepo(id);

  if (!deleted) throw new Error("NOT_FOUND");
};
