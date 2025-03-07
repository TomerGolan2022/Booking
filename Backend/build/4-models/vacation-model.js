"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var VacationModel = /** @class */ (function () {
    function VacationModel(vacation) {
        this.vacationId = vacation.vacationId;
        this.location = vacation.location;
        this.description = vacation.description;
        this.fromDate = vacation.fromDate;
        this.untilDate = vacation.untilDate;
        this.price = vacation.price;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
    }
    VacationModel.prototype.validatePost = function () {
        var _a;
        var result = VacationModel.postValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    VacationModel.prototype.validatePut = function () {
        var _a;
        var result = VacationModel.putValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    VacationModel.prototype.validatePatch = function () {
        var _a;
        var result = VacationModel.patchValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    VacationModel.postValidationSchema = joi_1.default.object({
        vacationId: joi_1.default.forbidden(),
        location: joi_1.default.string().required().min(2).max(50),
        description: joi_1.default.string().required().min(2).max(100),
        fromDate: joi_1.default.string().required().min(10).max(10),
        untilDate: joi_1.default.string().required().min(10).max(10),
        price: joi_1.default.number().required().min(250).max(3000),
        imageName: joi_1.default.string().optional().min(2).max(50),
        image: joi_1.default.object().required()
    });
    VacationModel.putValidationSchema = joi_1.default.object({
        vacationId: joi_1.default.number().required().integer().min(1),
        location: joi_1.default.string().required().min(2).max(50),
        description: joi_1.default.string().required().min(2).max(100),
        fromDate: joi_1.default.string().required().min(10).max(10),
        untilDate: joi_1.default.string().required().min(10).max(10),
        price: joi_1.default.number().required().min(250).max(3000),
        imageName: joi_1.default.string().optional().min(2).max(50),
        image: joi_1.default.object().optional()
    });
    VacationModel.patchValidationSchema = joi_1.default.object({
        vacationId: joi_1.default.number().optional().integer().min(1),
        location: joi_1.default.string().optional().min(2).max(50),
        description: joi_1.default.string().optional().min(2).max(100),
        fromDate: joi_1.default.string().optional().min(10).max(10),
        untilDate: joi_1.default.string().optional().min(10).max(10),
        price: joi_1.default.number().optional().min(250).max(3000),
        imageName: joi_1.default.string().optional().min(2).max(50),
        image: joi_1.default.object().optional()
    });
    return VacationModel;
}());
exports.default = VacationModel;
