// import { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import Utilisateur from "../models/Utilisateur.model";

// dotenv.config();

// const JWT_KEY = process.env.JWT_KEY || "secretkey";

// //  Inscription d'un utilisateur
// export async function register(req: Request, res: Response) {
//     try {
//         const { nom, email, password } = req.body;

//         // Vérifier si l'utilisateur existe déjà
//         const existingUser = await Utilisateur.findOne({ where: { email } });
//         if (existingUser) {
//         res.status(400).json({ message: "Cet email est déjà utilisé." });
//         return 
//         }

//         // Création de l'utilisateur
//         const newUser = await Utilisateur.create({ nom, email, password });

//         res.status(201).json({ message: "Utilisateur créé avec succès", utilisateur: newUser });
//     } catch (error: any) {
//         res.status(500).json({ message: "Erreur serveur", error: error.message });
//     }
// }

// // Connexion d'un utilisateur avec stockage du token dans un cookie sécurisé
// export async function login(req: Request, res: Response) {
//     try {
//         const { email, password } = req.body;

//         // Vérifier si l'utilisateur existe
//         const utilisateur = await Utilisateur.findOne({ where: { email } });
//         if (!utilisateur) {
//         res.status(400).json({ message: "Identifiants incorrects" });
//         return;
//         }

//         // Vérifier le mot de passe
//         const isMatch = await bcrypt.compare(password, utilisateur.password);
//         if (!isMatch) {
//         res.status(400).json({ message: "Identifiants incorrects" });
//         return;
//         }

//         // Génération du token JWT
//         const token = jwt.sign({ id: utilisateur.id }, JWT_KEY, { expiresIn: "7d" });

//         // Stocker le token
//         res.cookie("jwt", token, {
//             httpOnly: true, 
//             sameSite: "lax",
//             secure: process.env.NODE_ENV === "production",
//         });

//         res.json({ message: "Connexion réussie" });
//     } catch (error: any) {
//         res.status(500).json({ message: "Erreur serveur", error: error.message });
//     }
// }
























// import { Request, Response } from "express";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import Utilisateur from "../models/Utilisateur.model";
// import { loginSchema, registerSchema } from "../validators/auth.validation"; 

// dotenv.config();

// const JWT_KEY = process.env.JWT_KEY || "secretkey";

// //  Inscription d'un utilisateur
// export async function register(req: Request, res: Response) {
//     try {
//         const { nom, email, password, role } = req.body;

//         // Validation des données avec Joi
//         const { error } = registerSchema.validate({ nom, email, password, });
//         if (error) {
//         res.status(400).json({ message: error.details[0].message });
//         return ;
//         }

//         // Vérifier si l'utilisateur existe déjà
//         const existingUser = await Utilisateur.findOne({ where: { email } });
//         if (existingUser) {
//         res.status(400).json({ message: "Cet email est déjà utilisé." });
//         return ;
//         }

//         console.log(password);
//         // Hacher le mot de passe avant de l'enregistrer
//         const hashedPassword = await bcryptjs.hash(password, 10);

//         // Création de l'utilisateur
//         const newUser = await Utilisateur.create({ nom, email, password: hashedPassword, role });

//         res.status(201).json({ message: "Utilisateur créé avec succès", utilisateur: newUser });
//     } catch (error: any) {
//         res.status(500).json({ message: "Erreur serveur", error: error.message });
//     }
// }

// // Connexion d'un utilisateur avec stockage du token dans un cookie sécurisé
// export async function login(req: Request, res: Response) {
//     try {
//         const { email, password } = req.body;

//         // Validation des données avec Joi
//         const { error } = loginSchema.validate({ email, password });
//         if (error) {
//         res.status(400).json({ message: error.details[0].message });
//         return ;
//         }

//         // Vérifier si l'utilisateur existe
//         const utilisateur = await Utilisateur.findOne({ where: { email } });
//         if (!utilisateur) {
//         res.status(400).json({ message: "Identifiants incorrects email" });
//         return ;
//         }

//         // Vérifier le mot de passe
//         console.log(password, utilisateur.password);
//         const isMatch = await bcryptjs.compare(password, utilisateur.password);
//         console.log(isMatch);
//         if (!isMatch) {
//         res.status(400).json({ message: "Identifiants incorrects password" });
//         return ;
//         }

//         // Génération du token JWT
//         const token = jwt.sign({ id: utilisateur.id }, JWT_KEY, { expiresIn: "888d" });

//         // Stocker le token dans un cookie
//         res.cookie("jwt", token, {
//             httpOnly: true,
//             sameSite: "lax",
//             secure: process.env.NODE_ENV === "production",
//         });

//         res.json({ message: "Connexion réussie" });
//     } catch (error: any) {
//         res.status(500).json({ message: "Erreur serveur", error: error.message });
//     }
// }







// // Modification du rôle d'un utilisateur
// export async function updateUserRole(req: Request, res: Response) {
//     try {
//         const { id } = req.params;
//         const { role } = req.body;

//         if (!role) {
//         res.status(400).json({ message: "Le champ rôle est obligatoire." });
//         return; 
//         }

//         // Recherche de l'utilisateur
//         const utilisateur = await Utilisateur.findOne({ where: { id } });
//         if (!utilisateur) {
//         res.status(404).json({ message: "Utilisateur non trouvé !" });
//         return ;
//         } 

//         // Mise à jour du rôle
//         utilisateur.role = role;
//         await utilisateur.save();

