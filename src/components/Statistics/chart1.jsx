import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
export const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'left',
      },
     
    },
  };

  
  function Chart1 (props) {
    return (
        <div >
            <h2> Rate By Category</h2>

        <Pie data={props.data} options={options} />
        </div>
    );
  };
  
  export default Chart1;