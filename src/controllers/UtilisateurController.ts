import { Request, Response } from "express";
import Utilisateur from "../models/Utilisateur.model";
import sequelize from "../config/database";

interface AuthRequest extends Request {
  user?: { id: number };
}

export async function createUser(req: Request, res: Response) {
  try {
    // Validation des champs
    const { nom, email, password, bio, profilePicture, socialLinks, role } = req.body;
    const utilisateur = await Utilisateur.create({
      nom,
      email,
      password,
      bio,
      profilePicture,
      socialLinks,
      role: role || "user", 
    });
    res.json(utilisateur);
  } catch (err: any) {
    res.status(500).json({ message: "Erreur interne", error: err.message });
  }
}





export async function getAllUsers(req: Request, res: Response) {
  try {
    const utilisateurs = await Utilisateur.findAll();
    res.send(utilisateurs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function getMe(req: AuthRequest, res: Response) {
  try {
      const userId = req.user?.id;
      if (!userId) {
          res.status(401).json({ message: "Non autorisé" });
          return
      }

      const utilisateur = await Utilisateur.findOne({ where: { id: userId } });
      if (!utilisateur) {
          res.status(404).json({ message: "Utilisateur non trouvé" });
          return
      }

      res.json(utilisateur);
  } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur :", error);
      res.status(500).json({ message: "Erreur du serveur" });
  }
}

export async function modifyUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { nom, email, bio, profilePicture, socialLinks, role } = req.body;
    
    const utilisateur = await Utilisateur.findByPk(id);

    if (!utilisateur) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    // Mise à jour des champs fournis
    if (nom) utilisateur.nom = nom;
    if (email) utilisateur.email = email;
    if (bio) utilisateur.bio = bio;
    if (profilePicture) utilisateur.profilePicture = profilePicture;
    if (socialLinks) utilisateur.socialLinks = socialLinks;
    if (role) utilisateur.role = role;

    await utilisateur.save();
    res.status(200).json({ message: "Utilisateur modifié avec succès", utilisateur });
  } catch (error) {
    console.error("Erreur lors de la modification :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const utilisateur = await Utilisateur.findByPk(id);
    if (!utilisateur) {
      res.status(404).json({ message: "Utilisateur non trouvé" });
      return;
    }

    await utilisateur.destroy();
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

export async function searchUsers(req: Request, res: Response) {
  try {
    const { nom, email, createdAfter } = req.query;
    const query = `
      SELECT id, nom, email, "createdAt", role
      FROM utilisateurs
      WHERE
        (:nom IS NULL OR nom ILIKE :nom) AND
        (:email IS NULL OR email ILIKE :email) AND
        (:createdAfter IS NULL OR "createdAt" >= :createdAfter)
      ORDER BY nom ASC;
    `;
    const utilisateurs = await sequelize.query(query, {
      replacements: {
        nom: nom ? `%${nom}%` : null,
        email: email ? `%${email}%` : null,
        createdAfter: createdAfter || null,
      },
      type: "SELECT",
    });
    res.json(utilisateurs);
  } catch (error: any) {
    console.error("Erreur lors de la recherche :", error);
    res.status(500).json({ message: error.message });
  }
}

// Modification du rôle d'un utilisateur
export async function updateUserRole(req: Request, res: Response) {
  try {
      const { id } = req.params;
      const { role } = req.body;

      if (!role) {
      res.status(400).json({ message: "Le champ rôle est obligatoire." });
      return; 
      }

      // Recherche de l'utilisateur
      const utilisateur = await Utilisateur.findOne({ where: { id } });
      if (!utilisateur) {
      res.status(404).json({ message: "Utilisateur non trouvé !" });
      return ;
      } 

      // Mise à jour du rôle
      utilisateur.role = role;
      await utilisateur.save();

      res.status(200).json({
          message: "Rôle de l'utilisateur mis à jour avec succès !",
          utilisateur,
      });
  } catch (error: any) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}
