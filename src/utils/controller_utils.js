import {
  create_object,
  obj_to_array_of_obj,
  get_attribute_from_json,
} from "./visualisation_utils";
import landslide_data from "../data/landslide_json.json";

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
  const labels1 = ["landslide_trigger", "fatality_count"];
  console.log("## : ", labels1);
  const fatality_vs_trigger_vis = obj_to_array_of_obj(
    trigger_vs_fatality,
    labels1
  );
  console.log("fatality_vs_trigger_vis: ", fatality_vs_trigger_vis);

  return fatality_vs_trigger_vis;
};

const get_countrywise_fatality = () => {
  const countries = get_attribute_from_json(landslide_data, "country_name");
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
  console.log("country_vs_fatality: ", country_vs_fatality_vis);
  // add id field

  for (let i = 0; i < country_vs_fatality_vis.length; i++) {
    country_vs_fatality_vis[i]["id"] = country_vs_fatality_vis[i].label;
  }
  console.log("country_vs_fatality: ", country_vs_fatality_vis);
  return country_vs_fatality_vis;
};

const get_population_fatality = () => {

    var population_vs_fatality_vis =[{"data":[]},{"data":[]},{"data":[]}];
    for (let i=0;i<landslide_data.length;i++){
      if (landslide_data[i].landslide_size==="small"){
        population_vs_fatality_vis[0]["id"] = landslide_data[i]["landslide_size"]
        population_vs_fatality_vis[0]["data"].push({"x": parseFloat(1*landslide_data[i]["fatality_count"]),"y":landslide_data[i]["admin_division_population"]})
      } else if (landslide_data[i].landslide_size==="medium"){
        population_vs_fatality_vis[1]["id"] = landslide_data[i]["landslide_size"]
        population_vs_fatality_vis[1]["data"].push({"x":parseFloat(1*landslide_data[i]["fatality_count"]),"y":landslide_data[i]["admin_division_population"]})
      } else if (landslide_data[i].landslide_size==="large"){
        population_vs_fatality_vis[2]["id"] = landslide_data[i]["landslide_size"]
        population_vs_fatality_vis[2]["data"].push({"x":parseFloat(1*landslide_data[i]["fatality_count"]),"y":landslide_data[i]["admin_division_population"]})
      } 
    }
    console.log("from inside pop fat: ",population_vs_fatality_vis);
    return population_vs_fatality_vis;

}

export { get_fatality_trigger, get_countrywise_fatality, get_population_fatality };
