import React from "react";
import BarChart from "./BarChart"
import PieChart from "./PieChart"
import funcComp from '../RainfallViz/RainfallViz';
import {
  parse_float,
  get_attribute,
  create_object,
  obj_to_array_of_obj,
  get_attribute_from_json,
} from "../../utils/visualisation_utils";
import landslide_data from "../../data/landslide_json.json";

const temp = [
  {
    "id": "java",
    "label": "java",
    "value": 107,
    "color": "hsl(168, 70%, 50%)"
  },
  {
    "id": "css",
    "label": "css",
    "value": 288,
    "color": "hsl(336, 70%, 50%)"
  },
  {
    "id": "php",
    "label": "php",
    "value": 315,
    "color": "hsl(95, 70%, 50%)"
  },
  {
    "id": "erlang",
    "label": "erlang",
    "value": 291,
    "color": "hsl(359, 70%, 50%)"
  },
  {
    "id": "c",
    "label": "c",
    "value": 406,
    "color": "hsl(191, 70%, 50%)"
  }
]

const get_fatality_trigger = () => {
  // get arrays of landslide_trigger, fatality_count and landslide_size attributes
  const landslide_trigger = get_attribute_from_json(
    landslide_data,
    "landslide_trigger"
  );
  const fatality_count = get_attribute_from_json(
    landslide_data,
    "fatality_count"
  );
  const landslide_size = get_attribute_from_json(
    landslide_data,
    "landslide_size"
  );

  console.log("landslide_trigger: ", landslide_trigger);
  console.log("fatality_count: ", fatality_count);
  console.log("landslide_size ", landslide_size);

  // create object with key value pairs of x and y coordinates
  const trigger_vs_fatality = create_object(landslide_trigger, fatality_count);
  console.log("trigger_vs_fatality_notreduced: ", trigger_vs_fatality);

  // create array of objects required for visualisation
  const labels1 = ["landslide_trigger","fatality_count"]
  console.log("## : ",labels1)
  const fatality_vs_trigger_vis = obj_to_array_of_obj(trigger_vs_fatality, labels1);
  console.log("fatality_vs_trigger_vis: ", fatality_vs_trigger_vis);

  return fatality_vs_trigger_vis;
};

const get_countrywise_fatality = ()=>{
  const countries = get_attribute_from_json(
    landslide_data,
    "country_name"
  );
  const fatality_count = get_attribute_from_json(
    landslide_data,
    "fatality_count"
  );
  // create object with key value pairs of x and y coordinates
  const country_vs_fatality = create_object(countries, fatality_count);
  console.log("trigger_vs_fatality_notreduced: ", country_vs_fatality);

  // create array of objects required for visualisation

  var country_vs_fatality_vis = obj_to_array_of_obj(country_vs_fatality, [
    "label",
    "value",
  ]);
  console.log("country_vs_fatality: ",country_vs_fatality_vis);
  // add id field

  for (let i=0;i<country_vs_fatality_vis.length;i++){
    country_vs_fatality_vis[i]["id"] = country_vs_fatality_vis[i].label
  }
  console.log("country_vs_fatality: ",country_vs_fatality_vis);
  return country_vs_fatality_vis;

}

function Visualisations() {
  const [visdata, setVisdata] = React.useState();
  const [visdata2, setVisdata2] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setVisdata(get_fatality_trigger());
    setVisdata2(get_countrywise_fatality());
    setLoading(false);
  }, []);

  return (
    <div className="Visualisations" style={{ height: 400 }}>
      {!loading ? console.log(visdata) : "none"}
      {console.log(JSON.stringify(visdata))}
      {console.log(JSON.stringify(visdata2))}
      <BarChart data={visdata}/>
      <PieChart data={visdata2}/>
      {funcComp}
    </div>
  );
}

export default Visualisations;
