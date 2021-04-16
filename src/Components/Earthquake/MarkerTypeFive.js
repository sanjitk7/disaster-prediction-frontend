import React from 'react';

function markerFive(magnitude,color){
    let size= (magnitude*25).toString()+"px";
      const markerStyle = {
        backgroundColor: color,
        color: "grey",
        display: "flex",
        justifyContent: "center",
        width: {size},
        height: {size},
        borderRadius: {size},
        weight:0.5,
        opacity:1,
        alignItems: "center"
      };
      return (<div style={markerStyle}>Marker</div>);
}

  
export default markerFive;