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
              Raoul: 23,
              Josiane: 99,
              Marcel: 177,
              René: 93,
              Paul: 106,
              Jacques: 152,
            },
            {
              Raoul: 116,
              Josiane: 179,
              Marcel: 179,
              René: 166,
              Paul: 200,
              Jacques: 193,
            },
            {
              Raoul: 162,
              Josiane: 37,
              Marcel: 123,
              René: 188,
              Paul: 30,
              Jacques: 93,
            },
            {
              Raoul: 33,
              Josiane: 81,
              Marcel: 98,
              René: 158,
              Paul: 39,
              Jacques: 91,
            },
            {
              Raoul: 56,
              Josiane: 150,
              Marcel: 161,
              René: 49,
              Paul: 46,
              Jacques: 146,
            },
            {
              Raoul: 87,
              Josiane: 52,
              Marcel: 16,
              René: 105,
              Paul: 154,
              Jacques: 37,
            },
            {
              Raoul: 163,
              Josiane: 139,
              Marcel: 139,
              René: 106,
              Paul: 195,
              Jacques: 128,
            },
            {
              Raoul: 198,
              Josiane: 131,
              Marcel: 40,
              René: 87,
              Paul: 131,
              Jacques: 185,
            },
            {
              Raoul: 87,
              Josiane: 181,
              Marcel: 59,
              René: 57,
              Paul: 81,
              Jacques: 37,
            },
          ]}
          keys={["Raoul", "Josiane", "Marcel", "René", "Paul", "Jacques"]}
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
                id: "Paul",
              },
              id: "dots",
            },
            {
              match: {
                id: "Marcel",
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
