// Write your code here

import './index.css'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const VaccinatonCoverage = props => {
  const {details} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return `${number.toString()} k`
  }

  return (
    <div className="vaccination-coverage-container">
      <h1 className="heading">Vaccination Coverage</h1>
      <ResponsiveContainer width={1000} height={300}>
        <BarChart
          data={details}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            className="bar-graph"
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="doseOne" name="Dose 1" fill="#5a8dee" barSize="20%" />
          <Bar dataKey="doseTwo" name="Dose 2" fill="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinatonCoverage
