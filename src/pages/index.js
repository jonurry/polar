import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Graph from "../components/graph"
import DateRange from "../components/date-range"
import { getActivityStreamData } from "../utils/parser"
import moment from "moment"

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    let dateFrom = moment()
      .subtract(28, "days")
      .format("YYYY-MM-DD")
    let dateTo = moment().format("YYYY-MM-DD")
    let stream = getActivityStreamData(
      props.data.allStravaActivity.edges,
      dateFrom,
      dateTo
    )
    this.state = {
      dateFrom: dateFrom,
      dateTo: dateTo,
      stream: stream,
    }
    this.setDateRange = this.setDateRange.bind(this)
  }

  setDateRange(from, to) {
    this.setState({
      dateFrom: from,
      dateTo: to,
      stream: getActivityStreamData(
        this.props.data.allStravaActivity.edges,
        from,
        to
      ),
    })
  }

  render() {
    return (
      <Layout>
        <SEO title="Polar" keywords={[`strava`, `polar`, `analysis`]} />
        <p>Welcome to Polar.</p>
        <p>Analyse your strava activities against a polar training plan.</p>
        <DateRange
          dateFrom={this.state.dateFrom}
          dateTo={this.state.dateTo}
          setDateRange={this.setDateRange}
        />
        <h1>
          Overall Polarity Score: {Math.round(this.state.stream["polarity"])}
        </h1>
        <Graph stream={this.state.stream} />
        {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div> */}
        <Link to="/page-2/">Go to page 2</Link>
      </Layout>
    )
  }
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
