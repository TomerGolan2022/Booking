"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var config_1 = __importDefault(require("./2-utils/config"));
var catch_all_1 = __importDefault(require("./3-middleware/catch-all"));
var sanitize_1 = __importDefault(require("./3-middleware/sanitize"));
var errors_model_1 = require("./4-models/errors-model");
var socket_logic_1 = __importDefault(require("./5-logic/socket-logic"));
var users_controller_1 = __importDefault(require("./6-controllers/users-controller"));
var vacations_controller_1 = __importDefault(require("./6-controllers/vacations-controller"));
var auth_controller_1 = __importDefault(require("./6-controllers/auth-controller"));
var followers_controller_1 = __importDefault(require("./6-controllers/followers-controller"));
var expressServer = (0, express_1.default)();
expressServer.use((0, cors_1.default)());
// Rate Limit
expressServer.use("/api/", (0, express_rate_limit_1.default)({
    windowMs: 1000,
    max: 10,
    message: "Are you a hacker?"
}));
expressServer.use(express_1.default.json());
// Sanitize
expressServer.use(sanitize_1.default);
// Insert received files into request.files object:
expressServer.use((0, express_fileupload_1.default)());
expressServer.use("/api", users_controller_1.default);
expressServer.use("/api", vacations_controller_1.default);
expressServer.use("/api/auth", auth_controller_1.default);
expressServer.use("/api/", followers_controller_1.default);
expressServer.use(express_1.default.static(path_1.default.join(__dirname, "./7-frontend")));
expressServer.use("*", function (request, response, next) {
    if (config_1.default.isDevelopment) {
        var err = new errors_model_1.RouteNotFoundError(request.method, request.originalUrl);
        next(err);
    }
    else {
        response.sendFile(path_1.default.join(__dirname, "./7-frontend/index.html"));
    }
});
expressServer.use(catch_all_1.default);
var httpServer = expressServer.listen(config_1.default.port, function () { return console.log("Listening..."); });
socket_logic_1.default.init(httpServer);
