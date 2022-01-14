import * as React from "react"
import { Button } from "@mui/material"
import sorting from "../../components/sorting/algorithms/sorting"

interface BubbleSortI {
  data?: number[]
}

const BubbleSort = ({ data }: BubbleSortI) => {
  // console.log("data bubbled", sorting.bubbleSortAlgorithm(data))

  return <div>{data?.toString()}</div>
}

export default BubbleSort
