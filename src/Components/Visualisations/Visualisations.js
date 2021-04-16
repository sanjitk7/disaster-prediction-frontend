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

const temp = [{"lanslide_trigger":"downpour","fatality_count":15131},{
  "lanslide_trigger":"tropical_cyclone","fatality_count":2590},
  {"lanslide_trigger":"rain","fatality_count":2773},
  {"lanslide_trigger":"unknown","fatality_count":524},
  {"lanslide_trigger":"monsoon","fatality_count":615},
  {"lanslide_trigger":"continuous_rain","fatality_count":3111},
  {"lanslide_trigger":"flooding","fatality_count":138},
  {"lanslide_trigger":"mining","fatality_count":210},
  {"lanslide_trigger":"no_apparent_trigger","fatality_count":6},
  {"lanslide_trigger":"earthquake","fatality_count":386},
  {"lanslide_trigger":"snowfall_snowmelt","fatality_count":415},
  {"lanslide_trigger":"construction","fatality_count":71},
  {"lanslide_trigger":"freeze_thaw","fatality_count":22}
]

const temp2 = [
  {
    "country": "AD",
    "hot dog": 165,
    "hot dogColor": "hsl(126, 70%, 50%)",
    "burger": 130,
    "burgerColor": "hsl(212, 70%, 50%)",
    "sandwich": 133,
    "sandwichColor": "hsl(274, 70%, 50%)",
    "kebab": 164,
    "kebabColor": "hsl(157, 70%, 50%)",
    "fries": 193,
    "friesColor": "hsl(173, 70%, 50%)",
    "donut": 23,
    "donutColor": "hsl(269, 70%, 50%)"
  },
  {
    "country": "AE",
    "hot dog": 193,
    "hot dogColor": "hsl(96, 70%, 50%)",
    "burger": 192,
    "burgerColor": "hsl(147, 70%, 50%)",
    "sandwich": 146,
    "sandwichColor": "hsl(274, 70%, 50%)",
    "kebab": 58,
    "kebabColor": "hsl(271, 70%, 50%)",
    "fries": 96,
    "friesColor": "hsl(129, 70%, 50%)",
    "donut": 75,
    "donutColor": "hsl(251, 70%, 50%)"
  }]

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
      <BarChart data={temp1}/>
    </div>
  );
}

export default Visualisations;
