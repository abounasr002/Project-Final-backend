import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/JWTUtils';
import jwt from 'jsonwebtoken';

dotenv.config();

interface AuthRequest extends Request {
    user?: { id: number };
}

const SECRET_KEY= process.env.JWT_KEY;

export function verifyTokenMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
    // Vérification de la clé secrète
    if (!SECRET_KEY) {
        throw new Error("SECRET_KEY non présente dans les variables d'environnement");
    }

    // Récupération du cookie contenant le token
    const cookie = req.headers.cookie;
    console.log("DEBUG - Cookies reçus :", req.headers.cookie);

    if (!cookie) {
        res.status(401).json({ message: "Access denied. Cookie missing." });
        return
    }

    const cookies = cookie.split("; ").reduce((acc, curr) => {
        const [key, value] = curr.split("=");
        acc[key] = value;
        return acc;
    }, {} as Record<string, string>);

    const token = cookies["jwt"]; // Récupération propre du token

if (!token) {
    res.status(401).json({ message: "Access denied. Token missing." });
    return;
}
    console.log(token);

    if (!token) {
        res.status(401).json({ message: "Access denied. Token missing." });
        return
    }

    try {
        // Vérification du token JWT
        const decoded = jwt.verify(token, SECRET_KEY) as { id: number };

        // Stocke l'utilisateur dans `req.user` pour l'utiliser dans les routes
        req.user = decoded;

        console.log("Utilisateur authentifié :", req.user);

        next();
    } catch (error: any) {
        res.status(403).json({ message: "Token invalide ou expiré" });
        return
    }
}