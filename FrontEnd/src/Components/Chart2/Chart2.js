import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale,
} from "chart.js";
import { Bar, Line ,Radar } from "react-chartjs-2";
ChartJS.register(
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
);



export default function Chart2({ data, options ,type }) {
  
  return (<div className=" mb-5">
    {type=== 'Bar'?<Bar options={options} data={data} />: type=== 'Radar'? <Radar  data={data} />:<Line options={options} data={data} />}
  </div>)
}
