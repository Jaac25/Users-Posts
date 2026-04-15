import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import type { IPost } from "../core/types/post";
import { User } from "./users.model";

interface PostInstance extends Model<IPost>, IPost {}

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
    idUser: {
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
