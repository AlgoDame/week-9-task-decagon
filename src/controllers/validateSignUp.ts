import Joi from "joi";

function validateSignup(requestBody: Record<string, any>) {
    const schema = Joi.object ({
        firstname: Joi.string()
            .min(3)
            .error(()=> new Error ("First name must be more the 3 characters"))
            .required()
            .error(() => new Error("First name is required")),
        
        lastname: Joi.string()
            .min(3)
            .error(()=> new Error ("Last name must be more than 3 characters"))
            .required()
            .error(()=> new Error ("Last name is required")),
            
        email: Joi.string()
            .email()
            .required()
            .error(() => new Error("A valid email is required")),
        
        password: Joi.string()
            .min(5)
            .required()
            .error(() => new Error("Password must more than 4 characters")),
        
        confirmpassword: Joi.ref("password")
    });

    return schema.validate(requestBody)    
}
export default validateSignup;
