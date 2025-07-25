import express from 'express';
import dotenv from 'dotenv';
import { testConnection } from './config/database';
import { syncDatabase } from './models/syncModels';

import swaggerDocs from './config/swagger';
import swaggerUi from 'swagger-ui-express'
import authroutes from './routes/authroutes';
import PostRoutes from './routes/PostRoutes';
import commentRoutes from './routes/commentRoutes';
import likeRoutes from './routes/likeRoutes';
import cors from 'cors';
import profilRoutes from './routes/profilRoutes';
import followersRoutes from './routes/followersRoutes';
import Utilisateur from './models/Utilisateur.model';
import utilisateurRoutes from './routes/utilisateurRoutes';

// import { v2 as cloudinary } from 'cloudinary';

// Création d'un serveur Express
const app = express();

// Chargement des variables d'environnement
dotenv.config();

// Connexion à Sequelize
testConnection().then(() => syncDatabase());

// Définition du port
const PORT = 3000;

// Configuration CORS — garde uniquement celle-ci



const corsOptions = {
origin: process.env.CLIENT_URL, // Placer le domaine du client pour l'autoriser
methods: 'GET,POST,DELETE,PUT', // Restreindre les méthodes autorisées
allowedHeaders: ["Content-Type", "Authorization"], // Définir les en-têtes acceptés
credentials: true, // Autoriser les cookies et les headers sécurisés (dont celui qui contient

};



app.use(cors(corsOptions));



// app.use(cors({
//     origin: 'http://localhost:4200',
//     credentials: true,
// }));

if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('token');
    // ...
  }
  

// Parseur JSON
app.use(express.json());

// Routes
app.use('/users', utilisateurRoutes);
app.use("/auth", authroutes);
app.use("/posts", PostRoutes);
app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);
// app.use("/profils", profilRoutes);
app.use("/followers", followersRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


