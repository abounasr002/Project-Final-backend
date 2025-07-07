import { Request, Response } from "express";
import Profil from "../models/profil.models";
import Utilisateur from "../models/Utilisateur.model";
import { validateSchema } from "../utils/validateSchema";
import { createProfilSchema, updateProfilSchema } from "../validators/profilValidation";

// Créer un profil
export async function createProfil(req: Request, res: Response) {
    try {
    // Validation des données avec Joi
    const { id, bio, avatarUrl , pseudo} = validateSchema(req, createProfilSchema);
    

    // // Vérifier si l'utilisateur existe
    // const utilisateur = await Utilisateur.findByPk(id);
    // if (!utilisateur) {
    // res.status(404).json({ message: "Utilisateur non trouvé" });
    // return ;
    // }

    // Vérifier si l'utilisateur a déjà un profil
    const existingProfil = await Profil.findOne({ where: { pseudo} });
    if (existingProfil) {
    res.status(400).json({ message: "L'utilisateur a déjà un profil" });
    return ;
    }

    // Créer le profil
    const profil = await Profil.create({ bio, avatarUrl, pseudo });
    res.status(201).json({ message: "Profil créé avec succès", profil });
    } catch (error: any) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
}

// Obtenir un profil par l'ID de l'utilisateur
export async function getProfilByUserId(req: Request, res: Response) {
    try {
    const { id } = req.params;

    const profil = await Profil.findOne({ where: { id } });
    if (!profil) {
    res.status(404).json({ message: "Profil non trouvé" });
    return;
    }

    res.status(200).json(profil);
    } catch (error: any) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
}

// Mettre à jour un profil
export async function updateProfil(req: Request, res: Response) {
    try {
    const { id } = req.params;
    // Validation des données pour la mise à jour (aucun champ n'est requis)
    const { bio, avatarUrl } = validateSchema(req, updateProfilSchema);

    const profil = await Profil.findOne({ where: { id } });
    if (!profil) {
    res.status(404).json({ message: "Profil non trouvé" });
    return ;
    }

    await profil.update({ bio, avatarUrl });
    res.status(200).json({ message: "Profil mis à jour avec succès", profil });
    } catch (error: any) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
}

// Supprimer un profil
export async function deleteProfil(req: Request, res: Response) {
    try {
    const { id } = req.params;

    const profil = await Profil.findOne({ where: { id } });
    if (!profil) {
    res.status(404).json({ message: "Profil non trouvé" });
    return;
    }

    await profil.destroy();
    res.status(200).json({ message: "Profil supprimé avec succès" });
    } catch (error: any) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
}









// import { Request, Response } from "express";
// import User from "../models/user";
// import { validateSchema } from "../utils/validateSchema";
// import { createProfilSchema, updateProfilSchema } from "../validators/profilValidation";

// // Créer un profil
// export async function createProfil(req: Request, res: Response) {
//     try {
//         const { bio, profilePicture, socialLinks, userId } = validateSchema(req, createProfilSchema);

//         const user = await User.findByPk(userId);
//         if (!user) {
//             res.status(404).json({ message: "Utilisateur non trouvé" });
//             return;
//         }

//         const existingProfil = await User.findOne({ where: { id: userId } });
//         if (existingProfil) {
//             res.status(400).json({ message: "L'utilisateur a déjà un profil" });
//             return;
//         }

//         const profil = await User.create({
//             bio, profilePicture, socialLinks, id: userId,
//             username: "",
//             email: "",
//             password: "",
//             role: "admin"
//         });
//         res.status(201).json({ message: "Profil créé avec succès", profil });
//     } catch (error: any) {
//         res.status(500).json({ message: "Erreur du serveur", error: error.message });
//     }
// }

// // Obtenir un profil par ID d'utilisateur
// export async function getProfilByUserId(req: Request, res: Response) {
//     try {
//         const { userId } = req.params;

//         const profil = await User.findOne({ where: { id: userId } });
//         if (!profil) {
//             res.status(404).json({ message: "Profil non trouvé" });
//             return;
//         }

//         res.status(200).json(profil);
//     } catch (error: any) {
//         res.status(500).json({ message: "Erreur du serveur", error: error.message });
//     }
// }

// // Mettre à jour un profil
// export async function updateProfil(req: Request, res: Response) {
//     try {
//         const { userId } = req.params;
//         const { bio, profilePicture, socialLinks } = validateSchema(req, updateProfilSchema);

//         const profil = await User.findOne({ where: { id: userId } });
//         if (!profil) {
//             res.status(404).json({ message: "Profil non trouvé" });
//             return;
//         }

//         await profil.update({ bio, profilePicture, socialLinks });
//         res.status(200).json({ message: "Profil mis à jour avec succès", profil });
//     } catch (error: any) {
//         res.status(500).json({ message: "Erreur du serveur", error: error.message });
//     }
// }

// // Supprimer un profil
// export async function deleteProfil(req: Request, res: Response) {
//     try {
//         const { userId } = req.params;

//         const profil = await User.findOne({ where: { id: userId } });
//         if (!profil) {
//             res.status(404).json({ message: "Profil non trouvé" });
//             return;
//         }

//         await profil.destroy();
//         res.status(200).json({ message: "Profil supprimé avec succès" });
//     } catch (error: any) {
//         res.status(500).json({ message: "Erreur du serveur", error: error.message });
//     }
// }