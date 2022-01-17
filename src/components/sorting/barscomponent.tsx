import * as React from "react"
import constants from "../../constants"

interface BarsComponentI {
  data?: number[]
  sortedValues: Set<unknown>
  twoNumbersSelection: any
}

const BarsComponent = ({
  data,
  sortedValues,
  twoNumbersSelection,
}: BarsComponentI) => {
  // Constants
  const [max, min] = React.useMemo(
    () => (data ? [Math.max(...data), Math.min(...data)] : null),
    [data]
  )
  const calcWidth = 100 / data.length

  return (
    <div
      id="bars-container"
      style={{
        display: "flex",
        flexDirection: "row",
        height: "90%",
        // transition: "1s all ease",
      }}
    >
      {data ? (
        data.map((item: number, idx: number) => {
          const calcHeight = (100 / max) * item

          return (
            <div
              id={`bar-${item}`}
              key={`${idx}-${item}`}
              style={{
                height: `calc(${calcHeight}% )`,
                minHeight: `12px`,
                width: `calc(${calcWidth}% - .1em)`,
                backgroundColor: sortedValues.has(item)
                  ? constants.COLORS.DARK_GREEN
                  : twoNumbersSelection.current[0] === item
                  ? constants.COLORS.LEFT_BAR
                  : twoNumbersSelection.current[1] === item
                  ? constants.COLORS.RIGHT_BAR
                  : constants.COLORS.CURRENT,
                margin: `0 .05em`, // Change logic to fit in 100%
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
                  fontSize: data?.length <= 50 ? "0.7em" : "0.3em",
                  padding: 5,
                }}
              >
                {item}
                {/* {data?.length <= 50 ? item : ""}{" "} */}
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

export default BarsComponent
