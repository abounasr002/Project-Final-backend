import { Request, Response } from "express";
import Utilisateur from "../models/Utilisateur.model";
import sequelize from "../config/database";

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

















// export async function createUser(req: Request, res: Response) {
//   try {
//     // 1. Validation avec Joi
//     const validatedData = validateSchema(req, registerSchema);
    
//     // 2. Vérifier si l'email existe déjà
//     const existingUser = await Utilisateur.findOne({ where: { email: validatedData.email } });
//     if (existingUser) {
//     res.status(400).json({ message: "Cet email est déjà utilisé" })
//       return ;
//     }

//     // 3. Hacher le mot de passe
//     const hashedPassword = await bcrypt.hash(validatedData.password, 10);

//     // 4. Création de l'utilisateur
//     const utilisateur = await Utilisateur.create({
//       nom: validatedData.nom,
//       email: validatedData.email,
//       password: hashedPassword,
//       bio: validatedData.bio,
//       profilePicture: validatedData.profilePicture,
//       socialLinks: validatedData.socialLinks ? JSON.stringify(validatedData.socialLinks) : undefined,
//       role: validatedData.role || "user"
//     });

//     // 5. Retourner la réponse sans le mot de passe
//     const userResponse = {
//       id: utilisateur.id,
//       nom: utilisateur.nom,
//       email: utilisateur.email,
//       role: utilisateur.role,
//       bio: utilisateur.bio,
//       profilePicture: utilisateur.profilePicture,
//       socialLinks: utilisateur.socialLinks ? JSON.parse(utilisateur.socialLinks) : null
//     };

//     res.status(201).json(userResponse);
//   } catch (err: any) {
//     console.error("Erreur création utilisateur:", err);
    
//     if (err.name === "SequelizeValidationError") {
//       res.status(400).json({ 
//         message: "Erreur de validation",
//         errors: err.errors.map((e: any) => e.message) 
//       });
//       return;
//     }
    
//     res.status(500).json({ 
//       message: "Erreur interne du serveur",
//       error: process.env.NODE_ENV === "development" ? err.message : undefined
//     });
//   }
// }












export async function getAllUsers(req: Request, res: Response) {
  try {
    const utilisateurs = await Utilisateur.findAll();
    res.send(utilisateurs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
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