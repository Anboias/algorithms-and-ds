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
  options: string[]
  title: string
}

const Content = ({ children, options, title }: ContentI) => {
  // Convert options array of strings
  const convertedOptions = options.map(item => ({
    id: item.toLowerCase().replace(/\s/g, "-"),
    label: item,
  }))

  // Local state
  const [selected, setSelected] = React.useState(null)

  // Handlers
  const handleClick = (event: any) =>
    setSelected(prevValue =>
      prevValue === event.target.id ? null : event.target.id
    )

  return (
    <div style={{ height: "100%" }}>
      <h1 style={{ fontSize: "1.5em" }}>{title}</h1>
      <div style={{ margin: "10px 0" }}>
        {convertedOptions.map(item => (
          <Button
            className={item.id === selected ? "active" : ""}
            id={item.id}
            key={item.id}
            onClick={handleClick}
            style={{
              marginRight: 10,
            }}
            sx={{ ...classes.button }}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div style={{ border: "1px solid purple", height: "80%" }}>
        {children}
      </div>
    </div>
  )
}

export default Content
