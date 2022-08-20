import React from "react"
import { useState } from "react"
import { useSelectionContext } from "../../utils/context/SelectionContext"
import useFetch from "../../utils/hooks/useFetch"
import "./lineChartStyle.scss"
import { Cryptodata } from "./lineChartData"
import { getXData, getYData } from "../../utils/utilFunctions"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

//Cryptodata is back up data in case the API is down

function LineChart() {
  const [daySelection, setDaySelection] = useState("day")
  let selection = useSelectionContext()

  const dayWeekMonth = { day: "1", week: "7", month: "30" }

  const [Output] = useFetch(
    `https://api.coingecko.com/api/v3/exchanges/${selection}/volume_chart?days=${dayWeekMonth[daySelection]}`
  )

  if (Output instanceof Array) {
    Cryptodata[daySelection] = Output
  }

  const handleChange = function (e) {
    setDaySelection(e.target.value)
  }

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          color: "rgba(0,0,0,0.9)",
        },
      },
      y: {
        grid: {
          color: "rgba(0,0,0,0.9)",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Line Chart",
      },
    },
  }

  let labels = getXData(Cryptodata[daySelection])

  const data = {
    labels,
    datasets: [
      {
        label: "Bitcoin Vs Usd",
        data: getYData(Cryptodata[daySelection]),
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderColor: "#ffffff",
        borderWidth: 1,
        pointBackgroundColor: "##ffffff",
        pointBorderColor: "#ffffff",
        pointHoverBackgroundColor: "#98B9AB",
        pointHoverBorderColor: "#98B9AB",
        pointRadius: 1,
        pointHoverRadius: 5,
      },
    ],
  }

  return (
    <div className="line-graph">
      <Line options={options} data={data} />
      <label htmlFor="days">Choose the time to chart</label>
      <select name="Days" id="days" onChange={handleChange}>
        <option defaultValue="day"></option>
        <option value="day">Day</option>
        <option value="week"> Week</option>
        <option value="month">Month</option>
      </select>
    </div>
  )
}

export default LineChart
