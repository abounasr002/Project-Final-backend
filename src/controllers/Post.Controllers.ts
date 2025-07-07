// import { Request, Response } from "express";
// import Post from "../models/Post"; 

// // Créer un post
// export async function createPost(req: Request, res: Response) {
//   try {
//     const { userId, content, media, link } = req.body;

//     // Création du post
//     const newPost = await Post.create({
//       userId,
//       content,
//       media,
//       link,
//     });

//     res.status(201).json({
//       message: "Post créé avec succès",
//       post: newPost,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       message: "Erreur lors de la création du post",
//       error: error.message,
//     });
//   }
// }

// // Obtenir tous les posts
// export async function getAllPosts(req: Request, res: Response) {
//   try {
//     const posts = await Post.findAll();

//     res.status(200).json(posts);
//   } catch (error: any) {
//     res.status(500).json({
//       message: "Erreur lors de la récupération des posts",
//       error: error.message,
//     });
//   }
// }

// // Obtenir un post par son ID
// export async function getPostById(req: Request, res: Response) {
//   const { id } = req.params;

//   try {
//     const post = await Post.findByPk(id);

//     if (!post) {
//     res.status(404).json({ message: "Post non trouvé" });
//     return; 
//     }

//     res.status(200).json(post);
//   } catch (error: any) {
//     res.status(500).json({
//       message: "Erreur lors de la récupération du post",
//       error: error.message,
//     });
//   }
// }

// // Mettre à jour un post
// export async function updatePost(req: Request, res: Response) {
//   const { id } = req.params;
//   const { content, media, link } = req.body;

//   try {
//     const post = await Post.findByPk(id);

//     if (!post) {
//     res.status(404).json({ message: "Post non trouvé" });
//     return;
//     }

//     post.content = content || post.content;
//     post.media = media || post.media;
//     post.link = link || post.link;

//     await post.save();

//     res.status(200).json({
//       message: "Post mis à jour avec succès",
//       post,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       message: "Erreur lors de la mise à jour du post",
//       error: error.message,
//     });
//   }
// }

// // Supprimer un post
// export async function deletePost(req: Request, res: Response) {
//   const { id } = req.params;

//   try {
//     const post = await Post.findByPk(id);

//     if (!post) {
//     res.status(404).json({ message: "Post non trouvé" });
//     return;
//     }

//     await post.destroy();

//     res.status(200).json({
//       message: "Post supprimé avec succès",
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       message: "Erreur lors de la suppression du post",
//       error: error.message,
//     });
//   }
// }





















import { Request, Response } from "express";
import { validateSchema } from "../utils/validateSchema";
import { postSchema } from "../validators/postValidation";
import Post from "../models/Post";

//  Créer un post
export async function createPost(req: Request, res: Response) {
  try {
    // Validar los datos de entrada
    const validatedBody = validateSchema(req, postSchema);

    // Créer le post
    const newPost = await Post.create(validatedBody);

    res.status(201).json({
      message: "Post créé avec succès",
      post: newPost,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Erreur de validation",
      errors: error.details ? error.details.map((err: any) => err.message) : error.message,
    });
  }
}

//  Obtenir tous les posts
export async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await Post.findAll({ order: [["createdAt", "DESC"]] });

    res.status(200).json(posts);
  } catch (error: any) {
    res.status(500).json({
      message: "Erreur lors de la récupération des posts",
      error: error.message,
    });
  }
}

//  Obtenir un post par son ID
export async function getPostById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);

    if (!post) {
    res.status(404).json({ message: "Post non trouvé" });
    return ;
    }

    res.status(200).json(post);
  } catch (error: any) {
    res.status(500).json({
      message: "Erreur lors de la récupération du post",
      error: error.message,
    });
  }
}

//  Mettre à jour un post
export async function updatePost(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const validatedBody = validateSchema(req, postSchema);

    const post = await Post.findByPk(id);
    if (!post) {
    res.status(404).json({ message: "Post non trouvé" });
    return ;
    }

    await post.update(validatedBody);

    res.status(200).json({
      message: "Post mis à jour avec succès",
      post,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Erreur de validation",
      errors: error.details ? error.details.map((err: any) => err.message) : error.message,
    });
  }
}

//  Supprimer un post
export async function deletePost(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);

    if (!post) {
    res.status(404).json({ message: "Post non trouvé" });
    return ;
    }

    await post.destroy();

    res.status(200).json({
      message: "Post supprimé avec succès",
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Erreur lors de la suppression du post",
      error: error.message,
    });
  }
}




