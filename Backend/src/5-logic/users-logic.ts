import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import UserModel from "../4-models/user-model";
import { ResourceNotFoundError, ValidationError } from "../4-models/errors-model";

// Get all users: 
async function getAllUsers(): Promise<UserModel[]> {
    const sql = `SELECT * FROM users`;
    const users = await dal.execute(sql);
    return users;
}

// Get one user: 
async function getOneUser(id: number): Promise<UserModel> {
    const sql = `SELECT * FROM users
                WHERE userId = ?`;
    const values = [id];
    const users = await dal.execute(sql, values);
    const user = users[0];
    if (!user) {
        throw new ResourceNotFoundError(id);
    }
    return user;
}

// Update full user: 
async function updateFullUser(user: UserModel): Promise<UserModel> {
    const errors = user.validatePut();
    if (errors) {
        throw new ValidationError(errors);
    }
    const sql = `UPDATE users SET 
                 firstName = ?,
                 lastName = ?,
                 username = ?,
                 password = ?,
                 role = ?
                 WHERE userId = ?`;
    const result: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.username, user.password, user.role, user.userId]);
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(user.userId);
    }
    return user;
}

// Update partial user: 
async function updatePartialUser(user: UserModel): Promise<UserModel> {
    const errors = user.validatePatch();
    if (errors) {
        throw new ValidationError(errors);
    }
    const dbUser = await getOneUser(user.userId);
    for (const prop in dbUser) {
        if (user[prop] !== undefined) {
            dbUser[prop] = user[prop];
        }
    }
    const updatedUser = await updateFullUser(new UserModel(dbUser));
    return updatedUser;
}

// Delete user:
async function deleteUser(id: number): Promise<void> {
    const sql = `DELETE FROM users WHERE userId = ?`;
    const result = await dal.execute(sql, id);
    if (result.affectedRows === 0) {
        throw new ResourceNotFoundError(id);
    }
}

export default {
    getAllUsers,
    getOneUser,
    updateFullUser,
    updatePartialUser,
    deleteUser
};