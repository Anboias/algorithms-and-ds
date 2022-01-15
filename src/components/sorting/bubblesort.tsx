import * as React from "react"
import { Button } from "@mui/material"
import { algos } from "../../components/sorting/algorithms/sorting"

interface BubbleSortI {
  data?: number[]
}
const sortedValues = new Set()

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay))
}

const BubbleSort = ({ data }: BubbleSortI) => {
  // Store values locally and changed them while sorting
  const [localData, setLocalData] = React.useState(data)

  // Constants
  const dataL = data?.length
  const max = data ? Math.max(...data) : -1
  const min = data ? Math.min(...data) : -1
  const wHeight = window.innerHeight
  // const [twoNumbersSelection, setTwoNumbersSelection] = React.useState([])

  // Do sort
  const sortingSteps = React.useMemo(
    () => algos.bubbleSortAlgorithm(data),
    [data]
  )

  // await timeout(1000)

  // Update UI for each sorting step
  React.useEffect(
    () =>
      sortingSteps.forEach((orderEl) => {
        const [firstEl, secondEl, swap, sortedValue]: (number | boolean)[] =
          orderEl

        // setTwoNumbersSelection([firstEl, secondEl])

        if (swap) {
          setTimeout(() => {
            // const interval = setInterval(() => {
            // You'd want an exit condition here
            setLocalData((prevValues) => {
              const temp = prevValues[Number(firstEl)]
              prevValues[Number(firstEl)] = prevValues[Number(secondEl)]
              prevValues[Number(secondEl)] = temp
              return prevValues.slice()
            })
            // }, 1000)
          }, 3000)
        }
      }),
    []
  )
  // })}  ,1000}

  console.log("localData", localData)
  // console.log("sortingSteps", sortingSteps)
  console.log("sortedValues", sortedValues)

  return (
    <div
      style={{
        border: "1px solid red",
        display: "flex",
        flexDirection: "row",
        height: "100%",
        transition: "2s all ease",
      }}
    >
      {localData?.map((item: number, idx: number) => {
        const calcHeight = ((max - min) / 100) * item

        return (
          <div
            key={`${idx}-${item}`}
            style={{
              height: `${calcHeight}%`,
              minHeight: `30px`,
              width: `3%`,
              // border: `1px solid green`,
              backgroundColor: sortedValues.has(item) ? `red` : `green`,
              margin: `0 2px`,
              display: `flex`,
              justifyContent: `center`,
              transition: "2s all ease",
            }}
          >
            <p style={{ color: "white", fontSize: 12 }}>{item}</p>
          </div>
        )
      })}
    </div>
  )
}

export default BubbleSort
