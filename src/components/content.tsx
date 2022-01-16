/**
 * Content component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { Badge, Button } from "@mui/material"
import classes from "./content.classes"

interface ContentI {
  children: React.ReactNode
  handleSelection(event: any): void
  setNoOfEntries(event: any): void
  setSpeed(event: any): void
  options: string[]
  selected: number
  speed: number
  noOfEntries: number
  title: string
}

const Content = ({
  children,
  handleSelection,
  noOfEntries,
  options,
  selected,
  setNoOfEntries,
  setSpeed,
  speed,
  title,
}: ContentI) => {
  return (
    <div style={{ height: "100%", position: "relative" }}>
      <h1 style={{ fontSize: "1.5em" }}>{title}</h1>
      <div style={{ margin: "10px 0" }}>
        {options.map((item, idx) => {
          const button = (
            <Button
              className={idx === selected ? "active" : ""}
              id={idx}
              key={idx}
              onClick={handleSelection}
              style={{
                marginLeft: idx !== 0 && 15,
                marginBottom: 5,
              }}
              sx={{ ...classes.button }}
            >
              {item}
            </Button>
          )
          return item === "Bubble Sort" ? (
            <Badge badgeContent={`✓`} color="primary" sx={{}}>
              {button}
            </Badge>
          ) : (
            button
          )
        })}
      </div>
      <div
        style={{
          border: "1px solid rgba(123,123,123,0.32)",
          height: "100%",
          borderRadius: 10,
          padding: 10,
          backgroundColor: "rgba(12,12,12,0.04)",
        }}
      >
        {selected === 0 ? ( // TODO: Inserted bug here: replace with >==
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
            Nothing here yet
          </div>
        )}
      </div>
    </div>
  )
}

export default Content
