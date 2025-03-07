import { io, Socket } from "socket.io-client";
import VacationModel from "../Models/VacationModel";
import { addVacationAction, updateVacationAction, deleteVacationAction, fetchAllVacationsByUserAction} from "../Redux/VacationsState";
import { followAction, unFollowAction } from "../Redux/FollowersState";
import store from "../Redux/Store";
import FollowerModel from "../Models/FollowerModel";
import config from "../Utils/Config";

class SocketService {

    private socket: Socket;

    public connect(): void {
        this.socket = io(config.port);
        this.listen();
    }

    private listen(): void {

        // Listen to adding by admin: 
        this.socket.on("admin-added-vacation", (vacation: VacationModel) => {
            store.dispatch(addVacationAction(vacation));
        });

        // Listen to updating by admin: 
        this.socket.on("admin-updated-vacation", (vacation: VacationModel) => {
            store.dispatch(updateVacationAction(vacation));
        });

        // Listen to deleting by admin: 
        this.socket.on("admin-deleted-vacation", (id: number) => {
            store.dispatch(deleteVacationAction(id));
        });

        // Listen to change order by Vacations List: 
        this.socket.on("change-order-by-vacations-list", (vacations: VacationModel[]) => {
            store.dispatch(fetchAllVacationsByUserAction(vacations));
        });

        // Listen to following by user: 
        this.socket.on("user-follow-vacation", (follower: FollowerModel) => {
            store.dispatch(followAction(follower));
        });

          // Listen to Un following by user: 
          this.socket.on("user-un-follow-vacation", (followerId: number) => {
            store.dispatch(unFollowAction(followerId));
        });
           
    }

    public disconnect(): void {
        this.socket.disconnect();
    }

}

const socketService = new SocketService();

export default socketService;