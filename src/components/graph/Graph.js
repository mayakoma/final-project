import React, { useRef, useEffect, useState } from 'react';
import "./Graph.css";
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";



function Graph() {
    // const [data, setData]= useState([
    //     { year: 2010, count: 10 },
    //     { year: 2011, count: 20 },
    //     { year: 2012, count: 15 },
    //     { year: 2013, count: 25 },
    //     { year: 2014, count: 22 },
    //     { year: 2015, count: 30 },
    //     { year: 2016, count: 28 },
    //   ]);
     const arr= [{ productName: "cake1", count: 10 },
        { productName: "cake2", count: 20 },
        { productName: "cake3", count: 15 },
        { productName: "cake4", count: 25 },
        { productName: "cake5", count: 22 },
        { productName: "cake6", count: 30 },
        { productName: "cake7", count: 28 }];

    const data = {
        labels: arr.map((e) => e.productName),
        datasets: [
          {
            label: "year",
            data: arr.map((row) => row.count),
            backgroundColor: [
              "rgba(214, 205, 159,1)",
              "#d6cd9f",
              "#dbc995",
              "#ab9f7e",
              "#c2ab6b",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      };
    const [dataChart, setData]=useState(data);

    // useEffect(() => {
    //     setData();
    //   }, []);

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Product Type By Quantity",
          },
        },
      };

   
    

   
    return (
       <div style={{ width: 700 }}>graph
        <Bar data={dataChart} options={options}/>
        
       </div>
    );
  }
  
  export default Graph;