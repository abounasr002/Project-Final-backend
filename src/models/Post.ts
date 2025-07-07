import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface PostAttributes {
  id?: number;
  userId: number;
  content: string;
  media?: string;
  link?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PostCreationAttributes extends Optional<PostAttributes, "id"> {}

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
public id!: number;
public userId!: number;
public content!: string;
public media?: string;
public link?: string;
public readonly createdAt!: Date;
public readonly updatedAt!: Date;
}

Post.init(
{
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
    userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    content: {
    type: DataTypes.TEXT,
    allowNull: false,
    },
    media: {
    type: DataTypes.STRING,
    },
    link: {
    type: DataTypes.STRING,
    },
},
{
    sequelize,
    tableName: "posts",
    timestamps: true,
}
);

export default Post;