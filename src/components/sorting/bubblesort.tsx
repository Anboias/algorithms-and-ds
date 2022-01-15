import * as React from "react"
import { Button } from "@mui/material"
import { algos } from "../../components/sorting/algorithms/sorting"

interface BubbleSortI {
  data?: number[]
}

const DELAY = 100

const BubbleSort = ({ data }: BubbleSortI) => {
  // Store values locally and changed them while sorting
  const [localData, setLocalData] = React.useState(null)

  // Constants
  const [max, min] = React.useMemo(
    () => [Math.max(...data), Math.min(...data)],
    [data]
  )
  const wHeight = window.innerHeight
  const twoNumbersSelection = React.useRef([])
  const sortedValues = React.useMemo(() => new Set(), [data])

  // Do sort
  const sortingSteps = React.useMemo(
    () => algos.bubbleSortAlgorithm(data),
    [data]
  )

  const doDelay = (delay: number) =>
    new Promise<void>((resolve) => setTimeout(() => resolve(), delay))

  const doMagic = React.useCallback(async () => {
    for (let orderEl of sortingSteps) {
      const [firstEl, secondEl, swap, sortedValue]: number[] = orderEl

      // setTwoNumbersSelection([firstEl, secondEl])

      if (sortedValue) {
        sortedValues.add(sortedValue)
      }

      await doDelay(DELAY)

      if (swap) {
        setLocalData((prevValues: number[]) => {
          const indexOfFirst = prevValues.indexOf(firstEl)
          const indexOfSecond = prevValues.indexOf(secondEl)

          prevValues[indexOfFirst] = secondEl
          prevValues[indexOfSecond] = firstEl

          twoNumbersSelection.current[0] = firstEl
          twoNumbersSelection.current[1] = secondEl
          return prevValues.slice()
        })
      }
    }
    setLocalData((prevValues: number[]) => [...prevValues])
    sortingSteps.forEach((el) => sortedValues.add(el))
  }, [])

  // Update UI for each sorting step
  React.useEffect(() => {
    doMagic()
  }, [sortingSteps])

  // Initialize vars
  React.useEffect(() => {
    setLocalData(data)
    sortedValues.clear()
    twoNumbersSelection.current = []
  }, [data])

  return (
    <div
      style={{
        border: "1px solid yellow",
        display: "flex",
        flexDirection: "row",
        height: "100%",
      }}
    >
      {localData?.map((item: number, idx: number) => {
        const calcHeight = ((max - min) / 100) * item
        const calcWidth = 100 / localData.length

        return (
          <div
            key={`${idx}-${item}`}
            style={{
              height: `${calcHeight}%`,
              minHeight: `30px`,
              width: `${calcWidth}%`,
              // border: `1px solid green`,
              backgroundColor: sortedValues.has(item)
                ? `green`
                : twoNumbersSelection.current.includes(item)
                ? "black"
                : `gray`,
              margin: `0 .15em`,
              display: `flex`,
              justifyContent: `center`,
              // transition: "0.5s all ease",
              borderRadius: "0 0 5px 5px",
            }}
          >
            <p style={{ color: "white", fontSize: "0.7em", padding: 5 }}>
              {item}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default BubbleSort
