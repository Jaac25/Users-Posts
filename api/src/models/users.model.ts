import { DataTypes, Model } from "sequelize";
import type { IUser } from "../core/types/user";
import { sequelize } from "../config/database";

interface UserInstance extends Model<IUser>, IUser {}

export const User = sequelize.define<UserInstance>(
  "users",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },

    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    avatar: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    timestamps: true,
    freezeTableName: true,
  },
);
