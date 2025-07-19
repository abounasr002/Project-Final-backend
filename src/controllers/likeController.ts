

import { Request, Response } from "express";
import Like from "../models/Like";
import { validateSchema } from "../utils/validateSchema";
import { likeSchema } from "../validators/likeValidation";

// Ajouter un like à un post
export async function addLike(req: Request, res: Response) {
    try {
    const validatedBody = validateSchema(req, likeSchema); // Validation Joi

    // Vérifier si l'utilisateur a déjà liké le post
    const existingLike = await Like.findOne({ where: { userId: validatedBody.userId, postId: validatedBody.postId } });

    if (existingLike) {
    res.status(400).json({ message: "L'utilisateur a déjà liké ce post." });
    return;
    }

    const newLike = await Like.create(validatedBody);

    res.status(201).json({
    message: "Like ajouté avec succès",
    like: newLike,
    });
    } catch (error: any) {
    res.status(400).json({
    message: "Erreur lors de l'ajout du like",
    error: error.details ? error.details.map((err: any) => err.message) : error.message,
    });
    } 
}

// Supprimer un like
export async function removeLike(req: Request, res: Response) {
    try {
    const validatedBody = validateSchema(req, likeSchema); // Validation Joi

    const like = await Like.findOne({ where: { userId: validatedBody.userId, postId: validatedBody.postId } });

    if (!like) {
    res.status(404).json({ message: "Like non trouvé" });
    return;
    }

    await like.destroy();

    res.status(200).json({
    message: "Like supprimé avec succès",
    });
    } catch (error: any) {
    res.status(400).json({
    message: "Erreur lors de la suppression du like",
    error: error.details ? error.details.map((err: any) => err.message) : error.message,
    });
    }
}

// Obtenir tous les likes d'un post
export async function getLikesByPost(req: Request, res: Response) {
    try {
    const { postId } = req.params;
    const likes = await Like.findAll({ where: { postId } });

    res.status(200).json(likes);
    } catch (error: any) {
    res.status(500).json({
    message: "Erreur lors de la récupération des likes",
    error: error.message,
    });
  }
}
