import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { fetchAllVacationsByUserAction, addVacationAction, updateVacationAction, deleteVacationAction} from "../Redux/VacationsState";
import store from "../Redux/Store";
import config from "../Utils/Config";

class VacationsService {

    // Get vacations by userId: 
    public async getVacationsByUserId(userId: number): Promise<VacationModel[]> {
        let vacationsByUser = store.getState().vacationsState.vacationsByUser;
        if (vacationsByUser.length === 0) {
            const response = await axios.get<VacationModel[]>(config.vacationsByUserUrl + userId);
            vacationsByUser = response.data;
            store.dispatch(fetchAllVacationsByUserAction(vacationsByUser));
        }
        return vacationsByUser;
    }

    // Get one vacation by vacationId and userId: 
    public async getOneVacation(vacationId: number, userId: number): Promise<VacationModel> {
        const vacations = await this.getVacationsByUserId(userId);
        const vacation = vacations.find(v => v.vacationId === vacationId);
        return vacation;
    }

    // Add new vacation:
    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        // For sending data + files we need to send FormData object
        const formData = new FormData();
        formData.append("location", vacation.location);
        formData.append("description", vacation.description);
        formData.append("fromDate", vacation.fromDate);
        formData.append("untilDate", vacation.untilDate);
        formData.append("price", vacation.price);
        formData.append("image", vacation.image.item(0));
        // Send formData and Add:
        const response = await axios.post<VacationModel>(config.vacationsUrl, formData);
        const addedVacation = response.data;
        store.dispatch(addVacationAction(addedVacation));
        return addedVacation;
    }

    // Update existing vacation:
    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        const formData = new FormData();
        formData.append("location", vacation.location);
        formData.append("description", vacation.description);
        formData.append("fromDate", vacation.fromDate);
        formData.append("untilDate", vacation.untilDate);
        formData.append("price", vacation.price);
        formData.append("image", vacation.image.item(0));
        // Send formData and Update:
        const response = await axios.patch<VacationModel>(config.vacationsUrl + vacation.vacationId, formData);
        const updatedVacation = response.data;
        store.dispatch(updateVacationAction(updatedVacation));
        return updatedVacation;
    }

    // Delete existing vacation by vacationId: 
    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete(config.vacationsUrl + vacationId);
        store.dispatch(deleteVacationAction(vacationId));
    }

}

const vacationsService = new VacationsService();

export default vacationsService;

