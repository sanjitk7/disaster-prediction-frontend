import React from 'react';
import {withRouter} from 'react-router-dom';
import {
    CircleMarker,
    Popup,
} from 'react-leaflet';
const MyMarker=(props) =>{
    
    let mydata = props.data
    let circlesCmp = mydata.map(event=>(

        <CircleMarker
            fillColor={console.log('color: ',event.color),event.color}
            color={"grey"}
            weight={0.5}
            opacity={event.Magnitude*1.5}
            onMouseOver={(e) => {
                e.target.openPopup();
              }}
              onMouseOut={(e) => {
                e.target.closePopup();
              }}
     
            radius={console.log('RADIUS: ',event.Magnitude*15), event.Magnitude*1}
            center={[event.locations[0], event.locations[1]]}
          >
            <Popup>
              The Magnitude of this Earthquake will be {mydata.Magnitude}.
            </Popup>
            
          </CircleMarker>
    
    ))

    return(circlesCmp)

}


export default withRouter(MyMarker);




