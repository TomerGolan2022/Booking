import express, { NextFunction, Request, Response } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyAdmin from "../3-middleware/verify-admin";
import UserModel from "../4-models/user-model";
import CredentialModel from "../4-models/credentials-model";
import authLogic from "../5-logic/auth-logic";

const router = express.Router();

// POST http://localhost:3001/api/register
router.post("/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Create user object
        const user = new UserModel(request.body);
        // Register
        const token = await authLogic.register(user);
        // Return token
        response.status(201).json(token);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/login
router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Create credentials object
        const credentials = new CredentialModel(request.body);
        // Login
        const token = await authLogic.login(credentials);
        // Return token
        response.json(token);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;