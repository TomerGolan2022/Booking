import Joi from "joi";
import Role from "./role-model";

class UserModel {
    [x: string]: any;

    public userId: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public role: Role;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }

    private static postValidationSchema = Joi.object({
        userId: Joi.forbidden(),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        username: Joi.string().required().min(2).max(50),
        password: Joi.string().required().min(2).max(50),
        role: Joi.string().optional().min(2).max(50)
    });

    private static putValidationSchema = Joi.object({
        userId: Joi.number().required().integer().min(1),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        username: Joi.string().required().min(2).max(50),
        password: Joi.string().required().min(2).max(50),
        role: Joi.string().optional().min(2).max(50)
    });

    private static patchValidationSchema = Joi.object({
        userId: Joi.number().required().integer().min(1),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        username: Joi.string().required().min(2).max(50),
        password: Joi.string().required().min(2).max(50),
        role: Joi.string().optional().min(2).max(50)
    });

    public validatePost(): string {
        const result = UserModel.postValidationSchema.validate(this);
        return result.error?.message;
    }

    public validatePut(): string {
        const result = UserModel.putValidationSchema.validate(this);
        return result.error?.message;
    }

    public validatePatch(): string {
        const result = UserModel.patchValidationSchema.validate(this);
        return result.error?.message;
    }

}

export default UserModel;