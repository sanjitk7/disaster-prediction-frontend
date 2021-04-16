import React, {useEffect, useState} from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import rainfallData from './RainfallData.json';
import { Checkbox,Select, Button } from 'antd';
import notification from './notification';
import 'antd/dist/antd.css';
const { Option } = Select;
const AllStates =[
    {
        "label":"West Rajasthan",
        "value":['RJ'],
        "key":1
    },
    {
        "label":"Vidarbha",
        "value":['MH'],
        "key":2
    },
    {
        "label":"Matathwada",
        "value":['MH'],
        "key":3
    },
    {
        "label":"East Rajasthan",
        "value":['RJ'],
        "key":4
    },
    {
        "label":"Saurashtra & Kutch",
        "value":['GJ'],
        "key":5
    },
    {
        "label":"East Uttar Pradesh",
        "value":['UP'],
        "key":6
    },
    {
        "label":"South Interior Karnataka",
        "value":['KA'],
        "key":7
    },
    
    {
        "label":"North Interior Karnataka",
        "value":['KA'],
        "key":8
    },
    
    {
        "label": "Gujarat Region",
        "value":['GJ'],
        "key":9
    },
   
    {
        "label": "Orissa",
        "value":['OR'],
        "key":10
    },
   
    {
        "label":"Naga Mani Mizo Tripura",
        "value":['TR','NL','MN','MZ'],
        "key":11
    },
    {
        "label":"Chhattisgarh",
        "value":['CT'],
        "key":12
    },
    
    {
        "label":"Konkan & Goa",
        "value":['GA','KA'],
        "key":13
    },
    
    {
        "label":"Jammu & Kashmir",
        "value":['JK'],
        "key":14
    },
    
    {
        "label":"Coastal Andhra Pradesh",
        "value":['AP'],
        "key":15
    },
    
    {
        "label":"Haryana Delhi & Chandigarh",
        "value":['HR','DL','CH'],
        "key":16
    },
    
    {
        "label":"Rayalseema",
        "value":['TG'],
        "key":17
    },
    {
        "label":"Kerala",
        "value":['KL'],
        "key":18
    },
    
    {
        "label":"Uttarakhand",
        "value":['UT'],
        "key":19
    },
    
    {
        "label": "Assam & Meghalaya",
        "value":['AS','ML'],
        "key":20
    },
    {
        "label":"Telangana",
        "value":['TG'],
        "key":21
    },
    
    {
        "label":"Sub Himalayan West Bengal & Sikkim",
        "value":['SK','WB'],
        "key":22
    },
    
    {
        "label":"West Uttar Pradesh",
        "value":['UP'],
        "key":23
    },
    
    {
        "label":"Gangetic West Bengal",
        "value":['WB'],
        "key":24
    },
    
    {
        "label":"Coastal Karnataka",
        "value":['KA'],
        "key":25
    },
    
    {
        "label":"Himachal Pradesh",
        "value":['HP'],
        "key":26
    },
    
    {
        "label":"Madhya Maharashtra",
        "value":['MH'],
        "key":27
    },
    
    {
        "label":"Tamil Nadu",
        "value":['TN'],
        "key":28
    },
    
    {
        "label":"West Madhya Pradesh",
        "value":['MH'],
        "key":29
    },
    
    {
        "label":"Jharkhand",
        "value":['JH'],
        "key":30
    },
    
    {
        "label":"Punjab",
        "value":['PB'],
        "key":31
    },
    
    {
        "label":"East Madhya Pradesh",
        "value":['MP'],
        "key":32
    },
    
    {
        "label":"Bihar",
        "value":['BR'],
        "key":33
    },
    
    {
        "label":"Lakshadweep",
        "value":['LD'],
        "key":34
    },
    
    {
        "label":"Andaman & Nicobar Islands",
        "value":['AN'],
        "key":35
    },
    
    {
        "label":"Arunachal Pradesh",
        "value":['AR'],
        "key":36
    }
   ]
    /*let initData = [
    { id: 'AP', state: 'Andhra Pradesh', value: 0 },
    { id: 'AR', state: 'Arunachal Pradesh', value: 0 },
    { id: 'AS', state: 'Assam', value: 0 },
    { id: 'BR', state: 'Bihar', value: 0 },
    { id: 'CT', state: 'Chhattisgarh', value: 0 },
    { id: 'GA', state: 'Goa', value: 0},
    { id: 'GJ', state: 'Gujarat', value:0},
    { id: 'HR', state: 'Haryana', value: 0 },
    { id: 'HP', state: 'Himachal Pradesh', value: 0 },
    { id: 'JH', state: 'Jharkhand', value: 0 },
    { id: 'KA', state: 'Karnataka', value: 0},
    { id: 'KL', state: 'Kerala', value: 0 },
    { id: 'MP', state: 'Madhya Pradesh', value: 0 },
    { id: 'MH', state: 'Maharashtra', value: 0 },
    { id: 'MN', state: 'Manipur', value: 0 },
    { id: 'ML', state: 'Meghalaya', value: 0 },
    { id: 'MZ', state: 'Mizoram', value: 0 },
    { id: 'NL', state: 'Nagaland', value: 0 },
    { id: 'OR', state: 'Odisha', value: 0},
    { id: 'PB', state: 'Punjab', value: 0 },
    { id: 'RJ', state: 'Rajasthan', value: 0 },
    { id: 'SK', state: 'Sikkim', value: 0 },
    { id: 'TN', state: 'Tamil Nadu', value: 0 },
    { id: 'TG', state: 'Telangana', value: 0 },
    { id: 'TR', state: 'Tripura', value: 0 },
    { id: 'UT', state: 'Uttarakhand', value: 0 },
    { id: 'UP', state: 'Uttar Pradesh', value: 0 },
    { id: 'WB', state: 'West Bengal', value: 0},
    { id: 'AN', state: 'Andaman and Nicobar Islands', value: 0 },
    { id: 'CH', state: 'Chandigarh', value: 0 },
    { id: 'DN', state: 'Dadra and Nagar Haveli', value: 0 },
    { id: 'DD', state: 'Daman and Diu', value: 0 },
    { id: 'DL', state: 'Delhi', value: 0 },
    { id: 'JK', state: 'Jammu and Kashmir', value: 0},
    { id: 'LA', state: 'Ladakh', value: 0 },
    { id: 'LD', state: 'Lakshadweep', value: 0 },
    { id: 'PY', state: 'Puducherry', value: 0}
  ];*/
