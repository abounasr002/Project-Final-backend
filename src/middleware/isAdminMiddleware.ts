import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import utilisateur from '../models/Utilisateur.model'; 
import Utilisateur from '../models/Utilisateur.model';

export async function isAdminMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
    const cookie = req.headers.cookie;
    
    if (!cookie) {
    res.status(401).json({ message: "Accès refusé. Token manquant." });
    return;
    }

    // Extraction du token depuis le cookie (format: "jwt=token")
    const token = cookie.split('=')[1];
    
    const decoded: any = jwt.verify(token, process.env.JWT_KEY!);

    // Utiliser Sequelize pour rechercher l'utilisateur par son ID
    const utilisateur = await Utilisateur.findByPk(decoded.id);

    if (!utilisateur || utilisateur.role !== 'admin') {
    res.status(403).json({ message: "Accès refusé. Vous devez être Admin !" });
    return;
    }
    
    next();
    } catch (error: any) {
    res.status(500).json({ message: "Erreur d'authentification", error: error.message });
    }
}
