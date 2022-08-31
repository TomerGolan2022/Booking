import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import CredentialsModel from "../../../Models/CredentialsModel";
import "./Register.css";

function Register(): JSX.Element {

    const navigate = useNavigate();

    const { register, handleSubmit, formState } = useForm<UserModel>();

    async function send(user: UserModel) {
        try {
            // Register:
            await authService.register(user);
            // Login after Register:
            const credentials = new CredentialsModel();
            credentials.username = user.username;
            credentials.password = user.password;
            await authService.login(credentials);
            // Message:
            // notifyService.success(`Hello ${credentials.username} You have been successfully registered and logged-in.`);
            // Navigate:
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Register Box">

            <h2>Register</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>First name: </label>
                <input type="text" {...register("firstName", {
                    required: { value: true, message: "Please enter your first name." },
                    minLength: { value: 3, message: "Sorry, that first name is too short." },
                    maxLength: { value: 50, message: "Sorry, that first name is too long." }
                })} />
                <span>{formState.errors.firstName?.message}</span><br/>

                <label>Last name: </label>
                <input type="text" {...register("lastName", {
                    required: { value: true, message: "Please enter your last name." },
                    minLength: { value: 3, message: "Sorry, that last name is too short." },
                    maxLength: { value: 50, message: "Sorry, that last name is too long." }
                })} />
                <span>{formState.errors.lastName?.message}</span><br/>

                <label>Username: </label>
                <input type="text" {...register("username", {
                    required: { value: true, message: "Please enter your username." },
                    minLength: { value: 3, message: "Sorry, that username is too short." },
                    maxLength: { value: 50, message: "Sorry, that username is too long." }
                })} />
                <span>{formState.errors.username?.message}</span><br/>

                <label>Password: </label>
                <input type="password" {...register("password", {
                    required: { value: true, message: "Please enter your password." },
                    minLength: { value: 3, message: "Sorry, that password is too short." },
                    maxLength: { value: 50, message: "Sorry, that password is too long." }
                })} />
                <span>{formState.errors.password?.message}</span><br/>

                <button>Register</button>

                <p>Already have an account? <NavLink to="/login">Sign In</NavLink></p>

            </form>

        </div>
    );
}

export default Register;