export default function FuncComp(){
    const [data, setData] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [selectYear, setSelectYear]= useState(1901)
    const [allowSelection, setAllowSelection] = useState(true)

    useEffect(() => {
        console.log(selectYear)
        if(selectYear!==null){
            setAllowSelection(false);
        }
    },[selectYear])


  let initData = []
  
    const INDIA_TOPO_JSON = require('./India.topo.json');

    const PROJECTION_CONFIG = {
    scale: 350,
    center: [78.9629, 22.5937]
    };
    const [tooltipContent, setTooltipContent] = useState('');

  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };
  const geographyStyle = {
    default: {
      outline: 'none'
    },
    hover: {
      fill: '#ccc',
      transition: 'all 250ms',
      outline: 'none'
    },
    pressed: {
      outline: 'none'
    }
  };
  const getRandomInt = () => {
    return parseInt(Math.random() * 100);
  };
  useEffect(()=> {
    setData([...initData])
  },[])
 
 
  const getHeatMapData = (key,sum) => {
    let tempArr = [...data];
    
        let newObj= { 
            id: key ,
            state: 'Puducherry', 
            value: sum
        }
        tempArr.push(newObj);
        console.log('THIS IS INSIDE HEAT MAP: ',tempArr);
        setData(tempArr)
    
};

  function onChange(checkedValues) {
    console.log('checked = ', selectedKeys);
    let checkVal = checkedValues.target.value
    let tempArr = [...selectedKeys];
    checkVal.map(val=>{

        if(tempArr.includes(val)===false){
            tempArr.push(val)
            setSelectedKeys([...tempArr])
        }
    })
}

function yearChange(value) {
    console.log(`selected ${value}`);
    setSelectYear(value)
    setData([])
  }

  const children = [];
  for (let i = 1901; i < 2018; i++) {
    children.push(<Option value={i} key={i}>{i}</Option>);
  }
  
  let checkBoxGroup = AllStates.map(o=>(
      <Checkbox key={o.key} value={o.value} onChange={onChange} disabled={allowSelection}>{o.label}</Checkbox>
  )) 

  
    useEffect(() => {
        console.log(rainfallData);
        selectedKeys.map(key=>{
            let allRainfallData = rainfallData.filter(o=>o.id==key)
            let lastRain = allRainfallData.find(o=>o.YEAR===parseInt(selectYear))?.sum
            if(lastRain === null){
                return(notification('error', 'The requested data could not be found'))
                
            }else{
                console.log('KEY: ',key, ' New DATA: ',lastRain);
                getHeatMapData(key,lastRain)
            }
            
        })
        
        
    },[selectedKeys])

   const COLOR_RANGE = [
    '#ffedea',
    '#ffcec5',
    '#ffad9f',
    '#ff8a75',
    '#ff5533',
    '#e2492d',
    '#be3d26',
    '#9a311f',
    '#782618'
  ]
  const DEFAULT_COLOR = '#EEE';
  
  
   const colorScale = scaleQuantile()
    .domain(data.map(d => d.value))
    .range(COLOR_RANGE);
        return (
            <>
          <ComposableMap
              projectionConfig={PROJECTION_CONFIG}
              projection="geoMercator"
              width={480}
              height={176}
              data-tip=""
          >
              <Geographies geography={INDIA_TOPO_JSON}>
                {({ geographies }) =>
                  geographies?.map(geo => {
                      
                    const current = data?.find(s => s.id === geo.id);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                        style={geographyStyle}
                        onMouseEnter={onMouseEnter(geo, current)}
                        onMouseLeave={onMouseLeave}
                      />
                    );
                  })
                }
              </Geographies>
          </ComposableMap>
          
          {checkBoxGroup}<br/><br/>
          <Select size='large' defaultValue='1901' onChange={yearChange} style={{ width: 200 }}>
              {children}
          </Select>
          
          </>

        )
      

}