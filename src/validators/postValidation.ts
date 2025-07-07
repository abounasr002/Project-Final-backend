import Joi from "joi";

export const postSchema = Joi.object({
  userId: Joi.number().integer().positive().required()
    .messages({
    "number.base": "L'ID de l'utilisateur doit être un nombre.",
    "number.integer": "L'ID de l'utilisateur doit être un entier.",
    "number.positive": "L'ID de l'utilisateur doit être positif.",
    "any.required": "L'ID de l'utilisateur est requis."
    }),
    content: Joi.string().min(5).max(500).required()
    .messages({
    "string.base": "Le contenu doit être une chaîne de caractères.",
    "string.min": "Le contenu doit avoir au moins 5 caractères.",
    "string.max": "Le contenu ne peut pas dépasser 500 caractères.",
    "any.required": "Le contenu est requis."
    }),
media: Joi.string().uri().optional()
    .messages({
    "string.uri": "Le média doit être une URL valide."
    }),
    link: Joi.string().uri().optional()
    .messages({
    "string.uri": "Le lien doit être une URL valide."
    })
});
