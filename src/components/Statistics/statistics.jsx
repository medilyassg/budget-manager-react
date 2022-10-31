import Chart1 from "./chart1";
import Chart2 from "./chart2";
import styles from './statistics.module.css'
function Statistics  (props) {
    return (
        props.isactive ?
        <div className={styles.chartszone}>
            <Chart1 data={props.datac1}/>

            <Chart2 data={props.datac2}/>

        </div>
        :""
    );
};

export default Statistics;










