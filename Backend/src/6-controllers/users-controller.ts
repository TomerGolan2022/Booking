import express, { NextFunction, Request, Response } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyAdmin from "../3-middleware/verify-admin";
import UserModel from "../4-models/user-model";
import usersLogic from "../5-logic/users-logic";

const router = express.Router();

// GET http://localhost:3001/api/users
router.get("/users", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users = await usersLogic.getAllUsers();
        response.json(users);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/users/7 <-- id
router.get("/users/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const user = await usersLogic.getOneUser(id);
        response.json(user);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT http://localhost:3001/api/users/7 <-- id
router.put("/users/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.userId = +request.params.id;
        const user = new UserModel(request.body);
        const updatedUser = await usersLogic.updateFullUser(user);
        response.json(updatedUser);
    }
    catch (err: any) {
        next(err);
    }
});

// PATCH http://localhost:3001/api/users/7 <-- id
router.patch("/users/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.id = +request.params.id;
        const user = new UserModel(request.body);
        const updatedUser = await usersLogic.updatePartialUser(user);
        response.json(updatedUser);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:3001/api/users/7 <-- id
router.delete("/users/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await usersLogic.deleteUser(id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;