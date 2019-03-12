import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Graph from "../components/graph"

const IndexPage = () => (
  <Layout>
    <SEO title="Polar" keywords={[`strava`, `polar`, `analysis`]} />
    <h1>Polar</h1>
    <p>Welcome to Polar.</p>
    <p>Analyse your strava activities against a polar training plan.</p>
    <Graph />
    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div> */}
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
