import type { ECharts, EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'
import { useResizeObserver } from './use-resize-observer'

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
    const chartRef = useRef<ECharts | null>(null)

    // init
    useEffect(() => {
        if (!ref.current || chartRef.current)
            return

        const chart = echarts.init(ref.current)
        chartRef.current = chart
        onReady?.(chart)

        return () => {
            chart.dispose()
            chartRef.current = null
        }
    }, [])

    // set option
    useEffect(() => {
        chartRef.current?.setOption(option, true)
    }, [option])

    // loading
    useEffect(() => {
        if (!chartRef.current)
            return
        loading
            ? chartRef.current.showLoading()
            : chartRef.current.hideLoading()
    }, [loading])

    // resize ✅
    useResizeObserver(ref, () => {
        chartRef.current?.resize()
    })

    return ref
}
