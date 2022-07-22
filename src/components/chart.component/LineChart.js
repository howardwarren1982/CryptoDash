import React from "react"
import { useState } from "react"
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
  const handleChange = function (e) {
    setDaySelection(e.target.value)
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  }

  let newCryptodata = []

  Cryptodata[daySelection].map((item, index, array) => {
    ;[unixToDate(item[0]), item[1]].push(newCryptodata)
    console.log([unixToDate(item[0]), item[1]])
  })

  console.log(newCryptodata)

  Cryptodata[daySelection].map(item => {
    item[0] = unixToDate(item[0])
  })

  let labels = getXData(Cryptodata[daySelection])

  const data = {
    labels,
    datasets: [
      {
        label: "Bitcoin Vs Usd",
        data: getYData(Cryptodata[daySelection]),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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
