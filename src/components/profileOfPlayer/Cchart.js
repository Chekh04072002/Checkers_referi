import React from 'react';
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
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Cchart = ({ arr }) => {
  // console.log(arr);
  const lineChartData = {
    labels: arr,
    // labels: [
    //   '05.05.2022 1 место',
    //   '07.05.2022 1 место',
    //   '09.05.2022 1 место',
    //   '05.05.2022 1 место',
    //   '07.05.2022 1 место',
    //   '09.05.2022 1 место',
    // ],
    datasets: [
      {
        data: [121, 256, 456, 345, 234, 564],
        label: 'Рейтинг Адамовича',
        borderColor: '#3333ff',
        // hoverBackgroundColor: '#3333ff',
        // hoverBorderColor: '#3333ff',
        fill: true,
        lineTension: 0.5,
      },
    ],
  };

  return (
    <Line
      type="line"
      width={160}
      height={40}
      options={{
        scales: {
          x: {
            display: false, // Отображение по шкале x
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
            display: true, // Убрал название
            labels: {
              boxWidth: 0,
            },
          },
        },
      }}
      data={lineChartData}
    />
  );
};
export default Cchart;
