import sequelize from "../config/database";
import Like from "../models/Like";
import Post from "../models/Post";
import Profil from "../models/profil.models";
import user from "../models/user";
// import { Client, Commande, Produit } from "./tp";
import Comments from "./Comment";
import followers from "./followers";
import Utilisateur from "./Utilisateur.model";

const syncDatabase = async () => {
    try {
        //alter: true Met à jour la structure automatiquement la structure de la base de données
        //à utiliser sans options pour utiliser les migrations en production.
        await sequelize.sync({ alter: true });
        console.log("Base de données synchronisée");
    } catch (error) {
        console.error("Erreur lors de la synchronisation :", error);
    }
};

export { syncDatabase, followers, Profil, Like, Post, Utilisateur, Comments };

// Client, Produit, Commande