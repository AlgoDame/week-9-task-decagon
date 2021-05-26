import Joi from "joi";

function validateOrganization(requestBody: Record<string, any>) {
    const schema = Joi.object({
        organization: Joi.string()
            .required()
            .error(() => new Error("Organization required")),
        products: Joi.array()
            .required()
            .error(() => new Error("Products are required")),
        marketValue: Joi.string()
            .required()
            .error(() => new Error("Market Value is required")),
        address: Joi.string()
            .required()
            .error(() => new Error("Address is required")),
        ceo: Joi.string()
            .required()
            .error(() => new Error("Ceo is required")),
        country: Joi.string()
            .required()
            .error(() => new Error("Country is required")),
        noOfEmployees: Joi.number()
            .required()
            .error(() => new Error("Number of Employees are required")),
        employees: Joi.array()
            .required()
            .error(()=> new Error("Employees  are required"))
    })
    return schema.validate(requestBody);
    
}
export default validateOrganization;