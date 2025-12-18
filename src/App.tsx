import { LineChart } from 'echarts-react-tools'

function App() {
  return (
    <div style={{ width: 600, height: 300 }}>
      <LineChart
        xAxis={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
        data={[
          {
            label: '订单数',
            data: [120, 200, 150, 80, 70, 110, 130],
          },
        ]}

      />
    </div>
  )
}

export default App
