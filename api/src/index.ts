import "dotenv/config";
import express, { type Request, type Response } from "express";
import Server from "./server";
import cors from "cors";
import userRouter from "./controllers/routes/users.route";
import postsRouter from "./controllers/routes/posts.route";
import { seedUser } from "./seeders/users.seed";
import loginRoutes from "./controllers/routes/login.route";
import { sequelize } from "./config/database";

const server = new Server();

server.app.use(express.json());
server.app.use(express.urlencoded({ extended: false }));
// server.app.use(cookieParser());

//Cors
server.app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || process.env.ALLOWED_ORIGINS?.includes(origin)) {
        callback(null, true);
      } else {
        const msg = `❌ Origen no permitido: ${origin}`;
        console.warn(msg);
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);

//Rutas
server.app.get("/", (req: Request, res: Response) => {
  res.send("Api para que nos contraten!");
});
server.app.use("/auth", loginRoutes);
server.app.use("/users", userRouter);
server.app.use("/posts", postsRouter);

//Levantar servidor
server.start(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    await sequelize.sync({ alter: true });
    await seedUser();
    console.info(`Server running in port: ${server.port}`);
  } catch (error) {
    console.error(error);
  }
});
