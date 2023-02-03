// import React, { useRef, useEffect, useState } from "react";
// import "./Graph.css";
// import Chart from "chart.js/auto";
// import { Bar } from "react-chartjs-2";
import { useHttpClient } from "../../Hook/HttppHook";
// import { setLogLevel } from "firebase/app";

import React, { useRef, useEffect, useState } from "react";
import "./Graph.css";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

function Graph() {
  const [data, setData] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const colorPalette = [
    "rgba(214, 205, 159,1)",
    "#d6cd9f",
    "#dbc995",
    "#ab9f7e",
    "#c2ab6b",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await sendRequest(
        "http://localhost:3001/order/getProductAmount"
      );
      const labels = responseData.map((e) => e.productTitle);
      const count = responseData.map((row) => row.totalAmount);
      setData({
        labels,
        datasets: [
          {
            label: "product",
            data: count,
            // backgroundColor: colorPalette,
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    };
    fetchData();
  }, []);

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
    <div class="graphContainer">
      <div class="chart-container">
        {data ? <Bar data={data} options={options} /> : "Loading..."}
      </div>
    </div>
  );
}

export default Graph;
