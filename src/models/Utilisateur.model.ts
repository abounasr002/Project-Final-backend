import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcryptjs";

// Définition des attributs d'un utilisateur
interface UtilisateurAttributes {
    id?: number;
    nom: string;
    email: string;
    password: string;
    bio?: string;
    profilePicture?: string;
    socialLinks?: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class Utilisateur extends Model<UtilisateurAttributes> implements UtilisateurAttributes {
    public id!: number;
    public nom!: string;
    public email!: string;
    public password!: string;
    public bio?: string;
    public profilePicture?: string;
    public socialLinks?: string;
    public role!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Utilisateur.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profilePicture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        socialLinks: {
            type: DataTypes.STRING,
            allowNull: true,
            get() {
                const value = this.getDataValue("socialLinks");
                return value ? JSON.parse(value) : null;
            },
            set(value: object) {
                this.setDataValue("socialLinks", JSON.stringify(value));
            },
        },
        role:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "User"
        }
    },
    {
        sequelize,
        tableName: "utilisateurs",
        timestamps: true
    }
);

export default Utilisateur;
