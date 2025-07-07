import { Router } from "express";
import { addLike, removeLike, getLikesByPost } from "../controllers/likeController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Gestion des likes sur les posts
 */

/**
 * @swagger
 * /likes:
 *   post:
 *     summary: Ajouter un like
 *     description: Permet à un utilisateur d'ajouter un like sur un post.
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - postId
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               postId:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Like ajouté avec succès
 *       400:
 *         description: L'utilisateur a déjà liké ce post
 *       500:
 *         description: Erreur serveur
 */
router.post("/", addLike);

/**
 * @swagger
 * /likes:
 *   delete:
 *     summary: Supprimer un like
 *     description: Permet à un utilisateur de supprimer son like sur un post.
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - postId
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               postId:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Like supprimé avec succès
 *       404:
 *         description: Like non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/", removeLike);

/**
 * @swagger
 * /likes/{postId}:
 *   get:
 *     summary: Obtenir les likes d'un post
 *     description: Retourne tous les likes d'un post donné.
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du post
 *     responses:
 *       200:
 *         description: Liste des likes récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/:postId", getLikesByPost);

export default router;
