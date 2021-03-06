import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Graph from "../components/graph"
import DateRange from "../components/date-range"
import Polarity from "../components/polarity-score"
import Calendar from "../components/calendar"
import { getActivityStreamData, getCalendarData } from "../utils/parser"
import moment from "moment"

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    let dateFrom = moment()
      .subtract(6, "weeks") // default to show last 6 weeks of data
      .format("YYYY-MM-DD")
    let dateTo = moment().format("YYYY-MM-DD")
    let stream = getActivityStreamData(
      props.data.allStravaActivity.edges,
      dateFrom,
      dateTo
    )
    let calendar = getCalendarData(stream)
    this.state = {
      dateFrom: dateFrom,
      dateTo: dateTo,
      stream: stream,
      calendar: calendar,
    }
    this.setDateRange = this.setDateRange.bind(this)
  }

  setDateRange(from, to) {
    let stream = getActivityStreamData(
      this.props.data.allStravaActivity.edges,
      from,
      to
    )
    let calendar = getCalendarData(stream)
    this.setState({
      dateFrom: from,
      dateTo: to,
      stream: stream,
      calendar: calendar,
    })
  }

  render() {
    let polarity = Math.round(this.state.stream["polarity"])
    return (
      <Layout>
        <SEO title="Polar" keywords={[`strava`, `polar`, `analysis`]} />
        <h2>Welcome to Polar.</h2>
        <p>Analyse your strava activities against a polar training plan.</p>
        <div>
          <b>Choose activity date range:</b>
        </div>
        <DateRange
          dateFrom={this.state.dateFrom}
          dateTo={this.state.dateTo}
          setDateRange={this.setDateRange}
        />
        <Calendar
          dateFrom={this.state.dateFrom}
          dateTo={this.state.dateTo}
          data={this.state.calendar}
        />
        <Polarity polarity={polarity} />
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
            start_date(formatString: "YYYY-MM-DD")
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
