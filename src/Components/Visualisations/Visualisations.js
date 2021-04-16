import React from "react";
import BarChart from "./BarChart"
import PieChart from "./PieChart"
import ScatterPlot from "./ScatterPlot"
import funcComp from '../RainfallViz/RainfallViz';

import { get_fatality_trigger, get_countrywise_fatality, get_population_fatality } from "../../utils/controller_utils"

function Visualisations() {
  const [visdata, setVisdata] = React.useState();
  const [visdata2, setVisdata2] = React.useState();
  const [visdata3, setVisdata3] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setVisdata(get_fatality_trigger());
    setVisdata2(get_countrywise_fatality());
    setVisdata3(get_population_fatality());
    setLoading(false);
  }, []);

  return (
    <div className="Visualisations" style={{ height: 400 }}>
      {!loading ? console.log(visdata) : "none"}
      {console.log(JSON.stringify(visdata))}
      {console.log(JSON.stringify(visdata2))}
      {console.log(JSON.stringify(visdata3))}
      <BarChart data={visdata}/>
      <PieChart data={visdata2}/>
      <ScatterPlot data={visdata3}/>
      {funcComp}
    </div>
  );
}

export default Visualisations;
