"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var CredentialModel = /** @class */ (function () {
    function CredentialModel(user) {
        this.username = user.username;
        this.password = user.password;
    }
    CredentialModel.prototype.validatePost = function () {
        var _a;
        var result = CredentialModel.postValidationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    CredentialModel.postValidationSchema = joi_1.default.object({
        username: joi_1.default.string().required().min(2).max(50),
        password: joi_1.default.string().required().min(2).max(50)
    });
    return CredentialModel;
}());
exports.default = CredentialModel;
