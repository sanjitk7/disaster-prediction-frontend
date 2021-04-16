import React , {useState, useEffect} from "react";
import axios from "axios";
import { Input, Button, Select } from 'antd';
import BarChart from "./BarChartEarth";
import {
    create_object,
    obj_to_array_of_obj,
    get_attribute_from_json,
  } from "../../utils/visualisation_utils";
const { Option } = Select;
export default function EarthquakePred(){
    const [visdata4, setVisdata4] = useState([]);
    const[eventType, setEventType]= useState('earthquake');
    const[lat,setlat]= useState();
    const[long,setlong]= useState();
    const[rms,setrms]= useState();
    const[locationSource,setlocationSource]= useState("ci");
    const[magSource,setmagSource]= useState("ci");
    const[shortPlace,setshortPlace]= useState("CA");
    const [loading, setLoading] = useState(true);
    let optionsChoice = ['earthquake','quarry blast','explosion','ice quake','other event']
    let locChoice=["ci","cf"]
    let magChoice=["ci","cf"]
    let shortPChoice=['CA',"CF"]
    let optionRen = optionsChoice.map(o=>(
        <Option value={o}>{o}</Option>
    ))
    let locRen = locChoice.map(o=>(
        <Option value={o}>{o}</Option>
    ))
    let magRen = magChoice.map(o=>(
        <Option value={o}>{o}</Option>
    ))
    let shortPRen = shortPChoice.map(o=>(
        <Option value={o}>{o}</Option>
    ))
    
    
    const handleSelectChange = (event, type)=>{
        console.log(event)
        if(type==='event'){
            setEventType(event.value)
        }
        else if(type ==='loc'){
            setlocationSource(event.value)
        }
        else if(type ==='mag'){
            setmagSource(event.value)
        }
        else if(type ==='short'){
            setshortPlace(event.value)
        }
        
    }

    const oneChange = (event, type)=>{
        if(type ==='lat'){
            setlat(event.target.value)
        }
        else if(type ==='long'){
            setlong(event.target.value)
        }
        else if(type ==='rms'){
            setrms(event.target.value)
        }
    }
    const labels = ["predData","value"]
    const getEathquakePred = ()=>{
        setLoading(true)
        axios.post("http://localhost:5000/magnitudepred", {
            "latitude": lat,
            "longitude": long,	
            "rms": rms,
            "type": eventType,
            "status": "automatic",
            "locationSource":locationSource,
            "magSource": magSource,
            "shortPlace": shortPlace
        }).then((data_response)=>{
          console.log("data_response: ",(data_response.data));
            let newObj = {
                "Magnitude":data_response.data[0],
                "Depth":data_response.data[1],
                "Depth Error":data_response.data[2],
            }
          let finObj = obj_to_array_of_obj(
            newObj,
            labels
          );
          setVisdata4(finObj)
          //setVisdata4([{"id":"rainfall","data":[{"x":"month_1","y":parseFloat(monthOne)},{"x":"month_2","y":parseFloat(monthTwo)},{"x":"month_3","y":parseFloat(monthThree)},{"x":"month_4","y":data_response.data}]}])
          //console.log("visdata4 inside: ",visdata4);
          setLoading(false)
        }).catch((err)=>{
          console.log(err)
          setLoading(false)
        });
      }
    const submitHandler = event =>{
        getEathquakePred()
    }
    let fthLineChart;
    if(loading===false && visdata4&& visdata4!==null){
        console.log(visdata4)
        fthLineChart= (<BarChart data={visdata4} />)
      }
    return (
        <div className="Visualisations" style={{ backgroundColor:'white' , height: '500px', paddingLeft:"20px", paddingRight:"30px", paddingTop:"30px", marginTop:'6.5vh' }}>
        <h3>Select Event type</h3>
        <Select
                labelInValue
                defaultValue={{ value:'earthquake' }}
                style={{ width: 120 }}
                onChange={event=>handleSelectChange(event,'event')}
        >
            {optionRen}
        </Select>
        <h3>Select location source</h3>
        <Select
                labelInValue
                defaultValue={{ value:'ci' }}
                style={{ width: 120 }}
                onChange={event=>handleSelectChange(event,'loc')}
        >
            {locRen}
        </Select>
        <h3>Select mag source</h3>
        <Select
                labelInValue
                defaultValue={{ value:'ci' }}
                style={{ width: 120 }}
                onChange={event=>handleSelectChange(event,'mag')}
        >
            {magRen}
        </Select>
        <h3>Select shortplace</h3>
        <Select
                labelInValue
                defaultValue={{ value:'CA' }}
                style={{ width: 120 }}
                onChange={event=>handleSelectChange(event,'short')}
        >
            {shortPRen}
        </Select><br/><br/>
        <Input placeholder="Latitude" onChange={event=>oneChange(event,'lat')}/><br/><br/>
        <Input placeholder="Longitude" onChange={event=>oneChange(event,'long')}/><br/><br/>
        <Input placeholder="RMS" onChange={event=>oneChange(event,'rms')}/><br/><br/>

        <Button type='primary' onClick={submitHandler}>SUBMIT</Button><br/><br/>
        {fthLineChart}
        </div>
    )
}