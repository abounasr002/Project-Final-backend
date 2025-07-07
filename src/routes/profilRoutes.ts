import express from "express";
import { createProfil, getProfilByUserId, updateProfil, deleteProfil } from "../controllers/profilController";

const router = express.Router();


/**
 * @swagger
 * /profils:
 *   post:
 *     summary: Créer un profil pour un utilisateur
 *     description: Valide les données fournies et crée un profil si l'utilisateur existe et ne possède pas déjà un profil.
 *     tags:
 *       - Profils
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: L'identifiant de l'utilisateur.
 *                 example: 1
 *               bio:
 *                 type: string
 *                 description: La biographie de l'utilisateur.
 *                 example: "Développeur passionné avec 10 ans d'expérience."
 *               avatarUrl:
 *                 type: string
 *                 description: L'URL de l'avatar de l'utilisateur.
 *                 example: "http://example.com/avatar.jpg"
 *               pseudo:
 *                 type: string
 *                 description: Le pseudo de l'utilisateur.
 *                 example: "JohnDoe"
 *     responses:
 *       201:
 *         description: Profil créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profil créé avec succès"
 *                 profil:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     bio:
 *                       type: string
 *                       example: "Développeur passionné avec 10 ans d'expérience."
 *                     avatarUrl:
 *                       type: string
 *                       example: "http://example.com/avatar.jpg"
 *                     pseudo:
 *                       type: string
 *                       example: "JohnDoe"
 *       400:
 *         description: L'utilisateur a déjà un profil.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'utilisateur a déjà un profil"
 *       404:
 *         description: Utilisateur non trouvé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur non trouvé"
 *       500:
 *         description: Erreur serveur.
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


router.post("/", createProfil);

/**
 * @swagger
 * /profils/{utilisateurId}:
 *   get:
 *     summary: Récupérer un profil par l'identifiant de l'utilisateur
 *     description: Retourne le profil associé à l'utilisateur spécifié par son identifiant.
 *     tags:
 *       - Profils
 *     parameters:
 *       - in: path
 *         name: utilisateurId
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant de l'utilisateur dont le profil doit être récupéré.
 *     responses:
 *       200:
 *         description: Profil récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 bio:
 *                   type: string
 *                   example: "Passionné de technologie et de musique."
 *                 avatarUrl:
 *                   type: string
 *                   example: "https://exemple.com/avatar.jpg"
 *                 utilisateurId:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Profil non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profil non trouvé"
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
router.get("/:utilisateurId", getProfilByUserId);

/**
 * @swagger
 * /profils/{utilisateurId}:
 *   put:
 *     summary: Mettre à jour un profil
 *     description: Met à jour le profil d'un utilisateur spécifié par son identifiant en modifiant la bio et/ou l'URL de l'avatar.
 *     tags:
 *       - Profils
 *     parameters:
 *       - in: path
 *         name: utilisateurId
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant de l'utilisateur dont le profil doit être mis à jour.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *                 example: "Nouvelle bio"
 *               avatarUrl:
 *                 type: string
 *                 format: uri
 *                 example: "https://exemple.com/nouvel-avatar.jpg"
 *     responses:
 *       200:
 *         description: Profil mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profil mis à jour avec succès"
 *                 profil:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     bio:
 *                       type: string
 *                       example: "Nouvelle bio"
 *                     avatarUrl:
 *                       type: string
 *                       example: "https://exemple.com/nouvel-avatar.jpg"
 *                     utilisateurId:
 *                       type: integer
 *                       example: 1
 *       404:
 *         description: Profil non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profil non trouvé"
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
router.put("/:utilisateurId", updateProfil);

/**
 * @swagger
 * /profils/{utilisateurId}:
 *   delete:
 *     summary: Supprimer un profil
 *     description: Supprime le profil associé à l'utilisateur spécifié par son identifiant.
 *     tags:
 *       - Profils
 *     parameters:
 *       - in: path
 *         name: utilisateurId
 *         schema:
 *           type: integer
 *         required: true
 *         description: L'identifiant de l'utilisateur dont le profil doit être supprimé.
 *     responses:
 *       200:
 *         description: Profil supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profil supprimé avec succès"
 *       404:
 *         description: Profil non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profil non trouvé"
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
router.delete("/:utilisateurId", deleteProfil);

export default router;
