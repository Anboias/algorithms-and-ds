import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <h1>Hello, world.</h1>
      <h4 style={{ color: "gray" }}>
        I'm{" "}
        <Link
          style={{ textDecoration: "none" }}
          to="https://biasinov.com"
          target={"_blank"}
        >
          Bogdan
        </Link>
        , a Full Stack Web developer based in Bucharest, Romania.
      </h4>
      <p>Welcome to my visualization project!</p>
      <StaticImage
        src="../images/gatsby-astronaut.png"
        width={300}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt="A Gatsby astronaut"
        style={{ marginBottom: `1.45rem` }}
      />
    </div>
  </Layout>
)

export default IndexPage
