import React , {useState, useEffect} from "react";
import axios from "axios";
import { Input, Button, Select } from 'antd';
import {
    MapContainer,
    TileLayer,
    LayersControl,
    GeoJSON,
    ScaleControl,
    CircleMarker,
    MapConsumer,
} from 'react-leaflet';
import L from "leaflet";
import icon from './icon';
import MyMarker from './earthquakeMarker';
import { tectonicPlatesStyle, tileLayers } from '../Earthquake/constants';
import BarChart from "./BarChartEarth";
import {
    create_object,
    obj_to_array_of_obj,
    get_attribute_from_json,
  } from "../../utils/visualisation_utils";
import { Marker } from "react-simple-maps";
const { Option } = Select;
export default function EarthquakePred(){
    const [visdata4, setVisdata4] = useState([]);
    const[eventType, setEventType]= useState('earthquake');
    const[lat,setlat]= useState(51.505);
    const[long,setlong]= useState(-0.09);
    const[rms,setrms]= useState();
    const[depth,setdepth]= useState();
    const[depthError,setdepthError]= useState();
    const[locationSource,setlocationSource]= useState("ci");
    const[magSource,setmagSource]= useState("ci");
    const[shortPlace,setshortPlace]= useState("CA");
    const [loading, setLoading] = useState(true);
    const [earthMagMarker, setEarthMagMarker] =useState([])
    let optionsChoice = ['earthquake','quarry blast','explosion','ice quake','other event']
    let locChoice=["ci","hv","ak","nc","us","pr","nn","ok","mb","tx","uw","av","uu","nm","se"]
    let magChoice=["ci","hv","ak","nc","us","pr","nn","ok","mb","tx","uw","av","uu","nm","guc","se"]
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
    useEffect(()=>{
        console.log('STATE CHANGE: ',lat,long)
    },[lat,long])
    const pointVals = [
        [50, 2],
        [45, -10]
      ];
      const pointMode = {
        
        control: {
          values: pointVals,
          onClick: point =>
            console.log("I've just been clicked on the map!", point),
          onRemove: point =>
            console.log("I've just been clicked for removal :(", point)
        }
      };
      const circleMode = {
        banner: false
      };
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
        else if(type ==='depth'){
            setdepth(event.target.value)
        }
        else if(type ==='deptherror'){
            setdepthError(event.target.value)
        }
    }
     const labels = ["predData","value"]
     const circleMarkerColor = (magnitude)=> {
        return magnitude <= 1
            ? '#5b0a91'
            : magnitude > 1 && magnitude <= 2
            ? '#a8005b'
            : magnitude > 2 && magnitude <= 3
            ? '#ff6600'
            : magnitude > 3 && magnitude <= 5
            ? '#dc1c13'
            : magnitude > 5 && magnitude <= 7
            ? '#0514f0'
            : '#000000';
    };
     useEffect(()=>{
        console.log('THIS STATE HAS CHANGED: ',earthMagMarker)  
     },[earthMagMarker])
     
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
            "shortPlace": shortPlace,
            "depth":depth,
            "depthError":depthError
        }).then((data_response)=>{
          console.log("data_response: ",(data_response.data));
          let fColor = circleMarkerColor(data_response.data)
            let newObj = {
                "Magnitude":data_response.data,
                "locations":[lat,long],
                "color":fColor
            }
          
          console.log(newObj);
          let newArr = [...earthMagMarker]
          newArr.push(newObj)
          setEarthMagMarker(newArr)
       
    
            
          
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
      const getClickPos=(event)=>{
          console.log('I AM AT POSITION: ',event)
      }

    let marker;
    useEffect(()=>{
        marker = <Marker position={[lat,long]}/>
    },[lat,long])
    return (
        <div className="Visualisations" style={{ backgroundColor:'white' , height: '500px', paddingLeft:"20px", paddingRight:"30px", paddingTop:"30px", marginTop:'6.5vh' }}>
        <table>
            <tr>
                <td style={{paddingRight:"30px"}}>
                <h3>Select Event type</h3>
        <Select
                labelInValue
                defaultValue={{ value:'earthquake' }}
                style={{ width: "20vw" }}
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
       
        <Input placeholder="RMS" onChange={event=>oneChange(event,'rms')}/><br/><br/>
        <Input placeholder="Depth" onChange={event=>oneChange(event,'depth')}/><br/><br/>
        <Input placeholder="Depth Error" onChange={event=>oneChange(event,'deptherror')}/><br/><br/>
        <Button type='primary' onClick={submitHandler}>SUBMIT</Button><br/><br/>
                </td>
                <td>
                < MapContainer center={[0, 0]} zoom={3} whenReady={(map) => {
        console.log(map);
        map.target.on("click", function (e) {
          const { lat, lng } = e.latlng;
          console.log(lat,lng);
          setlat(lat)
          setlong(lng)
          L.marker([lat, lng]);
        });
        
      }} style={{ height:"50vh", width:"75vw"}}>
     
       <LayersControl position="topright">
                {tileLayers.map(({ id, name, attribution, url, checked }) => (
                    <LayersControl.BaseLayer
                        key={id}
                        name={name}
                        checked={checked}>
                        <TileLayer attribution={attribution} url={url} />
                    </LayersControl.BaseLayer>
                ))}
           
            </LayersControl>
            <MapConsumer>
            {(map) => {
          console.log("map center:", map.getCenter());
          map.on("click", function (e) {
            const { lat, lng } = e.latlng;
            L.marker([lat, lng],{icon}).addTo(map);
          });
          return null;
        }}
             
            </MapConsumer>
            <MyMarker data={earthMagMarker} />
    </MapContainer>
                </td>
            </tr>
        </table>
    </div>
    )
}