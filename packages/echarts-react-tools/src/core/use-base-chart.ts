import type { ECharts, EChartsOption } from 'echarts'
// core/useBaseChart.ts
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

interface UseBaseChartProps {
    option: EChartsOption
    loading?: boolean
    onReady?: (chart: ECharts) => void
}

export function useBaseChart({
    option,
    loading,
    onReady,
}: UseBaseChartProps) {
    const ref = useRef<HTMLDivElement>(null)
    const chartRef = useRef<ECharts>(undefined)

    useEffect(() => {
        if (!ref.current)
            return

        const chart = echarts.init(ref.current)
        chartRef.current = chart
        onReady?.(chart)

        return () => {
            chart.dispose()
        }
    }, [])

    useEffect(() => {
        if (!chartRef.current)
            return
        chartRef.current.setOption(option, true)
    }, [option])

    useEffect(() => {
        if (!chartRef.current)
            return
        loading
            ? chartRef.current.showLoading()
            : chartRef.current.hideLoading()
    }, [loading])

    return ref
}
