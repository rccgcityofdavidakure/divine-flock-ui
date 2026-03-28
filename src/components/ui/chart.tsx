import * as React from "react"
import * as RechartsPrimitive from "recharts"

export const ChartContainer = ({ children, config, className }: any) => {
  return (
    <div className={className}>
      <RechartsPrimitive.ResponsiveContainer>
        {children}
      </RechartsPrimitive.ResponsiveContainer>
    </div>
  )
}

export const ChartTooltip = RechartsPrimitive.Tooltip
export const ChartTooltipContent = (props: any) => null
export const ChartLegend = RechartsPrimitive.Legend
export const ChartLegendContent = (props: any) => null
export const ChartStyle = (props: any) => null