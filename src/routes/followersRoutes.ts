import { Router } from "express";
import { followUser, unfollowUser, getFollowers, getFollowing } from "../controllers/followersController";

const router = Router();

/**
 * @swagger
 * /followers/follow:
 *   post:
 *     summary: Suivre un utilisateur
 *     description: Permet à un utilisateur de suivre un autre utilisateur en fournissant leurs IDs.
 *     tags:
 *       - Followers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - followerId
 *               - followingId
 *             properties:
 *               followerId:
 *                 type: integer
 *                 example: 1
 *               followingId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Utilisateur suivi avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur suivi avec succès !"
 *       400:
 *         description: Requête invalide (IDs manquants, déjà suivi ou auto-suivi)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vous suivez déjà cet utilisateur."
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur"
 *                 error:
 *                   type: string
 *                   example: "Détails de l'erreur"
 */
router.post("/follow", followUser);

/**
 * @swagger
 * /followers/unfollow:
 *   post:
 *     summary: Se désabonner d'un utilisateur
 *     description: Permet à un utilisateur d'arrêter de suivre un autre utilisateur en fournissant leurs IDs.
 *     tags:
 *       - Followers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - followerId
 *               - followingId
 *             properties:
 *               followerId:
 *                 type: integer
 *                 example: 1
 *               followingId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Désabonnement réussi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vous ne suivez plus cet utilisateur."
 *       400:
 *         description: Requête invalide (IDs manquants)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Les champs followerId et followingId sont obligatoires."
 *       404:
 *         description: Relation de suivi non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Relation de suivi non trouvée."
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur"
 *                 error:
 *                   type: string
 *                   example: "Détails de l'erreur"
 */

router.post("/unfollow", unfollowUser);

/**
 * @swagger
 * /followers/{userId}:
 *   get:
 *     summary: Récupérer la liste des abonnés d'un utilisateur
 *     description: Permet de récupérer la liste des utilisateurs qui suivent un utilisateur spécifique en utilisant son ID.
 *     tags:
 *       - Followers
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de l'utilisateur pour lequel récupérer la liste des abonnés.
 *     responses:
 *       200:
 *         description: Liste des abonnés récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Liste des abonnés récupérée avec succès."
 *                 followers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       followerId:
 *                         type: integer
 *                         example: 3
 *                       followingId:
 *                         type: integer
 *                         example: 2
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur"
 *                 error:
 *                   type: string
 *                   example: "Détails de l'erreur"
 */
router.get("/:userId", getFollowers);

/**
 * @swagger
 * /followers/toto/{userId}:
 *   get:
 *     summary: Récupérer la liste des utilisateurs suivis par un utilisateur
 *     description: Permet de récupérer la liste des utilisateurs qu'un utilisateur spécifique suit en utilisant son ID.
 *     tags:
 *       - Followers
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de l'utilisateur pour lequel récupérer la liste des utilisateurs suivis.
 *     responses:
 *       200:
 *         description: Liste des abonnements récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Liste des abonnements récupérée avec succès."
 *                 following:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       followerId:
 *                         type: integer
 *                         example: 3
 *                       followingId:
 *                         type: integer
 *                         example: 2
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur"
 *                 error:
 *                   type: string
 *                   example: "Détails de l'erreur"
 */
router.get("/toto/:userId", getFollowing);

export default router;
