// charts/useLineOption.ts
import type { EChartsOption, SeriesOption } from 'echarts'
import type { LineSeries } from '../core/types'
import type { LineChartProps } from './line-chart'
import { mergeOption } from '../core/merge-option'

export function useLineOption(props: LineChartProps): EChartsOption {
    const {
        data,
        xAxis,
        smooth,
        area,
        option,
    } = props

    // 如果用户完全使用官方 option
    if (!data && option) {
        return option
    }

    const isMulti = Array.isArray(data) && typeof data[0] === 'object'

    const series: SeriesOption[] = isMulti
        ? (data as LineSeries[]).map(item => ({
            type: 'line' as const,
            name: item.label,
            data: item.data,
            smooth,
            areaStyle: area ? {} : undefined,
        }))
        : [
            {
                type: 'line' as const,
                data: (data ?? []) as number[],
                smooth,
                areaStyle: area ? {} : undefined,
            },
        ]

    const baseOption: EChartsOption = {
        xAxis: {
            type: 'category',
            data: xAxis ?? [],
        },
        yAxis: {
            type: 'value',
        },
        series,
    }

    return mergeOption(baseOption, option)
}
