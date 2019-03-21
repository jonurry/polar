import React from "react"
import { ResponsiveCalendar } from "@nivo/calendar"

export default ({ dateFrom, dateTo, data }) => (
  <div style={{ height: `250px` }}>
    <ResponsiveCalendar
      data={data}
      from={dateFrom}
      to={dateTo}
      emptyColor="#eeeeee"
      colors={[
        "#ff0000",
        "#ffa200",
        "#ffe500",
        "#f5ff00",
        "#a3ff00",
        "#00ff00",
      ]}
      domain={[0, 100]}
      margin={{
        top: 30,
        right: 30,
        bottom: 60,
        left: 30,
      }}
      yearSpacing={40}
      monthBorderColor="#ffffff"
      monthLegendOffset={10}
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          translateY: 36,
          itemCount: 4,
          itemWidth: 34,
          itemHeight: 36,
          itemDirection: "top-to-bottom",
        },
      ]}
    />
  </div>
)
