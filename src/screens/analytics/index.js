import React, { useCallback, useContext, useState, useEffect } from 'react';
import Chart from 'react-apexcharts'
import Modal from "../../components/Modal";
import { FiDelete, FiEdit } from 'react-icons/fi';
import { StoreContext } from '../../components';
import { client } from '../../reducers';

import "./styles.css";

const Analytics = () => {
    const { state, dispatch } = useContext(StoreContext);
    const data={
        options: {
          chart: {
            id: 'Analytics'
          },
          xaxis: {
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
          }
        },
        series: [{
          name: 'Previous yr',
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 128, 130, 150]
        },
        {
          name: 'current yr',
          data: [3, 60, 45, 80, 46, 70, 50, 96, 135]
        }]
      }
    

    

      
  

    return (
        <div className="container">
            <div className="Box">
                <p style={{color: 'black'}}>Analytical Tools</p>
                <div id="BranchBox">
                    <p style={{color: 'black', 'font-size': 15, 'margin-right': 20, 'font-weight': 'lighter'}}>{state.user.type==='adminstrator'? 'Admin': 'Staff'} User: {state.user.name}</p>
                    
                </div>
            </div>
          <div className="ChartBox">
            <div className="chart">
              <Chart options={data.options} 
              series={data.series} 
              type="bar" width={350} height={280} />
            </div>

            <div className="chart">
              <Chart options={data.options} 
              series={data.series} 
              type="line" width={350} height={280} />
            </div>

            <div className="chart">
              <Chart options={data.options} 
              series={data.series} 
              type="area" width={350} height={280} />
            </div>

          </div>
          
           <div className="ChartBox">
             
            <div className="chart">
              <Chart options={data.options} 
              series={data.series} 
              type="radar" width={350} height={270} />
            </div>

            <div className="chart">
              <Chart options={data.options} 
              series={data.series} 
              type="scatter" width={350} height={270} />
            </div>

            <div className="chart">
              <Chart options={data.options} 
              series={data.series} 
              type="heatmap" width={350} height={270} />
            </div>
           </div>

        </div>
    )
}


export default Analytics;
//bar
//line
//area
//radar
//histogram
//scatter
//heatmap