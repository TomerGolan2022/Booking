"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dal_1 = __importDefault(require("../2-utils/dal"));
var cyber_1 = __importDefault(require("../2-utils/cyber"));
var role_model_1 = __importDefault(require("../4-models/role-model"));
var errors_model_1 = require("../4-models/errors-model");
var users_logic_1 = __importDefault(require("../5-logic/users-logic"));
// Register 
function register(user) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, sql, values, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = user.validatePost();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    return [4 /*yield*/, isNameExist(user.username)];
                case 1:
                    // Unique Username Validation:
                    if (_a.sent()) {
                        throw new errors_model_1.ValidationError("The username '".concat(user.username, "' exists"));
                    }
                    // Change to Hash password before saving in db:
                    user.password = cyber_1.default.hash(user.password);
                    // Add role:
                    user.role = role_model_1.default.User;
                    sql = "INSERT INTO users(firstName, lastName, username, password, role)\n                 VALUES(?, ?, ?, ?, ?)";
                    values = [user.firstName, user.lastName, user.username, user.password, user.role];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 2:
                    result = _a.sent();
                    user.userId = result.insertId;
                    // Delete password before returning user: 
                    delete user.password;
                    return [2 /*return*/, user];
            }
        });
    });
}
// Login
function login(credentials) {
    return __awaiter(this, void 0, void 0, function () {
        var users, user, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users_logic_1.default.getAllUsers()];
                case 1:
                    users = _a.sent();
                    // Change to Hash password before comparing to db:
                    credentials.password = cyber_1.default.hash(credentials.password);
                    user = users.find(function (u) { return u.username === credentials.username && u.password === credentials.password; });
                    // If user not exist 
                    if (!user) {
                        throw new errors_model_1.UnauthorizedError("Incorrect username or password");
                    }
                    token = cyber_1.default.getNewToken(user);
                    // Return the token
                    return [2 /*return*/, token];
            }
        });
    });
}
// Validation:
function isNameExist(username) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, values, result, isExists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT EXISTS(SELECT * FROM users WHERE username = ?) as isExists";
                    values = [username];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 1:
                    result = _a.sent();
                    isExists = result[0].isExists;
                    return [2 /*return*/, isExists === 1];
            }
        });
    });
}
exports.default = {
    register: register,
    login: login
};
