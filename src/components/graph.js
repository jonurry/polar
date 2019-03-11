import React from "react"
// import { css } from '@emotion/core';
import { StaticQuery, Link, graphql } from "gatsby"
// import { rhythm } from '../utils/typography';
import { ResponsiveStream } from "@nivo/stream"

export default ({ children }) => (
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
        style={{ height: `500px` }}
        // css={css`
        //   margin: 0 auto;
        //   max-width: 700px;
        //   padding: ${rhythm(2)};
        //   padding-top: ${rhythm(1.5)};
        // `}
      >
        <ResponsiveStream
          data={[
            {
              "Zone 1": 23,
              "Zone 2": 99,
              "Zone 3": 177,
              "Zone 4": 93,
              "Zone 5": 106,
            },
            {
              "Zone 1": 116,
              "Zone 2": 179,
              "Zone 3": 179,
              "Zone 4": 166,
              "Zone 5": 200,
            },
            {
              "Zone 1": 162,
              "Zone 2": 37,
              "Zone 3": 123,
              "Zone 4": 188,
              "Zone 5": 30,
            },
            {
              "Zone 1": 33,
              "Zone 2": 81,
              "Zone 3": 98,
              "Zone 4": 158,
              "Zone 5": 39,
            },
            {
              "Zone 1": 56,
              "Zone 2": 150,
              "Zone 3": 161,
              "Zone 4": 49,
              "Zone 5": 46,
            },
            {
              "Zone 1": 87,
              "Zone 2": 52,
              "Zone 3": 16,
              "Zone 4": 105,
              "Zone 5": 154,
            },
            {
              "Zone 1": 163,
              "Zone 2": 139,
              "Zone 3": 139,
              "Zone 4": 106,
              "Zone 5": 195,
            },
            {
              "Zone 1": 198,
              "Zone 2": 131,
              "Zone 3": 40,
              "Zone 4": 87,
              "Zone 5": 131,
            },
            {
              "Zone 1": 87,
              "Zone 2": 181,
              "Zone 3": 59,
              "Zone 4": 57,
              "Zone 5": 81,
            },
          ]}
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
          offsetType="none"
          fillOpacity={0.85}
          borderColor="#000"
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#2c998f",
              size: 4,
              padding: 2,
              stagger: true,
            },
            {
              id: "squares",
              type: "patternSquares",
              background: "inherit",
              color: "#e4c912",
              size: 6,
              padding: 2,
              stagger: true,
            },
          ]}
          fill={[
            {
              match: {
                id: "Zone 4",
              },
              id: "dots",
            },
            {
              match: {
                id: "Zone 2",
              },
              id: "squares",
            },
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
