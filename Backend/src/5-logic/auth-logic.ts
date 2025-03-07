import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";
import UserModel from "../4-models/user-model";
import Role from "../4-models/role-model";
import CredentialModel from "../4-models/credentials-model";
import { ResourceNotFoundError, UnauthorizedError, ValidationError } from "../4-models/errors-model";
import usersLogic from "../5-logic/users-logic";

// Register 
async function register(user: UserModel): Promise<UserModel> {
    // Joi Validation:
    const errors = user.validatePost();
    if (errors) {
        throw new ValidationError(errors);
    }
    // Unique Username Validation:
    if (await isNameExist(user.username)) {
        throw new ValidationError(`The username '${user.username}' exists`);
    }
    // Change to Hash password before saving in db:
    user.password = cyber.hash(user.password);
    // Add role:
    user.role = Role.User;
    // Add to Database:
    const sql = `INSERT INTO users(firstName, lastName, username, password, role)
                 VALUES(?, ?, ?, ?, ?)`;
    const values = [user.firstName, user.lastName, user.username, user.password, user.role];
    const result: OkPacket = await dal.execute(sql, values);
    user.userId = result.insertId;
    // Delete password before returning user: 
    delete user.password;
    return user;
}

// Login
async function login(credentials: CredentialModel): Promise<any> {
    // Get all users:
    const users = await usersLogic.getAllUsers();
    // Change to Hash password before comparing to db:
    credentials.password = cyber.hash(credentials.password);
    // Check credentials:
    const user = users.find(u => u.username === credentials.username && u.password === credentials.password);
    // If user not exist 
    if (!user) {
        throw new UnauthorizedError("Incorrect username or password");
    }
    // Generate token
    const token = cyber.getNewToken(user);
    // Return the token
    return token;
}

// Validation:
async function isNameExist(username: string): Promise<boolean> {
    const sql = `SELECT EXISTS(SELECT * FROM users WHERE username = ?) as isExists`;
    const values = [username];
    const result = await dal.execute(sql, values);
    const isExists = result[0].isExists;
    return isExists === 1;
}

export default {
    register,
    login
};