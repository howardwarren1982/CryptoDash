import React from "react"
import { useState } from "react"
import useFetch from "../../utils/hooks/useFetch"
import "./lineChartStyle.scss"
import { Cryptodata } from "./lineChartData"
import { unixToDate, getXData, getYData } from "../../utils/utilFunctions"
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

function LineChart() {
  const [daySelection, setDaySelection] = useState("day")
  const [lineChartDataDay] = useFetch(
    "https://api.coingecko.com/api/v3/exchanges/binance/volume_chart?days=1"
  )
  const [lineChartDataWeek] = useFetch(
    "https://api.coingecko.com/api/v3/exchanges/binance/volume_chart?days=7"
  )

  const [lineChartData30] = useFetch(
    "https://api.coingecko.com/api/v3/exchanges/binance/volume_chart?days=30"
  )

  const [lineChartDataYear] = useFetch(
    "https://api.coingecko.com/api/v3/exchanges/binance/volume_chart?days=365"
  )

  console.log(lineChartDataDay)
  console.log(lineChartDataWeek)
  console.log(lineChartData30)

  Cryptodata["day"] = lineChartDataDay
  Cryptodata["week"] = lineChartDataWeek
  Cryptodata["month"] = lineChartData30
  Cryptodata["year"] = lineChartDataYear

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
      <label for="days">Choose the time to chart</label>
      <select name="Days" id="days" onChange={handleChange}>
        <option selected="selected" value="day">
          Day
        </option>
        <option value="week"> Week</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
      </select>
    </div>
  )
}

export default LineChart
