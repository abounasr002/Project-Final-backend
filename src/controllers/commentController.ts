
import { Request, Response } from "express";
import Comments from "../models/Comment";
import { validateSchema } from "../utils/validateSchema";
import { createCommentSchema, updateCommentSchema } from "../validators/commentValidation";
import Post from "../models/Post";
import Utilisateur from "../models/Utilisateur.model";

interface AuthRequest extends Request {
  user?: { id: number };
}

export async function createComment(req: AuthRequest, res: Response) {
    try {
        // Récupération du contenu du commentaire depuis le corps de la requête
        const { content } = req.body
        let userId = req.user?.id;
        const postId = Number(req.params.postId);

        // Vérification si l'utilisateur existe dans la base de données
        const utilisateurExistant = await Utilisateur.findByPk(userId);
        const postExistant = await Post.findByPk(postId);

        if (!utilisateurExistant) {
            // Si l'utilisateur n'existe pas, on retourne une erreur
            res.status(400).json({ message: "L'utilisateur avec cet ID n'existe pas." });
            return
        }

        // Vérifie que le contenu du commentaire n'est pas vide
        if(!content ){
            res.status(400).send('Le commentaire est incomplet.');
            return 
        }

        // Vérifie que le post existe dans la base de données
        if (!postExistant) {
            res.status(400).json({ message: "Le post avec cet ID n'existe pas." });
            return
        }

        // Vérifie que l'identifiant de l'utilisateur est bien présent
        if (!userId) {
            throw new Error("user_id est requis");
        }

        // Création du commentaire dans la base de données
        const commentUser = await Comments.create({ postId, content, userId });

        // Envoie du commentaire créé en réponse
        res.json(commentUser);
    } catch (err: any) {
        // Gestion des erreurs inattendues
        res.status(500).json({ message: 'Erreur interne', error: err.message });
    }
}


// Obtenir tous les commentaires
export async function getAllComments(req: Request, res: Response) {
  try {
    const comments = await Comments.findAll();
    res.status(200).json(comments);
  } catch (error: any) {
    res.status(500).json({
      message: "Erreur lors de la récupération des commentaires",
      error: error.message,
    });
  }
}

// Obtenir un commentaire par son ID
export async function getCommentById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const comment = await Comments.findByPk(id);

    if (!comment) {
      res.status(404).json({ message: "Commentaire non trouvé" });
      return;
    }

    res.status(200).json(comment);
  } catch (error: any) {
    res.status(500).json({
      message: "Erreur lors de la récupération du commentaire",
      error: error.message,
    });
  }
}

export async function getCommentsByPost(req: Request, res: Response) {
  const postId = Number(req.params.postId);

  try {
    const comments = await Comments.findAll({
      where: { postId },
      
      order: [['createdAt', 'DESC']]
    });

    res.json(comments);
  } catch (err: any) {
    res.status(500).json({ message: 'Erreur interne', error: err.message });
  }
}


// Mettre à jour un commentaire
export async function updateComment(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const validatedBody = validateSchema(req, updateCommentSchema); // Validation Joi

    const comment = await Comments.findByPk(id);
    if (!comment) {
      res.status(404).json({ message: "Commentaire non trouvé" });
      return;
    }

    comment.content = validatedBody.content;
    await comment.save();

    res.status(200).json({
      message: "Commentaire mis à jour avec succès",
      comment,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Erreur lors de la mise à jour du commentaire",
      error: error.details ? error.details.map((err: any) => err.message) : error.message,
    });
  }
}

// Supprimer un commentaire
export async function deleteComment(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const comment = await Comments.findByPk(id);

    if (!comment) {
      res.status(404).json({ message: "Commentaire non trouvé" });
      return;
    }

    await comment.destroy();

    res.status(200).json({
      message: "Commentaire supprimé avec succès",
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Erreur lors de la suppression du commentaire",
      error: error.message,
    });
  }
}
