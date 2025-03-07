import express, { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyAdmin from "../3-middleware/verify-admin";
import VacationModel from "../4-models/vacation-model";
import { RouteNotFoundError } from "../4-models/errors-model";
import vacationsLogic from "../5-logic/vacations-logic";

const router = express.Router();

// GET http://localhost:3001/api/vacations-by-user/26
router.get("/vacations-by-user/:userId([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        const vacationsByUser = await vacationsLogic.getVacationsByUser(userId);
        response.json(vacationsByUser);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/vacations
router.get("/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationsLogic.getAllVacations();
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/vacations/7 <-- id
router.get("/vacations/:id([0-9]+)", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const vacation = await vacationsLogic.getOneVacation(id);
        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/vacations
router.post("/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Take image from request into the body: 
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addedVacation = await vacationsLogic.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT http://localhost:3001/api/vacations/7 <-- id
router.put("/vacations/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Take ID from request into the body: 
        request.body.vacationId = +request.params.id;
        // Take image from request into the body: 
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationsLogic.updateFullVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// PATCH http://localhost:3001/api/vacations/7 <-- id
router.patch("/vacations/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Take ID from request into the body: 
        request.body.vacationId = +request.params.id;
        // Take image from request into the body: 
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationsLogic.updatePartialVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:3001/api/vacations/7 <-- id
router.delete("/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await vacationsLogic.deleteVacation(id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/vacations//images/ <-- Display images
router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {

        const imageName = request.params.imageName;

        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);

        if (!fs.existsSync(absolutePath)) {
            throw new RouteNotFoundError(request.method, request.originalUrl);
        }

        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});


export default router;