import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Content from "../components/content"

const TreesPage = () => (
  <Layout>
    <Seo title="Home" />
    <Content options={[""]} title="Trees">
      <p>Content test trees</p>
    </Content>
  </Layout>
)

export default TreesPage
