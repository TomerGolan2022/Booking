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
var uuid_1 = require("uuid");
var dal_1 = __importDefault(require("../2-utils/dal"));
var errors_model_1 = require("../4-models/errors-model");
var vacation_model_1 = __importDefault(require("../4-models/vacation-model"));
var socket_logic_1 = __importDefault(require("../5-logic/socket-logic"));
// Get vacations by userId: 
function getVacationsByUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, vacationsByUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT vacations.vacationId ,\n                 vacations.location,\n                 vacations.description,\n                 DATE_FORMAT(vacations.fromDate, '%Y-%m-%d') AS fromDate,\n                 DATE_FORMAT(vacations.untilDate, '%Y-%m-%d') AS untilDate,\n                 vacations.price,\n                 vacations.imageName,\n                 EXISTS(SELECT * FROM followers WHERE vacations.vacationId = followers.vacationId AND userId=".concat(userId, ") AS isFollowing,\n                 COUNT(followers.userId) AS followers\n                 FROM vacations\n                 LEFT JOIN followers\n                 ON vacations.vacationId=followers.vacationId \n                 GROUP BY vacations.vacationId\n                 ORDER BY isFollowing DESC, followers DESC\n                 ");
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    vacationsByUser = _a.sent();
                    return [2 /*return*/, vacationsByUser];
            }
        });
    });
}
// Get all vacations: 
function getAllVacations() {
    return __awaiter(this, void 0, void 0, function () {
        var sql, vacations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT vacations.vacationId ,\n                 vacations.location,\n                 vacations.description,\n                 DATE_FORMAT(vacations.fromDate, '%Y-%m-%d') AS fromDate,\n                 DATE_FORMAT(vacations.untilDate, '%Y-%m-%d') AS untilDate,\n                 vacations.price,\n                 vacations.imageName,\n                 COUNT(followers.userId) AS followers\n                 FROM vacations\n                 LEFT JOIN followers\n                 ON vacations.vacationId=followers.vacationId \n                 GROUP BY vacations.vacationId\n                 ORDER BY followers DESC\n                 ";
                    return [4 /*yield*/, dal_1.default.execute(sql)];
                case 1:
                    vacations = _a.sent();
                    return [2 /*return*/, vacations];
            }
        });
    });
}
// Get one vacation: 
function getOneVacation(vacationId) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, vacations, vacation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "SELECT vacations.vacationId ,\n                 vacations.location,\n                 vacations.description,\n                 DATE_FORMAT(vacations.fromDate, '%Y-%m-%d') AS fromDate,\n                 DATE_FORMAT(vacations.untilDate, '%Y-%m-%d') AS untilDate,\n                 vacations.price,\n                 vacations.imageName,\n                 COUNT(followers.userId) AS followers\n                 FROM vacations\n                 LEFT JOIN followers\n                 ON vacations.vacationId=followers.vacationId\n                 WHERE vacations.vacationId=?;\n                ";
                    return [4 /*yield*/, dal_1.default.execute(sql, vacationId)];
                case 1:
                    vacations = _a.sent();
                    vacation = vacations[0];
                    if (!vacation) {
                        throw new errors_model_1.ResourceNotFoundError(vacationId);
                    }
                    return [2 /*return*/, vacation];
            }
        });
    });
}
// Add one Vacation: 
function addVacation(vacation) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, dotIndex, extension, sql, values, result, addedVacation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = vacation.validatePost();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    if (!vacation.image) return [3 /*break*/, 2];
                    dotIndex = vacation.image.name.lastIndexOf(".");
                    extension = vacation.image.name.substring(dotIndex);
                    vacation.imageName = (0, uuid_1.v4)() + extension; // a3c0807a-c034-4370-854d-55612c954d83.png / 741cb7c1-422f-4476-a456-b692b2e880b8.jpg
                    // Save in disk: 
                    return [4 /*yield*/, vacation.image.mv("./src/1-assets/images/" + vacation.imageName)];
                case 1:
                    // Save in disk: 
                    _a.sent();
                    // Don't return back image file: 
                    delete vacation.image;
                    _a.label = 2;
                case 2:
                    sql = "INSERT INTO vacations(location, description, imageName, fromDate, untilDate, price)\n                 VALUES(?, ?, ?, ?, ?, ?)";
                    values = [vacation.location, vacation.description, vacation.imageName, vacation.fromDate, vacation.untilDate, vacation.price];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 3:
                    result = _a.sent();
                    vacation.vacationId = result.insertId;
                    return [4 /*yield*/, getOneVacation(vacation.vacationId)];
                case 4:
                    addedVacation = _a.sent();
                    socket_logic_1.default.reportAddVacation(addedVacation);
                    return [2 /*return*/, addedVacation];
            }
        });
    });
}
// Update full vacation: 
function updateFullVacation(vacation) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, dotIndex, extension, sql, values, result, updatedVacation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = vacation.validatePut();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    if (!vacation.image) return [3 /*break*/, 2];
                    dotIndex = vacation.image.name.lastIndexOf(".");
                    extension = vacation.image.name.substring(dotIndex);
                    vacation.imageName = (0, uuid_1.v4)() + extension; // a3c0807a-c034-4370-854d-55612c954d83.png / 741cb7c1-422f-4476-a456-b692b2e880b8.jpg
                    // Save in disk: 
                    return [4 /*yield*/, vacation.image.mv("./src/1-assets/images/" + vacation.imageName)];
                case 1:
                    // Save in disk: 
                    _a.sent();
                    // Don't return back image file: 
                    delete vacation.image;
                    _a.label = 2;
                case 2:
                    sql = "UPDATE vacations SET \n                 location = ?,\n                 description = ?,\n                 imageName = ?,\n                 fromDate = ?,\n                 untilDate = ?,\n                 price = ?\n                 WHERE vacationId = ?";
                    values = [vacation.location, vacation.description, vacation.imageName, vacation.fromDate, vacation.untilDate, vacation.price, vacation.vacationId];
                    return [4 /*yield*/, dal_1.default.execute(sql, values)];
                case 3:
                    result = _a.sent();
                    if (result.affectedRows === 0) {
                        throw new errors_model_1.ResourceNotFoundError(vacation.vacationId);
                    }
                    return [4 /*yield*/, getOneVacation(vacation.vacationId)];
                case 4:
                    updatedVacation = _a.sent();
                    return [2 /*return*/, updatedVacation];
            }
        });
    });
}
// Update partial vacation: 
function updatePartialVacation(vacation) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, dbVacation, prop, updatedVacation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errors = vacation.validatePatch();
                    if (errors) {
                        throw new errors_model_1.ValidationError(errors);
                    }
                    return [4 /*yield*/, getOneVacation(vacation.vacationId)];
                case 1:
                    dbVacation = _a.sent();
                    for (prop in dbVacation) {
                        // Save the props if we send new props (apart from image):
                        if (vacation[prop] !== undefined) {
                            dbVacation[prop] = vacation[prop];
                        }
                        // Save the image if we send new image:
                        if (vacation.image !== undefined) {
                            dbVacation.image = vacation.image;
                        }
                    }
                    return [4 /*yield*/, updateFullVacation(new vacation_model_1.default(dbVacation))];
                case 2:
                    updatedVacation = _a.sent();
                    // Report via socket.io an existing vacation has been updated by the admin: 
                    socket_logic_1.default.reportUpdateVacation(updatedVacation);
                    return [2 /*return*/, updatedVacation];
            }
        });
    });
}
// Delete vacation:
function deleteVacation(id) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sql = "DELETE FROM vacations WHERE vacationId = ?";
                    return [4 /*yield*/, dal_1.default.execute(sql, id)];
                case 1:
                    result = _a.sent();
                    if (result.affectedRows === 0) {
                        throw new errors_model_1.ResourceNotFoundError(id);
                    }
                    // Report via socket.io an existing vacation has been deleted by the admin: 
                    socket_logic_1.default.reportDeleteVacation(id);
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    getVacationsByUser: getVacationsByUser,
    getAllVacations: getAllVacations,
    getOneVacation: getOneVacation,
    addVacation: addVacation,
    updateFullVacation: updateFullVacation,
    updatePartialVacation: updatePartialVacation,
    deleteVacation: deleteVacation
};
