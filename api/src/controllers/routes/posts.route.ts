import { Request, Response, Router } from "express";
import { verifyTokenClient } from "../../middlewares/autentication";
import {
  createPostService,
  getPostService,
  getPostsService,
} from "../../services/posts.service";

const postsRoustes = Router();

postsRoustes.use(verifyTokenClient);

postsRoustes.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await getPostsService();
    return res.status(200).json(posts);
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    return res.status(400).json({
      error: error?.message || "An error occurred while fetching posts",
    });
  }
});

postsRoustes.get("/:id", async (req: Request, res: Response) => {
  try {
    const post = await getPostService(`${req.params.id}`);
    return res.status(200).json(post);
  } catch (error: any) {
    console.error("Error fetching post:", error);
    return res.status(400).json({
      error: error?.message || "An error occurred while fetching post",
    });
  }
});

postsRoustes.post("/", async (req: Request, res: Response) => {
  const post = await createPostService(req.body);
  return res.status(201).json({ post });
});

export default postsRoustes;
