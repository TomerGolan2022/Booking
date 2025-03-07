import VacationModel from "../Models/VacationModel";

// 1. Vacations State - The global state relate to Vacations:
export class VacationsState {
    public vacationsByUser: VacationModel[] = [];
}

// 2. vacations Action Type - list of actions we can do on the above VacationsState:
export enum VacationsActionType {
    FetchAllVacationsByUser = "FetchAllVacationsByUser",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation"
}

// 3. Vacation Action - interface for building a single action from the above VacationsActionType
export interface VacationsAction {
    type: VacationsActionType; // The type of the acton to perform.
    payload: any; // The data we need to do that action
}

// 4. Action Creators - Functions for creating suitable Action objects: 
export function fetchAllVacationsByUserAction(vacations: VacationModel[]): VacationsAction {
    const action: VacationsAction = { type: VacationsActionType.FetchAllVacationsByUser, payload: vacations };
    return action;
}

export function addVacationAction(vacation: VacationModel): VacationsAction {
    const action: VacationsAction = { type: VacationsActionType.AddVacation, payload: vacation };
    return action;
}
export function updateVacationAction(Vacation: VacationModel): VacationsAction {
    const action: VacationsAction = { type: VacationsActionType.UpdateVacation, payload: Vacation };
    return action;
}
export function deleteVacationAction(id: number): VacationsAction {
    const action: VacationsAction = { type: VacationsActionType.DeleteVacation, payload: id };
    return action;
}

// 5. Vacations Reducer - Do any of the above actions:
export function vacationsReducer(currentState: VacationsState = new VacationsState(), action: VacationsAction): VacationsState {
    const newState = { ...currentState };

    switch (action.type) {

        case VacationsActionType.FetchAllVacationsByUser:
            newState.vacationsByUser = action.payload; // <-- here payload is all Vacations
            break;

        case VacationsActionType.AddVacation:
            newState.vacationsByUser.push(action.payload); // <-- here payload is the Vacation to add.
            break;

        case VacationsActionType.UpdateVacation:
            const indexToUpdate = newState.vacationsByUser.findIndex(v => v.vacationId === action.payload.vacationId); // <-- here payload is the Vacation to update.
            if (indexToUpdate >= 0) {
                newState.vacationsByUser[indexToUpdate] = action.payload;
            }
            break;

        case VacationsActionType.DeleteVacation:
            const indexToDelete = newState.vacationsByUser.findIndex(v => v.vacationId === action.payload); // <-- here payload is the id to delete.
            if (indexToDelete >= 0) {
                newState.vacationsByUser.splice(indexToDelete, 1);
            }
            break;

    }

    return newState;
}

