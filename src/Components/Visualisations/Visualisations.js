import React from "react";
// import {
//   XYPlot,
//   VerticalGridLines,
//   HorizontalGridLines,
//   YAxis,
//   XAxis,
//   HorizontalBarSeries,
// } from "react-vis";
import { ResponsiveBar } from "@nivo/bar";
import {
    parse_float,
    get_attribute,
    create_object,
    obj_to_array_of_obj} from "../../utils/visualisation_utils"
    
import CSVReader from "react-csv-reader";


function Visualisations() {
  const [visdata, setVisdata] = React.useState([]);
  const [loading, setLoading] = React.useState(true);



  //   setData(temp_data);
  const getFileData = (data, fileInfo) => {
    setVisdata(data);
    console.log("data: ", data);
    console.log("data_length: ", data.length);
    console.log("file_info: ", fileInfo);

    const landslide_trigger = get_attribute(data, 3);
    const landslide_size = get_attribute(data, 4);
    const fatality_count = get_attribute(data, 6);
    const fatality_count_float = parse_float(fatality_count);
    console.log("landslide_trigger: ", landslide_trigger);
    console.log("fatality_count: ", fatality_count);
    // console.log('fatality_count_float: ',fatality_count_float);

    const trigger_vs_fatality = create_object(
      landslide_trigger,
      fatality_count
    );

    console.log("trigger_vs_fatality_notreduced: ", trigger_vs_fatality);
    const fatality_vs_trigger_vis = obj_to_array_of_obj(trigger_vs_fatality, [
      "landslide_trigger",
      "fatality_count",
    ]);
    console.log("fatality_vs_trigger_vis: ", fatality_vs_trigger_vis);

    setVisdata(fatality_vs_trigger_vis)
    setLoading(false)

    console.log("Data: ",visdata);
  };

  return (
    <div className="Visualisations" style={{height:400}}>
      <CSVReader
        onFileLoaded={(data, fileInfo) => getFileData(data, fileInfo)}
      />
    {!loading ? console.log(visdata): "none"}
      {/* <ResponsiveBar
        data={data}
        keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "food",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      /> */}

      <div></div>
    </div>
  );
}

export default Visualisations;
