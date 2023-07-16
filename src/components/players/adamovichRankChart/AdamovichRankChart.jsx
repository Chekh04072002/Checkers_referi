import React, { useEffect, useState } from 'react';
import { fetchByIDs, fetchHandler, formatDate } from '../../../utils/utils';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const AdamovichRankChart = ({playerID}) => {
    const [playerStats, setPlayerStats] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [lineChartData, setLineChartData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                label: 'Рейтинг Адамовича',
                borderColor: '#8a6adb',
                fill: true,
                lineTension: 0.5,
            },
        ],
    });

    const chartOptions = {
        scales: {
            x: {
                display: false,
                title: {
                    display: true,
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: '',
                },
                grid: {
                    color: 'gray',
                },
            },
        },
        title: {
            display: true,
            text: 'Рейтинг Адамовича',
            fontSize: 20,
        },
        plugins: {
            legend: {
                display: true, 
                labels: {
                    boxWidth: 0,
                },
            },
        },
    }

    const fetchPlayerStats = () => {
        fetchHandler(
            `player-stats?playerID=${playerID}`,
            (data) => setPlayerStats(data),
            () => null,
            (error) => console.error(error)
        )
    }

    const fetchTournaments = () => {
        const tournamentsIDs = playerStats.map(stat => stat.tournamentID);

        fetchByIDs(
            tournamentsIDs,
            'tournaments',
            (data) => setTournaments(data),
            () => null,
            (error) => console.error(error)
        )
    }

    const prepareChartLabeles = () => {
        return tournaments.map(tournament => {
            if(!tournament) return '';

            const startDate = formatDate(tournament.startDate);
            const endDate = formatDate(tournament.endDate);

            return `Турнир: ${tournament.title} \nДата: ${startDate}-${endDate}`
        });
    }

    const createChartData = () => {
        const labels = prepareChartLabeles();
        const adamovichRanks = playerStats.map(stat => stat.lastAdamovichRank);

        setLineChartData({
            ...lineChartData,
            labels,
            datasets: [{
                ...lineChartData.datasets[0],
                data: adamovichRanks
            }]
        });
    }

    useEffect(fetchPlayerStats, []);
    useEffect(fetchTournaments, [playerStats]);

    useEffect(createChartData, [tournaments]);

    return (
        <div>
            {
                lineChartData.labels.length > 0
                ? (
                    <Line
                    type="line"
                    width={160}
                    height={40}
                    options={chartOptions}
                    data={lineChartData}
                    />
                )
                : null
            }
        </div>
    )
}

export default AdamovichRankChart