import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['VS', 'BBW', 'TCP', 'AE', 'Adidas'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(1, 75, 160, 1)',
        'rgba(10, 92, 184, 1)',
        'rgba(20, 102, 195, 1)',
        'rgba(33, 116, 212, 1)',
        'rgba(59, 142, 237, 1)',
      ],
      borderColor: [
        'rgba(1, 75, 160, 1)',
        'rgba(10, 92, 184, 1)',
        'rgba(20, 102, 195, 1)',
        'rgba(33, 116, 212, 1)',
        'rgba(59, 142, 237, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export default function DoughnutChart() {
  return <Doughnut data={data} />;
}
