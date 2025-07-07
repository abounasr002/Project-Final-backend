import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Utilisateur from "./Utilisateur.model";


// Définition des attributs d'un profil
interface ProfilAttributes {
    id?: number;
    bio: string;
    pseudo: string
    avatarUrl?: string;
    // utilisateurId: number; 
    createdAt?: Date;
    updatedAt?: Date;
}

class Profil extends Model<ProfilAttributes> implements ProfilAttributes {
    public readonly id!: number;
    public pseudo!: string
    public bio!: string;
    public avatarUrl?: string;
    // public utilisateurId!: number; 
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Profil.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatarUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        pseudo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // utilisateurId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     unique: true, 
        //     references: {
        //         model: Utilisateur,
        //         key: "id",
        //     },
        // },
    },
    {
        sequelize,
        tableName: "profils",
        timestamps: true,
    }
);


// Utilisateur.hasOne(Profil, { foreignKey: "id", onDelete: "CASCADE" });
// Profil.belongsTo(Utilisateur, { foreignKey: "id" });

export default Profil;