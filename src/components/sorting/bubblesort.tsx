import * as React from "react"
import { Button } from "@mui/material"
import { algos } from "../../components/sorting/algorithms/sorting"
import constants from "../../constants"

interface BubbleSortI {
  data?: number[]
  sortedValues: Set<unknown>
  twoNumbersSelection: any
}

const BubbleSort = ({
  data,
  sortedValues,
  twoNumbersSelection,
}: BubbleSortI) => {
  // Constants
  const [max, min] = React.useMemo(
    () => (data ? [Math.max(...data), Math.min(...data)] : null),
    [data]
  )
  const calcWidth = 100 / data.length

  // // Initialize vars
  // React.useEffect(() => {
  //   setLocalData(data)
  //   sortedValues.clear()
  //   twoNumbersSelection.current = []
  // }, [data])

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
      {data ? (
        data.map((item: number, idx: number) => {
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
                {data?.length <= 50 ? item : ""}{" "}
              </p>
            </div>
          )
        })
      ) : (
        <h1>Error</h1>
      )}
    </div>
  )
}

export default BubbleSort
