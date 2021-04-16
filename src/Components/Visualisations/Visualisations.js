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

  const temp = [{"id":"rainfall","data":[{"x":"month_1","y":49.2},{"x":"month_2","y":87.1}]},{"x":"month_3","y":0}]


  
  React.useEffect(() => {
    setVisdata(get_fatality_trigger());
    setVisdata2(get_countrywise_fatality());
    setVisdata3(get_population_fatality()); 
  }, []);
 
  return (
    <div className="Visualisations" style={{ height: 400, marginTop:'6.5vh' }}>
 
      {console.log(JSON.stringify(visdata))}
      {console.log(JSON.stringify(visdata2))}
      {console.log(JSON.stringify(visdata3))}
 
      <BarChart data={visdata} />
      <PieChart data={visdata2} />
      {/* <ScatterPlot data={visdata3} /> */}
      {/* <BumpPlot data={temp}/> */}

      
    </div>
  );
}

export default Visualisations;
