import Joi from "joi";

// Schéma de validation pour la création d'un commentaire
export const createCommentSchema = Joi.object({
  userId: Joi.number().integer().positive().required()
    .messages({
      "number.base": "L'ID de l'utilisateur doit être un nombre.",
      "number.integer": "L'ID de l'utilisateur doit être un entier.",
      "number.positive": "L'ID de l'utilisateur doit être un nombre positif.",
      "any.required": "L'ID de l'utilisateur est requis."
    }),

  postId: Joi.number().integer().positive().required()
    .messages({
      "number.base": "L'ID du post doit être un nombre.",
      "number.integer": "L'ID du post doit être un entier.",
      "number.positive": "L'ID du post doit être un nombre positif.",
      "any.required": "L'ID du post est requis."
    }),

  content: Joi.string().min(3).max(500).required()
    .messages({
      "string.base": "Le contenu du commentaire doit être une chaîne de caractères.",
      "string.min": "Le commentaire doit contenir au moins 3 caractères.",
      "string.max": "Le commentaire ne peut pas dépasser 500 caractères.",
      "any.required": "Le contenu du commentaire est requis."
    }),
});

// Schéma de validation pour la mise à jour d'un commentaire
export const updateCommentSchema = Joi.object({
  content: Joi.string().min(3).max(500).required()
    .messages({
      "string.base": "Le contenu du commentaire doit être une chaîne de caractères.",
      "string.min": "Le commentaire doit contenir au moins 3 caractères.",
      "string.max": "Le commentaire ne peut pas dépasser 500 caractères.",
      "any.required": "Le contenu du commentaire est requis."
    }),
});
