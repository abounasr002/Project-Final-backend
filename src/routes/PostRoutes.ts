import express from "express";
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from "../controllers/Post.Controllers";

const router = express.Router();

// Route pour créer un post


/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Créer un nouveau post
 *     description: Crée un post en fournissant un `userId`, `content`, et des informations optionnelles comme `media` et `link`.
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - content
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: L'ID de l'utilisateur qui crée le post.
 *                 example: 1
 *               content:
 *                 type: string
 *                 description: Le contenu du post.
 *                 example: "Voici un exemple de post."
 *               media:
 *                 type: string
 *                 description: Un lien vers un média associé au post (facultatif).
 *                 example: "https://exemple.com/image.png"
 *               link:
 *                 type: string
 *                 description: Un lien associé au post (facultatif).
 *                 example: "https://exemple.com"
 *     responses:
 *       201:
 *         description: Post créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post créé avec succès"
 *                 post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     userId:
 *                       type: integer
 *                       example: 1
 *                     content:
 *                       type: string
 *                       example: "Voici un exemple de post."
 *                     media:
 *                       type: string
 *                       example: "https://exemple.com/image.png"
 *                     link:
 *                       type: string
 *                       example: "https://exemple.com"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la création du post"
 *                 error:
 *                   type: string
 *                   example: "Erreur interne du serveur"
 */
router.post("/", createPost);


// Route pour obtenir tous les posts

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Récupérer tous les posts
 *     description: Récupère tous les posts de la base de données.
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: Liste des posts récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   userId:
 *                     type: integer
 *                     example: 1
 *                   content:
 *                     type: string
 *                     example: "Voici un exemple de post."
 *                   media:
 *                     type: string
 *                     example: "https://exemple.com/image.png"
 *                   link:
 *                     type: string
 *                     example: "https://exemple.com"
 *       500:
 *         description: Erreur serveur lors de la récupération des posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la récupération des posts"
 *                 error:
 *                   type: string
 *                   example: "Erreur interne du serveur"
 */
router.get("/", getAllPosts);

// Route pour obtenir un post par ID

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Récupérer un post par son ID
 *     description: Récupère un post spécifique en fonction de son ID.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID du post à récupérer
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Post récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 content:
 *                   type: string
 *                   example: "Voici un exemple de post."
 *                 media:
 *                   type: string
 *                   example: "https://exemple.com/image.png"
 *                 link:
 *                   type: string
 *                   example: "https://exemple.com"
 *       404:
 *         description: Post non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post non trouvé"
 *       500:
 *         description: Erreur serveur lors de la récupération du post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la récupération du post"
 *                 error:
 *                   type: string
 *                   example: "Erreur interne du serveur"
 */
router.get("/:id", getPostById);

// Route pour mettre à jour un post


// import { Request, Response } from "express";
// import Post from "../models/Post"; // Assurez-vous que le chemin vers le modèle est correct

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Mettre à jour un post par son ID
 *     description: Met à jour un post spécifique en fonction de son ID. Vous pouvez mettre à jour le contenu, les médias et le lien du post.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID du post à mettre à jour
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - content
 *               - media
 *               - link
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               content:
 *                 type: string
 *                 example: "Nouveau contenu du post."
 *               media:
 *                 type: string
 *                 example: "https://exemple.com/nouvelle-image.png"
 *               link:
 *                 type: string
 *                 example: "https://nouveau-lien.com"
 *     responses:
 *       200:
 *         description: Post mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post mis à jour avec succès"
 *                 post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     userId:
 *                       type: integer
 *                       example: 1
 *                     content:
 *                       type: string
 *                       example: "Nouveau contenu du post."
 *                     media:
 *                       type: string
 *                       example: "https://exemple.com/nouvelle-image.png"
 *                     link:
 *                       type: string
 *                       example: "https://nouveau-lien.com"
 *       400:
 *         description: Mauvais format ou données manquantes dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Les données envoyées sont invalides."
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: [
 *                     "L'ID de l'utilisateur est requis.",
 *                     "\"id\" is not allowed"
 *                   ]
 *       404:
 *         description: Post non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post non trouvé"
 *       500:
 *         description: Erreur serveur lors de la mise à jour du post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la mise à jour du post"
 *                 error:
 *                   type: string
 *                   example: "Erreur interne du serveur"
 */
router.put("/:id", updatePost);

// Route pour supprimer un post



/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Supprimer un post par son ID
 *     description: Supprime un post spécifique en fonction de son ID.
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID du post à supprimer
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Post supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post supprimé avec succès"
 *       404:
 *         description: Post non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Post non trouvé"
 *       500:
 *         description: Erreur serveur lors de la suppression du post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la suppression du post"
 *                 error:
 *                   type: string
 *                   example: "Erreur interne du serveur"
 */
router.delete("/:id", deletePost);

export default router;
