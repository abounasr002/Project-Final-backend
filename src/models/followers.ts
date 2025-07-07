import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Follower extends Model {
    public id!: number;
    public followerId!: number; 
    public followingId!: number; 
}

Follower.init(
    {
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
    followerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    followingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    },
    {
    sequelize,
    tableName: "followers",
    timestamps: true, 
    }
);

export default Follower;
