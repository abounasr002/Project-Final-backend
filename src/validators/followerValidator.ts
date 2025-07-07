import Joi from "joi";

export const followSchema = Joi.object({
    followerId: Joi.number().integer().positive().required().messages({
        "number.base": "Le followerId doit être un nombre.",
        "number.integer": "Le followerId doit être un entier.",
        "number.positive": "Le followerId doit être un entier positif.",
        "any.required": "Le followerId est requis.",
    }),
    followingId: Joi.number().integer().positive().required().messages({
        "number.base": "Le followingId doit être un nombre.",
        "number.integer": "Le followingId doit être un entier.",
        "number.positive": "Le followingId doit être un entier positif.",
        "any.required": "Le followingId est requis.",
    }),
});
