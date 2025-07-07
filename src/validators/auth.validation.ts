import Joi from "joi";

// Schéma de validation pour la connexion
export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'L\'email est requis.',
        'string.email': 'L\'email doit être valide.',
    }),
    password: Joi.string().min(8).required().messages({
        'string.empty': 'Le mot de passe est requis.',
        'string.min': 'Le mot de passe doit contenir au moins 8 caractères.',
    })
});

// Schéma de validation pour l'inscription
export const registerSchema = Joi.object({
    nom: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'Le nom est requis.',
        'string.min': 'Le nom doit contenir au moins 3 caractères.',
        'string.max': 'Le nom ne peut pas dépasser 30 caractères.'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'L\'email est requis.',
        'string.email': 'L\'email doit être valide.'
    }),
    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[!@#$%^&])(?=.*\d)/) // Au moins un caractère spécial et un chiffre
        .required()
        .messages({
            'string.empty': 'Le mot de passe est requis.',
            'string.min': 'Le mot de passe doit contenir au moins 8 caractères.',
            'string.pattern.base': 'Le mot de passe doit contenir au moins un chiffre et un caractère spécial.'
        }),
    role: Joi.string().valid('Admin', 'User')
        
    
});
