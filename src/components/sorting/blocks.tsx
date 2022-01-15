import * as React from "react"
import { Button } from "@mui/material"

interface BlocksI {
  data?: number[]
}

const Blocks = ({ data }: BlocksI) => {
  // console.log("data bubbled", sorting.bubbleSortAlgorithm(data))

  return <div>{data?.toString()}</div>
}

export default Blocks
