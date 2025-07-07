import { Router } from "express";
import {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
} from "../controllers/commentController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Commentaires
 *   description: Gestion des commentaires
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Créer un commentaire
 *     description: Ajoute un nouveau commentaire à un post existant.
 *     tags: [Commentaires]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - postId
 *               - content
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               postId:
 *                 type: integer
 *                 example: 5
 *               content:
 *                 type: string
 *                 example: "Ceci est un commentaire."
 *     responses:
 *       201:
 *         description: Commentaire créé avec succès
 *       500:
 *         description: Erreur serveur
 */
router.post("/:postId", createComment);

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Récupérer tous les commentaires
 *     description: Retourne la liste de tous les commentaires.
 *     tags: [Commentaires]
 *     responses:
 *       200:
 *         description: Liste des commentaires récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/", getAllComments);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Récupérer un commentaire par ID
 *     description: Retourne un commentaire spécifique grâce à son ID.
 *     tags: [Commentaires]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du commentaire
 *     responses:
 *       200:
 *         description: Commentaire récupéré avec succès
 *       404:
 *         description: Commentaire non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", getCommentById);

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Mettre à jour un commentaire
 *     description: Modifie le contenu d'un commentaire existant.
 *     tags: [Commentaires]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du commentaire
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Ceci est un commentaire mis à jour."
 *     responses:
 *       200:
 *         description: Commentaire mis à jour avec succès
 *       404:
 *         description: Commentaire non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put("/:id", updateComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Supprimer un commentaire
 *     description: Supprime un commentaire existant.
 *     tags: [Commentaires]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du commentaire
 *     responses:
 *       200:
 *         description: Commentaire supprimé avec succès
 *       404:
 *         description: Commentaire non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", deleteComment);

export default router;
