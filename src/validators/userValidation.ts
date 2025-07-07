import Joi from "joi";

export const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required()
    .messages({
    "string.base": "Le nom d'utilisateur doit être une chaîne.",
    "string.min": "Le nom d'utilisateur doit contenir au moins 3 caractères.",
    "string.max": "Le nom d'utilisateur ne peut pas dépasser 30 caractères.",
    "any.required": "Le nom d'utilisateur est requis."
    }),
    email: Joi.string().email().required()
    .messages({
    "string.email": "L'email doit être valide.",
    "any.required": "L'email est requis."
    }),
    password: Joi.string().min(6).max(50).required()
    .messages({
    "string.min": "Le mot de passe doit contenir au moins 6 caractères.",
    "string.max": "Le mot de passe ne peut pas dépasser 50 caractères.",
    "any.required": "Le mot de passe est requis."
    }),
    bio: Joi.string().max(255).optional(),
    profilePicture: Joi.string().uri().optional()
    .messages({ "string.uri": "L'URL de la photo de profil doit être valide." }),
    socialLinks: Joi.array().items(Joi.string().uri()).optional(),
    role: Joi.string().valid("admin", "user").default("user")
});
