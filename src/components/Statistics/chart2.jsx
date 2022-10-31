import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  export const options = {
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: 'top',
      },
      
     
      
    },
  };

  
function Chart2 (props)  {
    return (
            <div>  
            <h2>Total Expenses For Each Category</h2>      
            <Line options={options} data={props.data}  />
            </div>

    );
  };
  
  export default Chart2;