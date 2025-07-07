// import { DataTypes, Model, Optional } from "sequelize";
// import sequelize from "../config/database";


// interface UserAttributes {
//   id?: number;
//   username: string;
//   email: string;
//   password: string;
//   bio?: string;
//   profilePicture?: string;
//   socialLinks?: string; 
//   createdAt?: Date;
//   updatedAt?: Date;
// }


// interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
//   public id!: number;
//   public username!: string;
//   public email!: string;
//   public password!: string;
//   public bio?: string;
//   public profilePicture?: string;
//   public socialLinks?: string;
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
// }

// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true,
//       },
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     bio: {
//       type: DataTypes.STRING,
//     },
//     profilePicture: {
//       type: DataTypes.STRING,
//     },
//     socialLinks: {
//       type: DataTypes.STRING, 
//       allowNull: true,
//       get() {
//         const value = this.getDataValue("socialLinks");
//         return value ? JSON.parse(value) : null;
//       },
//       set(value: object) {
//         this.setDataValue("socialLinks", JSON.stringify(value));
//       },
//     },
//   },
//   {
//     sequelize,
//     tableName: "users",
//     timestamps: true,
//   }
// );

// export default User;



import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

// Définition des attributs d'un utilisateur
interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  bio?: string;
  profilePicture?: string;
  socialLinks?: string;
  role: "admin" | "user"; 
  createdAt?: Date;
  updatedAt?: Date;
}

// Attributs optionnels pour la création
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// Définition du modèle User
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  static save() {
    throw new Error("Method not implemented.");
  }
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public bio?: string;
  public profilePicture?: string;
  public socialLinks?: string;
  public role!: "admin" | "user";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  static role: any;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    },
    profilePicture: {
      type: DataTypes.STRING,
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
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

export default User;
