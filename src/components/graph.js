import React from "react"
// import { css } from '@emotion/core';
// import { rhythm } from '../utils/typography';
import { ResponsiveStream } from "@nivo/stream"
import { linearGradientDef } from "@nivo/core"

export default ({ stream, children }) => (
  <div
    style={{ height: `70vh`, minHeight: `500px` }}
    // css={css`
    //   margin: 0 auto;
    //   max-width: 700px;
    //   padding: ${rhythm(2)};
    //   padding-top: ${rhythm(1.5)};
    // `}
  >
    <ResponsiveStream
      data={stream}
      keys={["Zone 1", "Zone 2", "Zone 3", "Zone 4", "Zone 5"]}
      margin={{
        top: 50,
        right: 110,
        bottom: 50,
        left: 60,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendOffset: -40,
      }}
      enableGridX={false}
      enableStackTooltip={false}
      curve="basis"
      offsetType="silhouette"
      fillOpacity={0.85}
      borderColor="#000"
      // color={["#000", "#444", "#888", "#bbb", "#eee"]}
      defs={[
        {
          id: "zone1",
          type: "patternDots",
          background: "#57C6B2",
          color: "#0294A5",
          size: 3,
          padding: 10,
          stagger: true,
        },
        {
          id: "zone2",
          type: "patternLines",
          background: "#EFDC51",
          color: "#8CDFCF",
          rotation: -45,
          lineWidth: 1,
          spacing: 16,
        },
        linearGradientDef("zone3", [
          { offset: 0, color: "#FF706D" },
          { offset: 50, color: "#D1302D" },
          { offset: 100, color: "#FF706D" },
        ]),
        {
          id: "zone4",
          type: "patternLines",
          background: "#8CDFCF",
          color: "#57C6B2",
          rotation: 45,
          lineWidth: 1,
          spacing: 16,
        },
        {
          id: "zone5",
          type: "patternDots",
          background: "#E59E31",
          color: "#0294A5",
          size: 2,
          padding: 6,
          stagger: true,
        },
      ]}
      fill={[
        { match: { id: "Zone 1" }, id: "zone1" },
        { match: { id: "Zone 2" }, id: "zone2" },
        { match: { id: "Zone 3" }, id: "zone3" },
        { match: { id: "Zone 4" }, id: "zone4" },
        { match: { id: "Zone 5" }, id: "zone5" },
      ]}
      dotSize={8}
      dotBorderWidth={2}
      dotBorderColor="inherit:brighter(0.7)"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          translateX: 100,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: "#999",
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
    {children}
  </div>
)
