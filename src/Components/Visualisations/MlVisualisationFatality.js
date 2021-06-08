import React, { useState, useEffect } from "react";
import axios from "axios";
import BarChartML from "./BarChartML";

export default function MlVisFatality() {
  const [visdata5, setVisdata5] = useState([]);
  const [loading, setLoading] = useState(true);

  const all_landslide_categories = ["mudslide","rock_fall","complex","debris_flow","other","riverbank_collapse","snow_avalanche","translational_slide","earth_flow","creep"];
    
    useEffect(()=>{
        setLoading(true);
        for (let i=0;i<all_landslide_categories.length;i++){
            console.log(all_landslide_categories[i]);
        axios
        .post("http://localhost:5000/fatalitypred", {
          location_accuracy: "5km",
          landslide_category: all_landslide_categories[i],
          landslide_trigger: "downpour",
          landslide_size: "large",
          landslide_setting: "unknown",
          country_name: "United States",
          admin_division_population: 36619.0,
          longitude: -122.663,
          latitude: 45.42,
        })
        .then((data_response) => {
          console.log("data_response: ", data_response);
          setVisdata5(visdata5 => [...visdata5,
            {
                "landslide_category": all_landslide_categories[i],
                "fatality_count":parseFloat(data_response.data[0])
            }
          ]);
          console.log("visdata5 inside: ", visdata5);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
        }
    },[])
    
  let fatalityBarChart;
  if (loading === false && visdata5 && visdata5 !== null) {
    fatalityBarChart = <BarChartML data={visdata5} />;
  }

  return (
    <div
      className="Visualisations"
      style={{ backgroundColor: "white", height: "500px", marginTop: "6.5vh" }}
    >
    {console.log("$$$$$$$$$$$$")}
    {console.log(JSON.stringify(visdata5))}
      {fatalityBarChart}
    </div>
  );
}
