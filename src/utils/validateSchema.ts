import { Request } from "express";
import { ObjectSchema } from "joi";

export function validateSchema(req: Request, schema: ObjectSchema) {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
    throw error;
    }

return value;
}
