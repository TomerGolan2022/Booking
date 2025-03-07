import { Server as HttpServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";
import FollowerModel from "../4-models/follower-model";
import VacationModel from "../4-models/vacation-model";

let socketServer: SocketServer;

function init(httpServer: HttpServer): void {
    // Create socket server: 
    socketServer = new SocketServer(httpServer, { cors: { origin: "*" } });
    // Listen to clients connection: 
    socketServer.sockets.on("connection", (socket: Socket) => {
        console.log("Client has been connected...");
    });
}

// Reporting a new vacation added by the admin:
function reportAddVacation(vacation: VacationModel): void {
    socketServer.sockets.emit("admin-added-vacation", vacation);
}

// Reporting a vacation updated by the admin:
function reportUpdateVacation(vacation: VacationModel): void {
    socketServer.sockets.emit("admin-updated-vacation", vacation);
}

// Reporting a vacation deleted by the admin:
function reportDeleteVacation(id: number): void {
    socketServer.sockets.emit("admin-deleted-vacation", id);
}

// Reporting a vacation followed by the user:
function reportAllVacations(vacations: VacationModel[]): void {
    socketServer.sockets.emit("change-order-by-vacations-list", vacations);
}

// Reporting a vacation followed by the user:
function reportFollowVacation(follower: FollowerModel): void {
    socketServer.sockets.emit("user-follow-vacation", follower);
}

// Reporting a vacation followed by the user:
function reportUnFollowVacation(followerId: number): void {
    socketServer.sockets.emit("user-un-follow-vacation", followerId);
}

export default {
    init,
    reportAddVacation,
    reportUpdateVacation,
    reportDeleteVacation,
    reportAllVacations,
    reportFollowVacation,
    reportUnFollowVacation
};
