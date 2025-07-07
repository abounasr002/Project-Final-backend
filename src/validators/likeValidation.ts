import Joi from "joi";

// Schéma de validation pour ajouter/supprimer un like
export const likeSchema = Joi.object({
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
});
