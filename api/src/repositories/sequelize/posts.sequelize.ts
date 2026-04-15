import { IPost } from "../../core/types/post";
import { Post } from "../../models/posts.model";

export const createPostRepo = async (data: IPost) => {
  return await Post.create(data);
};

export const getPostsRepo = async () => {
  return await Post.findAll();
};

export const getPostByIdRepo = async (id: string) => {
  return await Post.findByPk(id);
};

export const updatePostRepo = async (id: number, data: any) => {
  const post = await Post.findByPk(id);
  if (!post) return null;

  return post.update(data);
};

export const deletePostRepo = async (id: number) => {
  const post = await Post.findByPk(id);
  if (!post) return null;

  await post.destroy();
  return true;
};
