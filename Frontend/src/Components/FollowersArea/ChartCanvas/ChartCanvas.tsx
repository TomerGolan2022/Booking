import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import VacationModel from '../../../Models/VacationModel';
import "./ChartCanvas.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface ChartCanvasProps {
    vacations: VacationModel[];
}

function ChartCanvas(props: ChartCanvasProps): JSX.Element {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Followers Chart',
            },
        },
    };

    // Vacation location (axis y): 
    const labels = props.vacations.map(v => v.location);

    // Vacation followers (axis y):
    const data = {
        labels,
        datasets: [
            {
                label: 'Followers',
                data: props.vacations.map(v => v.followers),
                backgroundColor: 'blueviolet',
            }
        ],
    };

    return (
        <div className="ChartCanvas">

            <Bar options={options} data={data} />

        </div>
    );

}

export default ChartCanvas;
