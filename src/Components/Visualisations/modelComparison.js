import React, { useState, useEffect } from "react";
import axios from "axios";
import BarChartML from "./ModelCmpChart";
import { Spin } from 'antd';

export default function ModelCompare(){
    const [visdata1, setVisdata1] = useState();
    const [visdata2, setVisdata2] = useState();
    const [visdata3, setVisdata3] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        setLoading(true);
        axios.get('http://127.0.0.1:5000/regression').then(res=>{
            console.log('API RESPONSE: ',res.data);
            setVisdata1([{
                "Algorithm": 'Linear Regression',
                "Mean Absolute Error":parseFloat(res.data.reg_arr_ep[0])
                },
                {
                    "Algorithm": 'Decision Tree',
                    "Mean Absolute Error":parseFloat(res.data.reg_arr_ep[1])
                },
                {
                    "Algorithm": 'Random Forest',
                    "Mean Absolute Error":parseFloat(res.data.reg_arr_ep[2])
                },
                {
                    "Algorithm": 'XG Boost',
                    "Mean Absolute Error":parseFloat(res.data.reg_arr_ep[3])
                },
                    
            ])
            setVisdata2([{
                "Algorithm": 'Linear Regression',
                "Mean Absolute Error":parseFloat(res.data.reg_arr_lp[0])
                },
                {
                    "Algorithm": 'Decision Tree',
                    "Mean Absolute Error":parseFloat(res.data.reg_arr_lp[1])
                },
                {
                    "Algorithm": 'Random Forest',
                    "Mean Absolute Error":parseFloat(res.data.reg_arr_lp[2])
                },
                {
                    "Algorithm": 'XG Boost',
                    "Mean Absolute Error":parseFloat(res.data.reg_arr_lp[3])
                },
                    
            ])
            setVisdata3([
                {
                "Algorithm": 'Linear Regression',
                "Mean Absolute Error":parseFloat(res.data.reg_arr_rp[0])
                },
                {
                    "Algorithm": 'Decision Tree',
                    "Mean Absolute Error":parseFloat(res.data.reg_arr_rp[1])
                },
                {
                    "Algorithm": 'Random Forest',
                    "Mean Absolute Error":parseFloat(res.data.reg_arr_rp[2])
                },
                {
                    "Algorithm": 'XG Boost',
                    "Mean Absolute Error":parseFloat(res.data.reg_arr_rp[3])
                },
                    
            ])
            setLoading(false)
        })
    },[]);
    let spinner;
    let earthChart, rainfallChart,landslideChart;
    let earthName, rainfallName,landslideName;
    if(!loading){
        spinner = null
        if (visdata1 && visdata1 !== null) {
            earthName = <h3 style={{marginLeft:"40vw"}}>Earthquake Prediction Models</h3>
            earthChart = <BarChartML data={visdata1} />;
        }
        if (visdata2 && visdata2 !== null) {
            landslideName = <h3 style={{marginLeft:"40vw"}}>Landslide Prediction Models</h3>
            landslideChart = <BarChartML data={visdata2} />;
        }
        if (visdata3 && visdata3 !== null) {
            rainfallName= <h3 style={{marginLeft:"40vw"}}>Rainfall Prediction Models</h3>
            rainfallChart = <BarChartML data={visdata3} />;
        }
    }else{
        spinner = <Spin style={{marginLeft:"49vw", marginTop:"10vh"}}/>;
    }
    return(
        <div
      className="Visualisations"
      style={{ backgroundColor: "white", height: "500px", marginTop: "6.5vh" }}
    >
        {spinner}
        {earthName}
        {earthChart}
        {landslideName}
        {landslideChart}
        {rainfallName}
        {rainfallChart}
        </div>
    )
}