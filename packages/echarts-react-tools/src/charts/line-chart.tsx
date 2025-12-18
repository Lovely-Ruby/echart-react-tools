import type { ECharts, EChartsOption } from 'echarts'
import type { LineData } from '../core/types'
import { useBaseChart } from '../core/use-base-chart'
// charts/LineChart.tsx
import { useLineOption } from './use-line-option'

export interface LineChartProps {
    /** 推荐方式 */
    data?: LineData
    xAxis?: string[]

    /** 快捷能力 */
    smooth?: boolean
    area?: boolean

    /** 官方能力 */
    option?: EChartsOption

    /** 通用能力 */
    loading?: boolean
    height?: number | string
    onReady?: (chart: ECharts) => void
}

export const LineChart: React.FC<LineChartProps> = (props) => {
    const option = useLineOption(props)
    const ref = useBaseChart({
        option,
        loading: props.loading,
        onReady: props.onReady,
    })

    return <div ref={ref} style={{ height: props.height ?? 300 }} />
}
