import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Graph from "../components/graph"
import DateRange from "../components/date-range"
import { getActivityStreamData } from "../utils/parser"

const IndexPage = ({ data }) => {
  let dateFrom = "2019-02-01"
  let dateTo = "2019-03-15"
  let stream = getActivityStreamData(
    data.allStravaActivity.edges,
    dateFrom,
    dateTo
  )
  return (
    <Layout>
      <SEO title="Polar" keywords={[`strava`, `polar`, `analysis`]} />
      <p>Welcome to Polar.</p>
      <p>Analyse your strava activities against a polar training plan.</p>
      <DateRange dateFrom={dateFrom} dateTo={dateTo} />
      <h1>Overall Polarity Score: {Math.round(stream["polarity"])}</h1>
      <Graph stream={stream} dateFrom={dateFrom} dateTo={dateTo} />
      {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div> */}
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export const query = graphql`
  query {
    allStravaActivity(sort: { fields: [activity___start_date], order: ASC }) {
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
`

export default IndexPage
