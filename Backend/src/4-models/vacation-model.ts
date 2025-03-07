import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class VacationModel {

    public vacationId: number;
    public location: string;
    public description: string;
    public fromDate: string;
    public untilDate: string;
    public price: number;
    public imageName: string;
    public image: UploadedFile;
    public isFollowing: number;
    public followers: number;

    public constructor(vacation: VacationModel){
        this.vacationId = vacation.vacationId;
        this.location = vacation.location;
        this.description = vacation.description;
        this.fromDate = vacation.fromDate;
        this.untilDate = vacation.untilDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
    }

    private static postValidationSchema = Joi.object({
        vacationId: Joi.forbidden(),
        location: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(2).max(100),
        fromDate: Joi.string().required().min(10).max(10),
        untilDate: Joi.string().required().min(10).max(10),
        price: Joi.number().required().min(250).max(3000),
        imageName: Joi.string().optional().min(2).max(50),
        image: Joi.object().required()
    });

    private static putValidationSchema = Joi.object({
        vacationId: Joi.number().required().integer().min(1),
        location: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(2).max(100),
        fromDate: Joi.string().required().min(10).max(10),
        untilDate: Joi.string().required().min(10).max(10),
        price: Joi.number().required().min(250).max(3000),
        imageName: Joi.string().optional().min(2).max(50),
        image: Joi.object().optional()
    });

    private static patchValidationSchema = Joi.object({
        vacationId: Joi.number().optional().integer().min(1),
        location: Joi.string().optional().min(2).max(50),
        description: Joi.string().optional().min(2).max(100),
        fromDate: Joi.string().optional().min(10).max(10),
        untilDate: Joi.string().optional().min(10).max(10),
        price: Joi.number().optional().min(250).max(3000),
        imageName: Joi.string().optional().min(2).max(50),
        image: Joi.object().optional()
    });

    public validatePost(): string {
        const result = VacationModel.postValidationSchema.validate(this);
        return result.error?.message;
    }

    public validatePut(): string {
        const result = VacationModel.putValidationSchema.validate(this);
        return result.error?.message;
    }

    public validatePatch(): string {
        const result = VacationModel.patchValidationSchema.validate(this);
        return result.error?.message;
    }
    
}

export default VacationModel;