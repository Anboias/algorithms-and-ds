/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

interface LayoutI {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutI) => {
  console.log("children", children)
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          padding: "1.2rem 0.65rem",
          paddingBottom: 0,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "space-between",
        }}
      >
        <main style={{ height: "100%" }}>{children}</main>
      </div>
      {/* <footer
        style={{
          marginTop: `auto`,
          border: "1px solid green",
        }}
      >
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer> */}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
