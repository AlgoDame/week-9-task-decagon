import Joi from "joi";

export function validateLogin(requestBody: Record<string, any>) {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .error(() => new Error("A valid email is required")),
        password: Joi.string()
            .required()
            .error(() => new Error ("Invalid password"))
    })
    return schema.validate(requestBody);
}
