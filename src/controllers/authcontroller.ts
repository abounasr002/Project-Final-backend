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
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production"
        });

        // res.cookie("jwt", token, {
        //     httpOnly: true,
        //     sameSite: "lax",
        //     secure: 
        //     process.env.NODE_ENV === "production",
        // });

        res.json({ message: "Connexion réussie", token, utilisateur: utilisateur.id });
    } catch (error: any) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
    
}




export async function getCurrentUser(req: Request, res: Response) {
    try {
        const token = req.cookies.jwt;
        if (!token)res.status(401).json({ message: "Non authentifié" })
            ;

        const decoded = jwt.verify(token, JWT_KEY) as { id: number };
        const utilisateur = await Utilisateur.findByPk(decoded.id);
        if (!utilisateur) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
            return;
        }

        res.json(utilisateur);
    } catch (error: any) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
}
















// auth.controller.ts
// export async function getCurrentUser(req: Request, res: Response) {
//     try {
//         const token = req.cookies.jwt;
//         if (!token) return res.status(401).json({ message: "Non authentifié" });

//         const decoded = jwt.verify(token, JWT_KEY) as { id: number };
//         const utilisateur = await Utilisateur.findByPk(decoded.id);
//         if (!utilisateur) return res.status(404).json({ message: "Utilisateur non trouvé" });

//         res.json(utilisateur);
//     } catch (error: any) {
//         res.status(500).json({ message: "Erreur serveur", error: error.message });
//     }
// }
