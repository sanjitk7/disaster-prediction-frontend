import React from 'react';
import {withRouter} from 'react-router-dom';
import {
    CircleMarker,
    Popup,
} from 'react-leaflet';
const MyMarker=(props) =>{
    const circleMarkerColor = (magnitude)=> {
        return magnitude <= 1
            ? '#00b800'
            : magnitude > 1 && magnitude <= 2
            ? '#b6fe00'
            : magnitude > 2 && magnitude <= 3
            ? '#f6ff00'
            : magnitude > 3 && magnitude <= 5
            ? '#ffcf00'
            : magnitude > 5 && magnitude <= 7
            ? '#ff9000'
            : '#ff0000';
    };
    let mydata = props.data
    let filteredData = props.fData
    let fColor = circleMarkerColor(filteredData)
    let circlesCmp = mydata.map(event=>(
        <CircleMarker
            fillColor={fColor}
            color={"grey"}
            weight={0.5}
            opacity={1}
            radius={event.mag*2.5}
            center={[event.latitude, event.longitude]}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </CircleMarker>
    
    ))

    return(circlesCmp)

}


export default withRouter(MyMarker);








/*const circleMarkerColor = (magnitude)=> {
    return magnitude <= 1
        ? '#00b800'
        : magnitude > 1 && magnitude <= 2
        ? '#b6fe00'
        : magnitude > 2 && magnitude <= 3
        ? '#f6ff00'
        : magnitude > 3 && magnitude <= 5
        ? '#ffcf00'
        : magnitude > 5 && magnitude <= 7
        ? '#ff9000'
        : '#ff0000';
};

const geojsonMarkerOptions = (magnitude)=> {
    //console.log('magnitude: ',magnitude)
    return {
        radius: 2.5 * parseFloat(magnitude),
        fillColor: circleMarkerColor(parseFloat(magnitude)),
        color: 'grey',
        weight: 0.5,
        opacity: 1,
        fillOpacity: 0.8
    };
};



export { circleMarkerColor, geojsonMarkerOptions };
*/