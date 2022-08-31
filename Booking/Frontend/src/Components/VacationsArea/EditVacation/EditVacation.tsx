import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import config from "../../../Utils/Config";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    const params = useParams();
    const navigate = useNavigate();
    const { register, setError, handleSubmit, formState, setValue } = useForm<VacationModel>();
    const [stateVacation, setVacation] = useState<VacationModel>();

    const date = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const vacationId: number = +params.prodId;
        const userId = authService.getUserId();

        vacationsService.getOneVacation(vacationId, userId)
            .then(vacationToEdit => {
                setVacation(vacationToEdit);
                setValue("location", vacationToEdit.location);
                setValue("description", vacationToEdit.description);
                setValue("fromDate", vacationToEdit.fromDate);
                setValue("untilDate", vacationToEdit.untilDate);
                setValue("price", vacationToEdit.price);
            })
            .catch(err => notifyService.error(err));

    }, []);

    async function send(formVacation: VacationModel) {
        try {
            if (formVacation.fromDate < date) {
                return setError("fromDate", { type: "focus", message: "From date cannot be less than today date." },
                    { shouldFocus: true })
            }
            if (formVacation.fromDate > formVacation.untilDate) {
                return setError("untilDate", { type: "focus", message: "Until date cannot be less than from date." },
                    { shouldFocus: true })
            }
            formVacation.vacationId = stateVacation.vacationId;
            const updatedVacation = await vacationsService.updateVacation(formVacation);
            // notifyService.success(`Vacation "${updatedVacation.location}" successfully updated! `);
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="EditVacation Box">

            <NavLink to="/vacations/">🔙</NavLink>

            <h2>Edit Vacation</h2>

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
                <input type="file" accept="image/*" {...register("image")} />
                <img src={config.vacationImagesUrl + stateVacation?.imageName} />

                <button>Update</button>

            </form>

        </div>
    );
}

export default EditVacation;
