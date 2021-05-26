import Joi from "joi";
export async function validateUpdate(requestBody:Record<string, any>) {
    const schema = Joi.object({
        organization: Joi.string()
            .error(() => new Error("Organization must be a string")),
        products: Joi.array()
            .error(() => new Error("Products must be an array of strings")),
        marketValue: Joi.string()
            .error(() => new Error("Market Value must be a string")),
        address: Joi.string()
            .error(() => new Error("Address must be a string")),
        ceo: Joi.string()
            .error(() => new Error("Ceo must be a string")),
        country: Joi.string()
            .error(() => new Error("Country must be a string")),
        noOfEmployees: Joi.number()
            .error(() => new Error("Must be a number")),
        employees: Joi.array()
            .error(() => new Error("Must be array"))
    })
    return schema.validate(requestBody);

}