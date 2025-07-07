import express from "express";
import { createUser, deleteUser, getAllUsers, modifyUser, searchUsers, updateUserRole } from "../controllers/UtilisateurController";
import { verifyToken } from "../utils/JWTUtils";
import { verifyTokenMiddleware } from "../middleware/verifyToken";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware";


const router = express.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     description: Crée un nouvel utilisateur avec les détails fournis.
 *     tags:
 *       - Utilisateurs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Le nom de l'utilisateur.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: L'email de l'utilisateur.
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur.
 *                 example: password123
 *               bio:
 *                 type: string
 *                 description: Une brève biographie de l'utilisateur.
 *                 example: Développeur web avec 5 ans d'expérience.
 *               profilePicture:
 *                 type: string
 *                 description: L'URL de l'image de profil de l'utilisateur.
 *                 example: http://example.com/profile.jpg
 *               socialLinks:
 *                 type: object
 *                 description: Liens vers les réseaux sociaux de l'utilisateur.
 *                 example: {"twitter": "http://twitter.com/johndoe"}
 *               role:
 *                 type: string
 *                 description: Le rôle de l'utilisateur (par défaut "user").
 *                 example: User
 *     responses:
 *       200:
 *         description: Utilisateur créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nom:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 role:
 *                   type: string
 *                   example: User
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erreur interne
 *                 error:
 *                   type: string
 *                   example: "Détails du message d'erreur"
 */
router.post("/", verifyTokenMiddleware,createUser);


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     description: Retourne la liste complète des utilisateurs enregistrés.
 *     tags:
 *       - Utilisateurs
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès.
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
 *                   username:
 *                     type: string
 *                     example: "Dupont"
 *                   email:
 *                     type: string
 *                     example: "dupont@example.com"
 *                   role:
 *                     type: string
 *                     example: "user"
 *                   bio:
 *                     type: string
 *                     example: "Développeur web passionné"
 *                   profilePicture:
 *                     type: string
 *                     example: "https://example.com/avatar.jpg"
 *                   socialLinks:
 *                     type: object
 *                     example: { "twitter": "https://twitter.com/dupont" }
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Détails de l'erreur"
 */

router.get("/",verifyTokenMiddleware , getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Modifier un utilisateur
 *     description: Met à jour les informations d'un utilisateur existant.
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à modifier
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "NouveauNom"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "nouveau.email@example.com"
 *               bio:
 *                 type: string
 *                 example: "Passionné de technologie"
 *               profilePicture:
 *                 type: string
 *                 example: "https://example.com/avatar.jpg"
 *               socialLinks:
 *                 type: object
 *                 example: { "twitter": "https://twitter.com/nouveau" }
 *               role:
 *                 type: string
 *                 enum: ["admin", "user"]
 *                 example: "user"
 *     responses:
 *       200:
 *         description: Utilisateur modifié avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur modifié avec succès"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: "NouveauNom"
 *                     email:
 *                       type: string
 *                       example: "nouveau.email@example.com"
 *                     bio:
 *                       type: string
 *                       example: "Passionné de technologie"
 *                     profilePicture:
 *                       type: string
 *                       example: "https://example.com/avatar.jpg"
 *                     socialLinks:
 *                       type: object
 *                       example: { "twitter": "https://twitter.com/nouveau" }
 *                     role:
 *                       type: string
 *                       example: "user"
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur non trouvé"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur"
 */

router.put("/:id",verifyTokenMiddleware, modifyUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     description: Supprime un utilisateur existant en fonction de son ID.
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur supprimé avec succès"
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur non trouvé"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur"
 */
router.delete('/:id',verifyTokenMiddleware , deleteUser);



/**
 * @swagger
 * /users/searchUsers:
 *   get:
 *     summary: Recherche avancée d'utilisateurs
 *     description: Recherche un utilisateur en fonction du nom, de l'email et de la date de création.
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: query
 *         name: nom
 *         schema:
 *           type: string
 *         description: Nom de l'utilisateur (recherche partielle insensible à la casse).
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Email de l'utilisateur (recherche partielle insensible à la casse).
 *     responses:
 *       200:
 *         description: Liste des utilisateurs correspondant aux critères
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
 *                   nom:
 *                     type: string
 *                     example: "Dupont"
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "dupont@example.com"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-02-15T10:30:00.000Z"
 *       500:
 *         description: Erreur serveur
 */
router .get('/searchUsers' , verifyTokenMiddleware , searchUsers )

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Modifier le rôle d'un utilisateur
 *     description: Permet de modifier le rôle d'un utilisateur en fournissant son ID et le nouveau rôle.
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: Rôle mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Rôle de l'utilisateur mis à jour avec succès !"
 *                 utilisateur:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     email:
 *                       type: string
 *                       example: "utilisateur@example.com"
 *                     role:
 *                       type: string
 *                       example: "admin"
 *       400:
 *         description: Requête invalide (champ rôle manquant)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Le champ rôle est obligatoire."
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur non trouvé !"
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

router.put("/:id",  verifyTokenMiddleware, isAdminMiddleware, updateUserRole);

export default router;