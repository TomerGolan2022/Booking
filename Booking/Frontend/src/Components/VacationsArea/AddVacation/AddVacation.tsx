import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    const navigate = useNavigate();

    const { register, setError, handleSubmit, formState } = useForm<VacationModel>();

    const date = new Date().toISOString().split('T')[0];

    async function send(vacation: VacationModel) {
        try {
            if (vacation.fromDate < date) {
                return setError("fromDate", { type: "focus", message: "From date cannot be less than today date." },
                    { shouldFocus: true })
            }
            if (vacation.fromDate > vacation.untilDate) {
                return setError("untilDate", { type: "focus", message: "Until date cannot be less than from date." },
                    { shouldFocus: true })
            }
            const addedVacation = await vacationsService.addVacation(vacation);
            // notifyService.success(`Vacation "${addedVacation.location}" successfully added!`);
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="AddVacation Box">

            {/* <NavLink to="/vacations">🔙</NavLink> */}

            <h2>New Vacation</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Location: </label>
                <input type="text" {...register("location", {
                    required: { value: true, message: "Location is a required field." },
                    minLength: { value: 3, message: "Sorry, that location is too short." },
                    maxLength: { value: 50, message: "Sorry, that location is too long." }
                })} />
                <span>{formState.errors.location?.message}</span><br />

                <label>Description: </label>
                <textarea {...register("description", {
                    required: { value: true, message: "Description is a required field." },
                    minLength: { value: 3, message: "Sorry, that description is too short." },
                    maxLength: { value: 100, message: "Sorry, that description is too long." }
                })} />
                <span>{formState.errors.description?.message}</span><br />

                <label>From Date: </label>
                <input type="Date" {...register("fromDate", {
                    required: { value: true, message: "From date is a required field." }
                })} />
                <span>{formState.errors.fromDate?.message}</span><br />

                <label>Until Date: </label>
                <input type="Date" {...register("untilDate", {
                    required: { value: true, message: "Until date is a required field." }
                })} />
                <span>{formState.errors.untilDate?.message}</span><br />
                <label>Price: </label>
                <input type="number" {...register("price", {
                    required: { value: true, message: "Price is a required field." },
                    min: { value: 250, message: "Price must be greater than or equal to $250." },
                    max: { value: 3000, message: "Price must be less than or equal to $3,000." }
                })} />
                <span>{formState.errors.price?.message}</span><br />

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image", {
                    required: { value: true, message: "Image is a required field." }
                })} />
                <span>{formState.errors.image?.message}</span><br />

                <button>Add</button>

            </form>

        </div>
    );
}

export default AddVacation;
