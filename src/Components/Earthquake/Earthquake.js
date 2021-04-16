import React, {useEffect,useState} from 'react';
import {
    MapContainer,
    TileLayer,
    LayersControl,
    GeoJSON,
    ScaleControl,
    CircleMarker,
    Popup,
} from 'react-leaflet';
import { tectonicPlatesStyle, tileLayers } from './constants';
import tectonicPlates from './tectonicPlates.json';
import earthquakeData from './Earthquake.json';
import 'leaflet/dist/leaflet.css';
import {Select} from 'antd';
import MyMarker from './Markers';
const { Option } = Select;

export default function Earthquake(){
    //const tectonicPlatesData = 
    const [filterData, setFilterData] = useState(5)
    const [data,setData] = useState([])

    let circlesCmp;
    const getAllMarkers = (filterData)=>{
        let greaterFive = earthquakeData.filter(o=> o.mag>filterData)
        if(greaterFive.length>5000){

        }
        setData(greaterFive)

    }
    //console.log(greaterFive)
   
    useEffect(()=>{
        getAllMarkers(filterData)
        console.log(filterData)
    },[filterData])
    const children = [];
  for (let i = 0; i < 8; i++) {
    children.push(<Option value={i} key={i}>{i} Richter</Option>);
  }

  
  const changeHandler = event =>{
      console.log('Changing event: ',event);
      setFilterData(event);
  }
    return(
    <>
     <MapContainer center={[0, 0]} zoom={3} style={{height:"80vh", width:"100vw"}}>
     <LayersControl position="topright">
                {tileLayers.map(({ id, name, attribution, url, checked }) => (
                    <LayersControl.BaseLayer
                        key={id}
                        name={name}
                        checked={checked}>
                        <TileLayer attribution={attribution} url={url} />
                    </LayersControl.BaseLayer>
                ))}
                <LayersControl.Overlay name="Tectonic Plates">
                    <GeoJSON
                        data={tectonicPlates}
                        style={tectonicPlatesStyle}
                    />
                </LayersControl.Overlay>
            </LayersControl>
            <MyMarker data={data} fData={filterData}/>
           
    </MapContainer>

    <Select  size='large' defaultValue='5' onChange={changeHandler} style={{ width: 200 }}>
              {children}
    </Select>
    </>
    )
} 