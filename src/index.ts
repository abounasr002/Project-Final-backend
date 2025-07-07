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

//Création d'un serveur Express
const app = express();

//chargement des variables d'environnement
dotenv.config();

// Connecter à Sequelize
testConnection().then(() => syncDatabase());

//Définition du port du serveur
const PORT = 3000;
console.log("lancement du serveur")
//Config du serveur par défaut
app.use(express.json());

// Activer CORS uniquement pour une seule origine
//curl ifconfig.me pour connaître l'ip publique de votre pc
const corsOptions = {
    origin: process.env.CLIENT_URL, // Placer le domaine du client pour l'autoriser
    methods: 'GET,POST,DELETE,PUT', // Restreindre les méthodes autorisées
    allowedHeaders: ["Content-Type", "Authorization"], // Définir les en-têtes acceptés
    credentials: true, // Autoriser les cookies et les headers sécurisés (dont celui qui contient le jwt)
};
 
app.use(cors(corsOptions));

//TODO ajouter ici les routes
app.use('/users', utilisateurRoutes )
app.use("/auth", authroutes);
app.use("/posts", PostRoutes);
app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);
app.use("/profils", profilRoutes);
app.use("/followers",followersRoutes)


// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//app.listen indique au serveur d'écouter les requêtes HTTP arrivant sur le
//port indiqué
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});







// (async function() {

//     // Configuration
//     cloudinary.config({ 
//         cloud_name: 'dygw2odnh', 
//         api_key: '571169952995896', 
//         api_secret: '6yx840AddHNX-MvSnlEaV-HEfxw' // Click 'View API Keys' above to copy your API secret
//     });
    
//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//         )
//         .catch((error) => {
//         console.log(error);
//         });
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();