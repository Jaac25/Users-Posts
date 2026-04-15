import { DataTypes, Model } from "sequelize";
import type { IUser } from "../core/types/user.js";
import { sequelize } from "../config/database.js";
import type { IPost } from "../core/types/post.js";
import { User } from "./users.model.js";

interface PostInstance extends Model<IPost>, IUser {}

export const Post = sequelize.define<PostInstance>(
  "posts",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  },
);

User.hasMany(Post, { foreignKey: "authorId" });
Post.belongsTo(User, { foreignKey: "authorId" });
