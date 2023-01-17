import React, { useRef, useEffect } from 'react';
import "./Graph.css";
import rd3 from 'react-d3-library';
import {line, select, curveCardinal, axisBottom, axisRight, scaleLinear, scaleBand} from "d3";

function Graph() {
    const [data, setData]= useEffect([25, 30, 35]);
    const svgRef= useRef();

    useEffect(()=>{
        const svg= select(svgRef.current);
        const xScale= scaleBand().domain(data.map((value, index)=> index )).range([0, 300]).padding(0.5);
        const yScale= scaleLinear().domain([0, 150]).range([150, 0]);
        const colorScale= scaleLinear().domain([0, 150]).range["brown", "black", "grey"].clamp("true");

        const xAxis= axisBottom(xScale).ticks(data.length); 
        svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

        const yAxis= axisRight(yScale); 
        svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

        svg.selectAll(".bar").data(data).join("rect").attr("class", "bar").style("transform", "scale(1, -1)").attr("x", (value, index)=> xScale(index))
        .attr("y", -150).attr("width", xScale.bandwidth()).transition().attr("fill", colorScale).attr("height", value=> 150- yScale(value));

    }, [data]);
    return (
        <React.Fragment>
       <svg ref={svgRef}>
            <g className='x-axis'></g>
            <g className='y-axis'></g>
       </svg>
       <button onClick={()=>setData(data.map(value=>value+5 ))}>Update Data</button>
       <button onClick={()=>setData(data.filter(value=>value<35 ))}>Filter Data</button>

       </React.Fragment>
    );
  }
  
  export default Graph;