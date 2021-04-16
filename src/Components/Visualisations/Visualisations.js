import React from "react";
import BarChart from "./BarChart"

import {
  parse_float,
  get_attribute,
  create_object,
  obj_to_array_of_obj,
  get_attribute_from_json,
} from "../../utils/visualisation_utils";
import landslide_data from "../../data/landslide_json.json";

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
  const fatality_vs_trigger_vis = obj_to_array_of_obj(trigger_vs_fatality, [
    "landslide_trigger",
    "fatality_count",
  ]);
  console.log("fatality_vs_trigger_vis: ", fatality_vs_trigger_vis);

  return fatality_vs_trigger_vis;
};

function Visualisations() {
  const [visdata, setVisdata] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setVisdata(get_fatality_trigger());
    setLoading(false);
  }, []);

  return (
    <div className="Visualisations" style={{ height: 400 }}>
      {!loading ? console.log(visdata) : "none"}
      {console.log(JSON.stringify(visdata))}
      <BarChart data={visdata}/>
    </div>
  );
}

export default Visualisations;
