import * as React from "react"
import { Button } from "@mui/material"
import { algos } from "../../components/sorting/algorithms/sorting"
import constants from "../../constants"

interface BubbleSortI {
  data?: number[]
  speed: number
}

const BubbleSort = ({ data, speed }: BubbleSortI) => {
  // Store values locally and changed them while sorting
  const [localData, setLocalData] = React.useState(null)

  // Constants
  const [max, min] = React.useMemo(
    () => [Math.max(...data), Math.min(...data)],
    [data]
  )
  const calcWidth = 100 / data.length
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

      // console.log("before delay", speed)

      // Add delay to the execution
      await doDelay(speed)

      // console.log("after delay", speed)
      // console.log("====================")

      setLocalData((prevValues: number[]) => {
        const indexOfFirst = prevValues.indexOf(firstEl)
        const indexOfSecond = prevValues.indexOf(secondEl)

        if (swap) {
          prevValues[indexOfFirst] = secondEl
          prevValues[indexOfSecond] = firstEl
        }

        const containerWidth =
          document.getElementById("bars-container").clientWidth

        const offset = containerWidth / data.length

        if (firstEl && secondEl) {
          // Slide first bar
          const leftEl = document.getElementById(`bar-${firstEl}`)
          if (leftEl)
            leftEl.style.transform = `translate(${
              firstEl > secondEl ? offset : 0
            }px,0)`

          // Slide second bar
          const rightEl = document.getElementById(`bar-${secondEl}`)
          if (rightEl)
            rightEl.style.transform = `translate(${
              secondEl > firstEl ? 0 : -offset
            }px,0)`
        }

        twoNumbersSelection.current = [
          Math.min(firstEl, secondEl),
          Math.max(firstEl, secondEl),
        ]
        // twoNumbersSelection.current[1] = secondEl
        return prevValues.slice()
      })
    }
    // Set local data to trigger a final render
    setLocalData((prevValues: number[]) => [...prevValues])
    // Add the remaining elements to the values sorted array
    sortingSteps.forEach((el) => sortedValues.add(el))
  }, [speed])

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

  // console.log("test")

  return (
    <div
      id="bars-container"
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        // transition: "1s all ease",
      }}
    >
      {localData?.map((item: number, idx: number) => {
        const calcHeight = ((max - min) / 100) * item

        return (
          <div
            id={`bar-${item}`}
            key={`${idx}-${item}`}
            style={{
              height: `calc(${calcHeight}% - 60px)`,
              minHeight: `30px`,
              width: `calc(${calcWidth}% - .3em)`,
              backgroundColor: sortedValues.has(item)
                ? constants.COLORS.DARK_GREEN
                : twoNumbersSelection.current[0] === item
                ? constants.COLORS.LEFT_BAR
                : twoNumbersSelection.current[1] === item
                ? constants.COLORS.RIGHT_BAR
                : constants.COLORS.CURRENT,
              margin: `0 .15em`, // Change logic to fit in 100%
              display: `flex`,
              justifyContent: `center`,
              borderRadius: "0 0 5px 5px",
              transition: "all 0.2s ease-in-out",
              "webkit-transition": "all 0.2s ease-in-out",
              "-moz-transition": "all 0.2s ease-in-out",
              "-o-transition": "all 0.2s ease-in-out",
              "-ms-transition": "all 0.2s ease-in-out",
            }}
          >
            <p
              style={{
                color: sortedValues.has(item)
                  ? "white"
                  : twoNumbersSelection.current[0] === item
                  ? "white"
                  : twoNumbersSelection.current[1] === item
                  ? "white"
                  : constants.COLORS.DARK_GREEN,
                fontSize: "0.7em",
                padding: 5,
              }}
            >
              {item}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default BubbleSort
