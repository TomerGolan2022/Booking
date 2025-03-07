import { OkPacket } from "mysql";
import { v4 as uuid } from "uuid";
import dal from "../2-utils/dal";
import { ResourceNotFoundError, ValidationError } from "../4-models/errors-model";
import VacationModel from "../4-models/vacation-model"
import socketLogic from "../5-logic/socket-logic";

// Get vacations by userId: 
async function getVacationsByUser(userId: number): Promise<VacationModel[]> {
    const sql = `SELECT vacations.vacationId ,
                 vacations.location,
                 vacations.description,
                 DATE_FORMAT(vacations.fromDate, '%Y-%m-%d') AS fromDate,
                 DATE_FORMAT(vacations.untilDate, '%Y-%m-%d') AS untilDate,
                 vacations.price,
                 vacations.imageName,
                 EXISTS(SELECT * FROM followers WHERE vacations.vacationId = followers.vacationId AND userId=${userId}) AS isFollowing,
                 COUNT(followers.userId) AS followers
                 FROM vacations
                 LEFT JOIN followers
                 ON vacations.vacationId=followers.vacationId 
                 GROUP BY vacations.vacationId
                 ORDER BY isFollowing DESC, followers DESC
                 `;
    const vacationsByUser = await dal.execute(sql);
    return vacationsByUser;
}

// Get all vacations: 
async function getAllVacations(): Promise<VacationModel[]> {
    const sql = `SELECT vacations.vacationId ,
                 vacations.location,
                 vacations.description,
                 DATE_FORMAT(vacations.fromDate, '%Y-%m-%d') AS fromDate,
                 DATE_FORMAT(vacations.untilDate, '%Y-%m-%d') AS untilDate,
                 vacations.price,
                 vacations.imageName,
                 COUNT(followers.userId) AS followers
                 FROM vacations
                 LEFT JOIN followers
                 ON vacations.vacationId=followers.vacationId 
                 GROUP BY vacations.vacationId
                 ORDER BY followers DESC
                 `;
    const vacations = await dal.execute(sql);
    return vacations;
}

// Get one vacation: 
async function getOneVacation(vacationId: number): Promise<VacationModel> {
    const sql = `SELECT vacations.vacationId ,
                 vacations.location,
                 vacations.description,
                 DATE_FORMAT(vacations.fromDate, '%Y-%m-%d') AS fromDate,
                 DATE_FORMAT(vacations.untilDate, '%Y-%m-%d') AS untilDate,
                 vacations.price,
                 vacations.imageName,
                 COUNT(followers.userId) AS followers
                 FROM vacations
                 LEFT JOIN followers
                 ON vacations.vacationId=followers.vacationId
                 WHERE vacations.vacationId=?;
                `;
    const vacations = await dal.execute(sql, vacationId);
    const vacation = vacations[0];
    if (!vacation) {
        throw new ResourceNotFoundError(vacationId);
    }
    return vacation;
}

// Add one Vacation: 
async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    const errors = vacation.validatePost();
    if (errors) {
        throw new ValidationError(errors);
    }
    // Handling image:
    if (vacation.image) {
        // Generate unique name with original extension: 
        const dotIndex = vacation.image.name.lastIndexOf(".");
        const extension = vacation.image.name.substring(dotIndex);
        vacation.imageName = uuid() + extension; // a3c0807a-c034-4370-854d-55612c954d83.png / 741cb7c1-422f-4476-a456-b692b2e880b8.jpg
        // Save in disk: 
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
        // Don't return back image file: 
        delete vacation.image;
    }
    const sql = `INSERT INTO vacations(location, description, imageName, fromDate, untilDate, price)
                 VALUES(?, ?, ?, ?, ?, ?)`;
    const values = [vacation.location, vacation.description, vacation.imageName, vacation.fromDate, vacation.untilDate, vacation.price];
    const result: OkPacket = await dal.execute(sql, values);
    vacation.vacationId = result.insertId;

    const addedVacation = await getOneVacation(vacation.vacationId);
    socketLogic.reportAddVacation(addedVacation);

    return addedVacation;
}

// Update full vacation: 
async function updateFullVacation(vacation: VacationModel): Promise<VacationModel> {
    const errors = vacation.validatePut();
    if (errors) {
        throw new ValidationError(errors);
    }
    // Handling image: 
    if (vacation.image) {
        // Generate unique name with original extension: 
        const dotIndex = vacation.image.name.lastIndexOf(".");
        const extension = vacation.image.name.substring(dotIndex);
        vacation.imageName = uuid() + extension; // a3c0807a-c034-4370-854d-55612c954d83.png / 741cb7c1-422f-4476-a456-b692b2e880b8.jpg
        // Save in disk: 
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
        // Don't return back image file: 
        delete vacation.image;
    }
    const sql = `UPDATE vacations SET 
                 location = ?,
                 description = ?,
                 imageName = ?,
                 fromDate = ?,
                 untilDate = ?,
                 price = ?
                 WHERE vacationId = ?`;
    const values = [vacation.location, vacation.description, vacation.imageName, vacation.fromDate, vacation.untilDate, vacation.price, vacation.vacationId]
    const result: OkPacket = await dal.execute(sql, values);

    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(vacation.vacationId);
    }
    // return updated vacation:
    const updatedVacation = await getOneVacation(vacation.vacationId);
    return updatedVacation;
}

// Update partial vacation: 
async function updatePartialVacation(vacation: VacationModel): Promise<VacationModel> {
    const errors = vacation.validatePatch();
    if (errors) {
        throw new ValidationError(errors);
    }
    const dbVacation = await getOneVacation(vacation.vacationId);
    for (const prop in dbVacation) {
        // Save the props if we send new props (apart from image):
        if (vacation[prop] !== undefined) {
            dbVacation[prop] = vacation[prop];
        }
        // Save the image if we send new image:
        if (vacation.image !== undefined) {
            dbVacation.image = vacation.image;
        }
    }
    const updatedVacation = await updateFullVacation(new VacationModel(dbVacation));
    // Report via socket.io an existing vacation has been updated by the admin: 
    socketLogic.reportUpdateVacation(updatedVacation);
    return updatedVacation;
}

// Delete vacation:
async function deleteVacation(id: number): Promise<void> {
    const sql = `DELETE FROM vacations WHERE vacationId = ?`;
    const result = await dal.execute(sql, id);
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(id);
    }
    // Report via socket.io an existing vacation has been deleted by the admin: 
    socketLogic.reportDeleteVacation(id);
}

export default {
    getVacationsByUser,
    getAllVacations,
    getOneVacation,
    addVacation,
    updateFullVacation,
    updatePartialVacation,
    deleteVacation
};