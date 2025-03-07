import express, { NextFunction, Request, Response } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyUser from "../3-middleware/verify-user";
import FollowerModel from "../4-models/follower-model";
import followersLogic from "../5-logic/followers-logic";

const router = express.Router();

// GET http://localhost:3001/api/followers
router.get("/followers", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const followers = await followersLogic.getAllFollowers();
        response.json(followers);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/followers
router.post("/followers", verifyUser, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const follower = new FollowerModel(request.body);
        const newFollower = await followersLogic.follow(follower);
        response.status(201).json(newFollower);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:3001/api/followers/7 <-- followerId
router.delete("/followers/:followerId([0-9]+)", verifyUser, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const followerId = +request.params.followerId
        await followersLogic.unFollow(followerId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});



export default router;