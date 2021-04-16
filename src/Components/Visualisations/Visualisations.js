import React from "react";
import axios from "axios";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import ScatterPlot from "./ScatterPlot";
import LineChart from "./LineChart"
import BumpPlot from "./BumpPlot";


import {
  get_fatality_trigger,
  get_countrywise_fatality,
  get_population_fatality,
} from "../../utils/controller_utils";

function Visualisations() {
  const [visdata, setVisdata] = React.useState();
  const [visdata2, setVisdata2] = React.useState();
  const [visdata3, setVisdata3] = React.useState();
  const [visdata4, setVisdata4] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const temp = [{"id":"rainfall","data":[{"x":"month_1","y":49.2},{"x":"month_2","y":87.1}]},{"x":"month_3","y":0}]


  const getRainfallPred = ()=>{
    setLoading(true)
    axios.post("http://localhost:5000/rainfallpred", {
      first_month: 49.2,
      second_month: 87.1,
      third_month: 29.2,
    }).then((data_response)=>{
      console.log("data_response: ",data_response);
      setVisdata4([{"id":"rainfall","data":[{"x":"month_1","y":49.2},{"x":"month_2","y":87.1},{"x":"month_3","y":29.2},{"x":"month_4","y":data_response.data}]}])
      console.log("visdata4 inside: ",visdata4);
      setLoading(false)
    }).catch((err)=>{
      console.log(err)
      setLoading(false)
    });
  }
  React.useEffect(() => {
    setVisdata(get_fatality_trigger());
    setVisdata2(get_countrywise_fatality());
    setVisdata3(get_population_fatality());
    getRainfallPred()
    //setLoading(false);
  }, []);
  let fthLineChart;
  if(loading===false && visdata4&& visdata4!==null){
    fthLineChart= (<LineChart data={visdata4}/>)
  }
  return (
    <div className="Visualisations" style={{ height: 400 }}>
      {!loading ? console.log(visdata) : "none"}
      {console.log(JSON.stringify(visdata))}
      {console.log(JSON.stringify(visdata2))}
      {console.log(JSON.stringify(visdata3))}
      {console.log(visdata4)}
      <BarChart data={visdata} />
      <PieChart data={visdata2} />
      {/* <ScatterPlot data={visdata3} /> */}
      {/* <BumpPlot data={temp}/> */}
      {fthLineChart}
      
    </div>
  );
}

export default Visualisations;
