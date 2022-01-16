import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Badge, Button } from "@mui/material"

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
        padding: "0.7rem",
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
            <Badge
              badgeContent={`Beta`}
              color="warning"
              sx={{
                "& .MuiBadge-anchorOriginTopRight": {
                  position: "absolute",
                  top: -2,
                  right: -15,
                  transform: "translate(50%, -50%)",
                  transformOrigin: "100% 0",
                },
              }}
            >
              {siteTitle}
            </Badge>
          </Link>
        </h1>
      </div>
      <div>
        {["Sorting Algorithms", "Trees", "Graphs"].map((item) => {
          const link = (
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
                  marginLeft: 15,
                  marginBottom: 5,
                }}
              >
                {item}
              </Button>
            </Link>
          )

          return item === "Sorting Algorithms" ? (
            <Badge badgeContent={`✓`} color="primary" sx={{}}>
              {link}
            </Badge>
          ) : (
            link
          )
        })}
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
