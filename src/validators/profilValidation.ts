import Joi from "joi";

// Schéma de validation pour la création d'un profil
export const createProfilSchema = Joi.object({
    id: Joi.number().integer().positive(),
    pseudo: Joi.string().min(3).max(30).required(),
    bio: Joi.string().min(5).max(500).required()
    .messages({
    "string.base": "La bio doit être une chaîne de caractères.",
    "string.empty": "La bio est requise.",
    "string.min": "La bio doit contenir au moins {#limit} caractères.",
    "string.max": "La bio ne peut pas dépasser {#limit} caractères.",
    "any.required": "La bio est requise."
    }),
    avatarUrl: Joi.string().uri().optional()
    .messages({
    "string.uri": "L'avatar doit être une URL valide."
    }),
});

// Schéma de validation pour la mise à jour d'un profil
export const updateProfilSchema = Joi.object({
    bio: Joi.string().min(5).max(500).optional()
    .messages({
    "string.base": "La bio doit être une chaîne de caractères.",
    "string.min": "La bio doit contenir au moins {#limit} caractères.",
    "string.max": "La bio ne peut pas dépasser {#limit} caractères."
    }),
    avatarUrl: Joi.string().uri().optional()
    .messages({
    "string.uri": "L'avatar doit être une URL valide."
    }),
});
