import React from "react";
import {
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  YAxis,
  XAxis,
  HorizontalBarSeries,
} from "react-vis";
import CSVReader from 'react-csv-reader'

// Average Purchase Size for Each Product

function Avg() {
  const [data, setData] = React.useState();
  const temp_data = [
    {
      y: "G0001",
      x: 200,
    },
    {
      y: "B0002",
      x: 100,
    },
    {
      y: "L0006",
      x: 0,
    },
  ];
  
//   React.useEffect(() => {
//     setData(temp_data);
// }, [])
  
//   setData(temp_data);

  const getFileData = (data, fileInfo)=>{
    console.log('DATA: ', data);
    console.log('DATA LENGTH: ', data.length);
    console.log('FILE INFO: ', fileInfo);
    setData(data);
  }

  return (
    <div className="Avg">

        <CSVReader onFileLoaded={(data, fileInfo) => getFileData(data, fileInfo)} />
    
      <div>Average Purchase Size vs Product</div>
      <XYPlot height={300} width={1200} color="#285104" yType="ordinal">
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis
          title="Purchase Size (in Bags i.e 150 Kgs)"
          style={{
            line: { stroke: "#000000" },
            ticks: { stroke: "#ADDDE1" },
            text: { stroke: "none", fill: "#6b6b76", fontWeight: 1000 },
          }}
        />
        <YAxis
          style={{
            line: { stroke: "#000000" },
            ticks: { stroke: "#ADDDE1" },
            text: { stroke: "none", fill: "#6b6b76", fontWeight: 1000 },
          }}
        />
        <YAxis
          orientation="right"
          title="Product Specific Code"
          style={{
            line: { stroke: "#ADDDE1" },
            ticks: { stroke: "#ADDDE1" },
            text: { stroke: "none", fill: "#6b6b76", fontWeight: 1000 },
          }}
        />
        {<HorizontalBarSeries barWidth={0.5} data={temp_data} />}
      </XYPlot>
    </div>
  );
}

export default Avg;
