import React from "react"
// import { css } from '@emotion/core';
import { StaticQuery, Link, graphql } from "gatsby"
// import { rhythm } from '../utils/typography';
import { ResponsiveStream } from "@nivo/stream"
import { linearGradientDef } from "@nivo/core"

export default ({ dateFrom, dateTo, children }) => (
  <StaticQuery
    query={graphql`
      query {
        allStravaActivity(
          sort: { fields: [activity___start_date], order: DESC }
        ) {
          edges {
            node {
              activity {
                name
                start_date
                distance
                average_heartrate
                average_watts
                suffer_score
                zones {
                  score
                  points
                  type
                  distribution_buckets {
                    max
                    min
                    time
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <div
        style={{ height: `1000px` }}
        // css={css`
        //   margin: 0 auto;
        //   max-width: 700px;
        //   padding: ${rhythm(2)};
        //   padding-top: ${rhythm(1.5)};
        // `}
      >
        <ResponsiveStream
          data={
            // filter between specified dates
            data.allStravaActivity.edges
              .filter(edge => {
                return (
                  edge.node.activity.start_date > dateFrom &&
                  edge.node.activity.start_date < dateTo
                )
              })
              .map(edge => {
                // filter activity for heartrate zone bucket only
                let hrZones = edge.node.activity.zones.filter(zone => {
                  return zone.type === "heartrate"
                })
                // return default zones if not defined
                if (hrZones.length === 0)
                  return {
                    "Zone 1": 0,
                    "Zone 2": 0,
                    "Zone 3": 0,
                    "Zone 4": 0,
                    "Zone 5": 0,
                  }
                // return time spent in each zone
                return hrZones[0].distribution_buckets
                  .sort((a, b) => {
                    // Order the zones in the bucket
                    if (a.min < b.min) {
                      return -1
                    }
                    if (a.min > b.min) {
                      return 1
                    }
                    return 0
                  })
                  .map((zone, index) => {
                    // extract time in each zone
                    let o = {}
                    o[`Zone ${index + 1}`] = zone.time
                    return o
                  })
                  .reduce((acc, cur) => {
                    // merge zone objects into one
                    return Object.assign(acc, cur)
                  }, {})
              })
          }
          keys={["Zone 1", "Zone 2", "Zone 3", "Zone 4", "Zone 5"]}
          margin={{
            top: 50,
            right: 110,
            bottom: 50,
            left: 60,
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendOffset: 36,
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendOffset: -40,
          }}
          enableGridX={false}
          curve="natural"
          offsetType="silhouette"
          fillOpacity={0.85}
          borderColor="#000"
          // color={["#000", "#444", "#888", "#bbb", "#eee"]}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "#7BB0A8",
              color: "#A7DBAB",
              size: 3,
              padding: 3,
              stagger: true,
            },
            {
              id: "lines2",
              type: "patternLines",
              background: "#A7DBAB",
              color: "#7BB0A8",
              rotation: -45,
              lineWidth: 1,
              spacing: 12,
            },
            {
              id: "lines4",
              type: "patternLines",
              background: "#A7DBAB",
              color: "#7BB0A8",
              rotation: 45,
              lineWidth: 1,
              spacing: 12,
            },
            linearGradientDef("gradientZone3", [
              { offset: 0, color: "#fff" },
              { offset: 50, color: "#f00" },
              { offset: 100, color: "#fff" },
            ]),
          ]}
          fill={[
            { match: { id: "Zone 1" }, id: "dots" },
            { match: { id: "Zone 2" }, id: "lines2" },
            { match: { id: "Zone 3" }, id: "gradientZone3" },
            { match: { id: "Zone 4" }, id: "lines4" },
            { match: { id: "Zone 5" }, id: "dots" },
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
        {data.allStravaActivity.edges.map(({ node }, index) => (
          <p>{node.activity.name}</p>
        ))}
        {children}
      </div>
    )}
  />
)