//         res.status(200).json({
//             message: "Rôle de l'utilisateur mis à jour avec succès !",
//             utilisateur,
//         });
//     } catch (error: any) {
//         res.status(500).json({ message: "Erreur serveur", error: error.message });
//     }
// }













































// import { Request, Response } from "express";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import User from "../models/user";
// import { loginSchema, registerSchema } from "../validators/auth.validation"; 

// dotenv.config();

// const JWT_KEY = process.env.JWT_KEY || "secretkey";

// // Inscription d'un utilisateur
// export async function register(req: Request, res: Response) {
//     try {
//         const { nom, email, password, role } = req.body;

//         // Validation des données avec Joi
//         const { error } = registerSchema.validate({ nom, email, password });
//         if (error) {
//             res.status(400).json({ message: error.details[0].message });
//             return;
//         }

//         // Vérifier si l'utilisateur existe déjà
//         const existingUser = await User.findOne({ where: { email } });
//         if (existingUser) {
//             res.status(400).json({ message: "Cet email est déjà utilisé." });
//             return;
//         }

//         console.log(password);
//         // Hacher le mot de passe avant de l'enregistrer
//         const hashedPassword = await bcryptjs.hash(password, 10);

//         // Création de l'utilisateur
//         const newUser = await User.create({  username: nom, email, password: hashedPassword, role });

//         res.status(201).json({ message: "Utilisateur créé avec succès", user: newUser });
//     } catch (error: any) {
//         res.status(500).json({ message: "Erreur serveur", error: error.message });
//     }
// }

// // Connexion d'un utilisateur avec stockage du token dans un cookie sécurisé
// export async function login(req: Request, res: Response) {
//     try {
//         const { email, password } = req.body;

//         // Validation des données avec Joi
//         const { error } = loginSchema.validate({ email, password });
//         if (error) {
//             res.status(400).json({ message: error.details[0].message });
//             return;
//         }

//         // Vérifier si l'utilisateur existe
//         const user = await User.findOne({ where: { email } });
//         if (!user) {
//             res.status(400).json({ message: "Identifiants incorrects email" });
//             return;
//         }

//         // Vérifier le mot de passe
//         console.log(password, user.password);
//         const isMatch = await bcryptjs.compare(password, user.password);
//         console.log(isMatch);
//         if (!isMatch) {
//             res.status(400).json({ message: "Identifiants incorrects password" });
//             return;
//         }

//         // Génération du token JWT
//         const token = jwt.sign({ id: user.id }, JWT_KEY, { expiresIn: "888d" });

//         // Stocker le token dans un cookie
//         res.cookie("jwt", token, {
//             httpOnly: true,
//             sameSite: "lax",
//             secure: process.env.NODE_ENV === "production",
//         });

//         res.json({ message: "Connexion réussie" });
//     } catch (error: any) {
//         res.status(500).json({ message: "Erreur serveur", error: error.message });
//     }
// }



























import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Utilisateur from "../models/Utilisateur.model";
import { loginSchema, registerSchema } from "../validators/auth.validation"; 
import { generateToken } from "../utils/JWTUtils";

dotenv.config();

const JWT_KEY = process.env.JWT_KEY || "secretkey";

// Inscription d'un utilisateur
export async function register(req: Request, res: Response) {
    try {
        const { nom, email, password, role, bio, profilePicture, socialLinks } = req.body;

        // Validation des données avec Joi
        const { error } = registerSchema.validate({ nom, email, password });
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await Utilisateur.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: "Cet email est déjà utilisé." });
            return;
        }

        // Hacher le mot de passe avant de l'enregistrer
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Création de l'utilisateur
        const newUtilisateur = await Utilisateur.create({  
            nom, 
            email, 
            password: hashedPassword, 
            role, 
            bio, 
            profilePicture, 
            socialLinks
        });

        res.status(201).json({ message: "Utilisateur créé avec succès", utilisateur: newUtilisateur });
    } catch (error: any) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
}

// Connexion d'un utilisateur avec stockage du token dans un cookie sécurisé
export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        // Validation des données avec Joi
        const { error } = loginSchema.validate({ email, password });
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        // Vérifier si l'utilisateur existe
        const utilisateur = await Utilisateur.findOne({ where: { email } });
        if (!utilisateur) {
            res.status(400).json({ message: "Identifiants incorrects email" });
            return;
        }

        // Vérifier le mot de passe
        const isMatch = await bcryptjs.compare(password, utilisateur.password);
        if (!isMatch) {
            res.status(400).json({ message: "Identifiants incorrects password" });
            return;
        }

        // Génération du token JWT
        const token = generateToken({id:utilisateur.id, role: utilisateur.role});
        console.log("DEBUG - Token généré :", token);

        // Stocker le token dans un cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        res.json({ message: "Connexion réussie", token, utilisateur: utilisateur.id });
    } catch (error: any) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
    
}

// auth.controller.ts
export async function getCurrentUser(req: Request, res: Response) {
    try {
        const token = req.cookies.jwt;
        if (!token) return res.status(401).json({ message: "Non authentifié" });

        const decoded = jwt.verify(token, JWT_KEY) as { id: number };
        const utilisateur = await Utilisateur.findByPk(decoded.id);
        if (!utilisateur) return res.status(404).json({ message: "Utilisateur non trouvé" });

        res.json(utilisateur);
    } catch (error: any) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
}

