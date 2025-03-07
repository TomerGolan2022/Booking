"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var socketServer;
function init(httpServer) {
    // Create socket server: 
    socketServer = new socket_io_1.Server(httpServer, { cors: { origin: "*" } });
    // Listen to clients connection: 
    socketServer.sockets.on("connection", function (socket) {
        console.log("Client has been connected...");
    });
}
// Reporting a new vacation added by the admin:
function reportAddVacation(vacation) {
    socketServer.sockets.emit("admin-added-vacation", vacation);
}
// Reporting a vacation updated by the admin:
function reportUpdateVacation(vacation) {
    socketServer.sockets.emit("admin-updated-vacation", vacation);
}
// Reporting a vacation deleted by the admin:
function reportDeleteVacation(id) {
    socketServer.sockets.emit("admin-deleted-vacation", id);
}
// Reporting a vacation followed by the user:
function reportAllVacations(vacations) {
    socketServer.sockets.emit("change-order-by-vacations-list", vacations);
}
// Reporting a vacation followed by the user:
function reportFollowVacation(follower) {
    socketServer.sockets.emit("user-follow-vacation", follower);
}
// Reporting a vacation followed by the user:
function reportUnFollowVacation(followerId) {
    socketServer.sockets.emit("user-un-follow-vacation", followerId);
}
exports.default = {
    init: init,
    reportAddVacation: reportAddVacation,
    reportUpdateVacation: reportUpdateVacation,
    reportDeleteVacation: reportDeleteVacation,
    reportAllVacations: reportAllVacations,
    reportFollowVacation: reportFollowVacation,
    reportUnFollowVacation: reportUnFollowVacation
};
