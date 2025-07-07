import { Request, Response } from "express";
import Follower from "../models/followers";

// Suivre un utilisateur
export async function followUser(req: Request, res: Response) {
    try {
        const { followerId, followingId } = req.body;

        if (!followerId || !followingId) {
            res.status(400).json({ message: "Les champs followerId et followingId sont obligatoires." });
            return;
        }

        if (followerId === followingId) {
            res.status(400).json({ message: "Un utilisateur ne peut pas se suivre lui-même." });
            return;
        }

        // Vérifier si l'utilisateur suit déjà cette personne
        const alreadyFollowing = await Follower.findOne({ where: { followerId, followingId } });
        if (alreadyFollowing) {
            res.status(400).json({ message: "Vous suivez déjà cet utilisateur." });
            return;
        }

        // Ajouter un nouveau follower
        await Follower.create({ followerId, followingId });

        res.status(201).json({ message: "Utilisateur suivi avec succès !" });
    } catch (error: any) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
}

// Ne plus suivre un utilisateur
export async function unfollowUser(req: Request, res: Response) {
    try {
        const { followerId, followingId } = req.body;

        if (!followerId || !followingId) {
            res.status(400).json({ message: "Les champs followerId et followingId sont obligatoires." });
            return;
        }

        // Supprimer l'entrée dans la base de données
        const deleted = await Follower.destroy({ where: { followerId, followingId } });
        

        if (!deleted) {
            res.status(404).json({ message: "Relation de suivi non trouvée." });
            return;
        }

        res.status(200).json({ message: "Vous ne suivez plus cet utilisateur." });
    } catch (error: any) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
}

// Obtenir la liste des abonnés d'un utilisateur
export async function getFollowers(req: Request, res: Response) {
    try {
        const { userId } = req.params;

        const followers = await Follower.findAll({ where: { followingId: userId } });

        res.status(200).json({ message: "Liste des abonnés récupérée avec succès.", followers });
    } catch (error: any) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
}

// Obtenir la liste des personnes que l'utilisateur suit
export async function getFollowing(req: Request, res: Response) {
    try {
        const { userId } = req.params;

        const following = await Follower.findAll({ where: { followerId: userId } });

        res.status(200).json({ message: "Liste des abonnements récupérée avec succès.", following });
    } catch (error: any) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
}
