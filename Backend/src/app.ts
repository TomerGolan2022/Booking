import express, { NextFunction, Request, Response } from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import path from "path";
import expressRateLimit from "express-rate-limit";
import config from "./2-utils/config";
import catchAll from "./3-middleware/catch-all";
import sanitize from "./3-middleware/sanitize"
import { RouteNotFoundError } from "./4-models/errors-model";
import socketLogic from "./5-logic/socket-logic";
import usersController from "./6-controllers/users-controller";
import vacationsController from "./6-controllers/vacations-controller";
import authController from "./6-controllers/auth-controller";
import followersController from "./6-controllers/followers-controller";

const expressServer = express();
expressServer.use(cors());
// Rate Limit
expressServer.use("/api/", expressRateLimit({
    windowMs: 1000,
    max: 10,
    message: "Are you a hacker?"
}));
expressServer.use(express.json());
// Sanitize
expressServer.use(sanitize);
// Insert received files into request.files object:
expressServer.use(expressFileUpload());
expressServer.use("/api", usersController);
expressServer.use("/api", vacationsController);
expressServer.use("/api/auth", authController);
expressServer.use("/api/", followersController);
expressServer.use(express.static(path.join(__dirname, "./7-frontend")));

expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
    if (config.isDevelopment) {
        const err = new RouteNotFoundError(request.method, request.originalUrl);
        next(err);
    }
    else {
        response.sendFile(path.join(__dirname, "./7-frontend/index.html"));
    }
});

expressServer.use(catchAll);

const httpServer = expressServer.listen(config.port, () => console.log("Listening..."));

socketLogic.init(httpServer);



