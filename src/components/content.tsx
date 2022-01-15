/**
 * Content component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { Button } from "@mui/material"
import classes from "./content.classes"

interface ContentI {
  children: React.ReactNode
  handleSelection(event: any): void
  options: string[]
  selected: number
  title: string
}

const Content = ({
  children,
  handleSelection,
  options,
  selected,
  title,
}: ContentI) => {
  return (
    <div style={{ height: "100%", position: "relative" }}>
      <h1 style={{ fontSize: "1.5em" }}>{title}</h1>
      <div style={{ margin: "10px 0" }}>
        {options.map((item, idx) => {
          return (
            <Button
              className={idx === selected ? "active" : ""}
              id={idx}
              key={idx}
              onClick={handleSelection}
              style={{
                marginRight: 10,
                marginBottom: 5,
              }}
              sx={{ ...classes.button }}
            >
              {item}
            </Button>
          )
        })}
      </div>
      <div
        style={{
          border: "1px solid rgba(123,123,123,0.2)",
          height: "100%",
          borderRadius: 10,
          padding: 10,
        }}
      >
        {selected >= 0 ? (
          children
        ) : (
          <div
            style={{
              height: "100%",
              color: "gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Make your selection
          </div>
        )}
      </div>
    </div>
  )
}

export default Content
