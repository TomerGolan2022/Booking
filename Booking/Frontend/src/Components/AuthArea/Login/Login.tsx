import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm<CredentialsModel>();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            // notifyService.success(`Hello ${credentials.username} You have been successfully logged-in.`);
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login Box">

            <h2>Login</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Username: </label>
                <input type="text" {...register("username", {
                    required: { value: true, message: "Please enter your username." }
                })} />
                <span>{formState.errors.username?.message}</span><br />

                <label>Password: </label>
                <input type="password" {...register("password", {
                    required: { value: true, message: "Please enter your password." }
                })} />
                <span>{formState.errors.password?.message}</span><br />

                <button>Login</button>

                <p>New to Booking? <NavLink to="/register" className={"register"}>Sign up</NavLink> </p>

            </form>

        </div>
    );
}

export default Login;
