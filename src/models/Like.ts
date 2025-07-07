import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Like extends Model {
  public id!: number;
  public userId!: number;
  public postId!: number;
}

Like.init(
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
    postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
},
{
    sequelize,
    tableName: "likes",
    timestamps: false,
}
);

export default Like;
