import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import apiService from "app/apiService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,

      text: "Application Bar Chart 2022",
      font: {
        size: 20,
      },
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ["January", "February", "March", "April", "May"];
const monthList = [0, 1, 2, 3, 4];
const Chart = () => {
  const [approvedData, setApprovedData] = useState([]);
  const [rejectedData, setRejectedData] = useState([]);
  const [pendingData, setPendingData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await apiService.post(`/application/all`, {
          monthList,
        });
        const {
          totalApprovedApplications,
          totalRejectedApplications,
          totalPendingApplications,
        } = response.data;
        setApprovedData(totalApprovedApplications);
        setRejectedData(totalRejectedApplications);
        setPendingData(totalPendingApplications);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "# of approved application",
        data: approvedData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
      {
        label: "number of rejected application ",
        data: rejectedData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.7)",
      },
      {
        label: "number of waiting for respond application ",
        data: pendingData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgb(255, 205, 86,0.7)",
      },
    ],
  };
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default Chart;
