import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Content from "../components/content"

const graphsOptions = ["Directed", "Undirected"]

const GraphsPage = () => (
  <Layout>
    <Seo title="Home" />
    <Content options={graphsOptions} title="Graphs">
      <p>Content test graphs</p>
    </Content>
  </Layout>
)

export default GraphsPage
