import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import { ForbiddenError } from "../4-models/errors-model";
import Role from "../4-models/role-model";

async function verifyUser(request: Request, response: Response, next: NextFunction) {

    try {
        await cyber.verifyToken(request);
        const role = cyber.getTokenRole(request);
        if(role !== Role.User) {
            const err = new ForbiddenError("You are the Admin!");
            next(err);
        }
        next();
    }
    catch (err: any) {
        next(err);
    }

}

export default verifyUser;