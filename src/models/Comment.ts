import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Utilisateur from "./Utilisateur.model";
import Post from "./Post";

interface CommentAttributes {
  id?: number;
  userId: number;
  postId: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, "id"> {}

class Comments extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  public id!: number;
  public readonly userId!: number;
  public readonly postId!: number;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comments.init(
{
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
    userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Utilisateur,
      key: "id",
      },
      onDelete: "CASCADE",
    },
    postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post,
      key: "id",
      },
      onDelete: "CASCADE",
    },
    content: {
    type: DataTypes.STRING,
    allowNull: false,
    },
},
{
    sequelize,
    tableName: "comment",
    timestamps: true,
}
);

Comments.belongsTo(Utilisateur, { foreignKey: "userId", as: "utilisateur" });
Comments.belongsTo(Post, { foreignKey: "postId", as: "post" });

Utilisateur.hasMany(Comments, { foreignKey: "userId", as: "commentaires" });
Post.hasMany(Comments, { foreignKey: "postId", as: "comments" });


export default Comments;
