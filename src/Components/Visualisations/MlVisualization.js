import React , {useState, useEffect} from "react";
import axios from "axios";
import LineChart from "./LineChartRainfall"
import { Input, Button } from 'antd';

export default function MlVis() {
    const [visdata4, setVisdata4] = useState([]);
    const [loading, setLoading] = useState(true);

    const [monthOne, setMonthOne]= useState()
    const [monthTwo, setMonthTwo]= useState()
    const [monthThree, setMonthThree]= useState()

    const getRainfallPred = ()=>{
        setLoading(true)
        axios.post("http://localhost:5000/rainfallpred", {
          first_month: 49.2,
          second_month: 87.1,
          third_month: 29.2,
        }).then((data_response)=>{
          console.log("data_response: ",data_response);
          setVisdata4([{"id":"rainfall","data":[{"x":"month_1","y":parseFloat(monthOne)},{"x":"month_2","y":parseFloat(monthTwo)},{"x":"month_3","y":parseFloat(monthThree)},{"x":"month_4","y":parseFloat(data_response.data)*100}]}])
          console.log("visdata4 inside: ",visdata4);
          setLoading(false)
        }).catch((err)=>{
          console.log(err)
          setLoading(false)
        });
      }

      /*useEffect(() => {

        getRainfallPred()
        //setLoading(false);
      }, []);*/

      let fthLineChart;
  if(loading===false && visdata4&& visdata4!==null){
    fthLineChart= (<LineChart data={visdata4}/>)
  }

  const monthOneChange = event =>{
      console.log(event.target.value);
      setMonthOne(event.target.value)
  }
  const monthTwoChange = event =>{
    console.log(event.target.value);
    setMonthTwo(event.target.value)
}
const monthThreeChange = event =>{
    console.log(event.target.value);
    setMonthThree(event.target.value)
}
const submitHandler = event =>{
    getRainfallPred()
}
  return (
    <div className="Visualisations" style={{ backgroundColor:'white' , height: '500px', paddingLeft:"20px", paddingRight:"30px", paddingTop:"30px", marginTop:'6.5vh' }}>
    <div>
    <h3>Month 1: </h3><Input placeholder="Month One Rainfall" onChange={event=>monthOneChange(event)}/>
    <h3>Month 2: </h3><Input placeholder="Month Two Rainfall" onChange={event=>monthTwoChange(event)}/>
    <h3>Month 3: </h3><Input placeholder="Month Three Rainfall" onChange={event=>monthThreeChange(event)}/><br/><br/>
    <Button type='primary' onClick={submitHandler}>SUBMIT</Button><br/><br/>
    </div>
  
      {fthLineChart}
   
    
    </div>
  );
}