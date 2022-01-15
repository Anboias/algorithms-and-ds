import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Button } from "@mui/material"

import "./header.css"

const Header = ({ siteTitle }: { siteTitle: string }) => (
  <header
    style={{
      background: `rebeccapurple`,
      width: "100%",
      // position: 'fixed'
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        // maxWidth: 960,
        padding: "0.65rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: "1em" }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
      <div>
        {["Sorting Algorithms", "Trees", "Graphs"].map((item) => (
          <Link
            className="header-button"
            key={item}
            to={`/${item.toLowerCase().replace(/\s/g, "")}`}
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            <Button
              disabled={item !== "Sorting Algorithms"}
              style={{
                color: "white",
                backgroundColor: "orange",
                marginLeft: 10,
                marginBottom: 5,
              }}
            >
              {item}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
