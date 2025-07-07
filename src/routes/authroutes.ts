import express from "express";
import { register, login, getCurrentUser  } from "../controllers/authcontroller";
import { verifyTokenMiddleware } from "../middleware/verifyToken";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware";


const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscription d'un utilisateur
 *     description: Ajoute un nouvel utilisateur en fournissant un nom, un email, un mot de passe et un rôle (admin ou user).
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - email
 *               - password
 *               - role
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Jean Dupont"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jean.dupont@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "MotDePasse123!"
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 example: "user"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur créé avec succès"
 *                 utilisateur:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nom: 
 *                       type: string
 *                       example: "Jean Dupont"
 *                     email:
 *                       type: string
 *                       example: "jean.dupont@example.com"
 *                     role:
 *                       type: string
 *                       example: "user"
 *       400:
 *         description: L'email est déjà utilisé ou le rôle est invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cet email est déjà utilisé ou le rôle est invalide."
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
 *                 error:
 *                   type: string
 *                   example: "Détails de l'erreur"
 */


router.post("/register", register);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     description: Permet à un utilisateur de se connecter en fournissant son email et son mot de passe.
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jean.momo@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "MotDePasse123!"
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Connexion réussie"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI..."
 *       400:
 *         description: Identifiants incorrects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Identifiants incorrects"
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
 *                 error:
 *                   type: string
 *                   example: "Détails de l'erreur"
 */

router.post("/login", login);











// router.get("/me", getCurrentUser);















// /**
//  * @swagger
//  * /auth/update/{id}:
//  *   put:
//  *     summary: Modifier le rôle d'un utilisateur
//  *     description: Permet de modifier le rôle d'un utilisateur en fournissant son ID et le nouveau rôle.
//  *     tags:
//  *       - Utilisateurs
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID de l'utilisateur à mettre à jour
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - role
//  *             properties:
//  *               role:
//  *                 type: string
//  *                 example: "admin"
//  *     responses:
//  *       200:
//  *         description: Rôle mis à jour avec succès
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Rôle de l'utilisateur mis à jour avec succès !"
//  *                 utilisateur:
//  *                   type: object
//  *                   properties:
//  *                     id:
//  *                       type: string
//  *                       example: "123e4567-e89b-12d3-a456-426614174000"
//  *                     email:
//  *                       type: string
//  *                       example: "utilisateur@example.com"
//  *                     role:
//  *                       type: string
//  *                       example: "admin"
//  *       400:
//  *         description: Requête invalide (champ rôle manquant)
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Le champ rôle est obligatoire."
//  *       404:
//  *         description: Utilisateur non trouvé
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Utilisateur non trouvé !"
//  *       500:
//  *         description: Erreur interne du serveur
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Erreur serveur"
//  *                 error:
//  *                   type: string
//  *                   example: "Détails de l'erreur"
//  */

// router.put("",  verifyTokenMiddleware, isAdminMiddleware, updateUserRole);

export default router;
