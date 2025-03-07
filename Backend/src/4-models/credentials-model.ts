import Joi from "joi";

class CredentialModel {

   public username: string;
    public password: string;

    public constructor(user: CredentialModel) {
        this.username = user.username;
        this.password = user.password;
    }

    private static postValidationSchema = Joi.object({
        username: Joi.string().required().min(2).max(50),
        password: Joi.string().required().min(2).max(50)
    });

    public validatePost(): string {
        const result = CredentialModel.postValidationSchema.validate(this);
        return result.error?.message;
    }

}

export default CredentialModel;