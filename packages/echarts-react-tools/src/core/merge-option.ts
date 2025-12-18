// 用于合并用户的 user 以及我默认的 options
import type { EChartsOption } from 'echarts'
import merge from 'lodash.merge'

export function mergeOption(
    base: EChartsOption,
    user?: EChartsOption,
): EChartsOption {
    if (!user)
        return base
    return merge({}, base, user)
}
