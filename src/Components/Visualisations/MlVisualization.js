import React from "react";
import axios from "axios";
import LineChart from "./LineChart"


export default function MlVis() {
    const [visdata4, setVisdata4] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
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

        getRainfallPred()
        //setLoading(false);
      }, []);

      let fthLineChart;
  if(loading===false && visdata4&& visdata4!==null){
    fthLineChart= (<LineChart data={visdata4}/>)
  }
  return (
    <div className="Visualisations" style={{ height: 400, marginTop:'6.5vh' }}>
     
      {fthLineChart}
      
    </div>
  );
}