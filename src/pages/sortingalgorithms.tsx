import * as React from "react"
import AddIcon from "@mui/icons-material/Add"
import { algos } from "../components/sorting/algorithms"
import BarsComponent from "../components/sorting/barscomponent"
import { Box, Button, Slider } from "@mui/material"
import classes from "../components/content.classes"
import constants from "../constants"
import Content from "../components/content"
import FastForwardIcon from "@mui/icons-material/FastForward"
import Layout from "../components/layout"
import PauseIcon from "@mui/icons-material/Pause"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import ReplayIcon from "@mui/icons-material/Replay"
import Seo from "../components/seo"
import Tooltip from "@mui/material/Tooltip"
import useTimeout from "../components/hooks/usetimeout"

const STATUS = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  FINISHED: "FINISHED",
  RESTART: "RESTART",
  SPEED_CHANGED: "SPEED_CHANGED",
}

const algorithmsNames = [
  "Bubble Sort",
  "Insertion Sort",
  "Selection Sort",
  "Merge Sort",
  "Quick Sort",
]

const SortingAlgorithmsPage = () => {
  // Local state
  const [selected, setSelected] = React.useState(0) // Show bubble first as default
  const [speed, setSpeed] = React.useState(-150)
  const [noOfEntries, setNoOfEntries] = React.useState(25)
  const [data, setData] = React.useState([])
  const [running, setRunning] = React.useState(STATUS.NOT_STARTED)
  const [sortedValues, setSortedValues] = React.useState(new Set())

  // Local state refs
  const initialData = React.useRef(null)
  const currentIndex = React.useRef(0)
  const timeouts = React.useRef(null)
  const savedSteps = React.useRef(null)
  const twoNumbersSelection = React.useRef([])

  // Update data table with new values on entries change
  React.useEffect(() => {
    generateNewRandomData()
  }, [noOfEntries, selected])

  // Update data table with new values on entries change
  React.useEffect(() => {
    if (running === STATUS.SPEED_CHANGED) setRunning(STATUS.IN_PROGRESS)
    if (running === STATUS.RESTART || running === STATUS.SPEED_CHANGED)
      handleSorting()
  }, [data, running])

  // Handlers
  const handleSelection = (event: any) => {
    const newId = parseInt(event.target.id)
    setSelected((prevValue) => (prevValue === newId ? -1 : newId))
  }

  // Load random data
  const generateNewRandomData = () => {
    // Clean running processes
    handleStop(true)

    // Handle numbers generator
    const newData = Array.from({ length: noOfEntries })
    let index = 0
    while (index < newData.length) {
      var randomN = Math.floor(Math.random() * noOfEntries) + 1
      if (newData.indexOf(randomN) === -1) {
        newData[index] = randomN
        index++
      }
    }
    initialData.current = newData.slice()
    setData(newData)
    // const tempData = [38, 27, 43, 3, 9, 82, 10]
    // setData(tempData)
    setSortedValues(new Set())
  }

  // Start the sort
  const handleSorting = () => {
    if (running === STATUS.FINISHED) {
      generateNewRandomData()
      setRunning(STATUS.RESTART)
    } else {
      setRunning(STATUS.IN_PROGRESS)

      let sortingSteps = null
      if (currentIndex.current > 0) sortingSteps = savedSteps.current.slice()
      else {
        if (selected === 0) sortingSteps = algos.bubbleSort(data)
        else if (selected === 1) sortingSteps = algos.insertionSort(data)
        else if (selected === 2) sortingSteps = algos.selectionSort(data)
        else if (selected === 3) sortingSteps = algos.mergeSort(data)

        console.log("sortingSteps", sortingSteps)
        console.log(
          "===== sortingSteps",
          sortingSteps.filter((el) => el[3] === "4")
        )

        sortingSteps.push([-1, -1, false, null, true])
        savedSteps.current = []
        savedSteps.current.push(...sortingSteps)
      }

      let counter = 0
      for (
        let index = currentIndex.current;
        index < sortingSteps.length;
        index++, counter++
      ) {
        const orderEl = sortingSteps[index]

        // Destructure el
        let [firstEl, secondEl, swap, sortedValue, lastEl]: number[] = orderEl

        // Update state to trigger re-render. Do it with a timeout
        timeouts.current = setTimeout(() => {
          currentIndex.current += 1

          if (lastEl) {
            setRunning(STATUS.FINISHED)
            // Set local data to trigger a final render
            setData((prevValues: number[]) => [...prevValues])
            // Add the remaining elements to the values sorted array
            sortingSteps?.forEach((el) => sortedValues.add(el))
          } else {
            setData((prevValues: number[]) => {
              const indexOfFirst = prevValues.indexOf(firstEl)
              const indexOfSecond = prevValues.indexOf(secondEl)

              if (swap) {
                // ES6 - switch values
                ;[prevValues[indexOfFirst], prevValues[indexOfSecond]] = [
                  prevValues[indexOfSecond],
                  prevValues[indexOfFirst],
                ]
              }

              const containerWidth =
                document.getElementById("bars-container")?.clientWidth ||
                window.innerWidth - 20 // Guessed offset

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

              twoNumbersSelection.current =
                selected === algorithmsNames.indexOf("Selection Sort")
                  ? [Math.max(firstEl, secondEl), Math.min(firstEl, secondEl)]
                  : [Math.min(firstEl, secondEl), Math.max(firstEl, secondEl)]
              // Add to sorted Set if existing
              if (sortedValue)
                setSortedValues((prevValues) => {
                  prevValues.add(sortedValue)
                  return prevValues
                })

              // twoNumbersSelection.current[1] = secondEl
              return prevValues.slice()
            })
          }
        }, speed * -1 * (counter + 1))
      }
    }
  }

  const handleStop = (finish = false) => {
    if (running === STATUS.IN_PROGRESS || running === STATUS.SPEED_CHANGED) {
      while (timeouts.current--) window.clearTimeout(timeouts.current)
    }
    if (running === STATUS.FINISHED || finish === true) {
      currentIndex.current = 0
      savedSteps.current = null
      twoNumbersSelection.current[0] = null
      twoNumbersSelection.current[1] = null
    }
    setData((prevData) => [...prevData])
    setRunning(STATUS.NOT_STARTED)
    initialData?.current?.forEach((el: number) => {
      try {
        document.getElementById(`bar-${el}`).style === null
      } catch (err) {}
    })
  }

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value)
    handleStop()
    setRunning(STATUS.SPEED_CHANGED)
  }

  return (
    <Layout>
      <Seo title="Home" />
      <Content
        handleSelection={handleSelection}
        options={algorithmsNames}
        selected={selected}
        title="Sorting Algorithms"
      >
        <div
          style={{
            border: "1px dotted rgba(12,12,12,0.02)",
            height: "100%",
          }}
        >
          <div
            style={{
              padding: 0,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "50%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  color: "gray",
                }}
              >
                <Tooltip title="Number of entries" placement="top">
                  <AddIcon style={{ marginRight: 7, fontSize: 18 }} />
                </Tooltip>
                <Slider
                  aria-label="Entries"
                  defaultValue={noOfEntries}
                  onChange={(event) => setNoOfEntries(event.target.value)}
                  min={5}
                  max={100}
                  valueLabelDisplay="auto"
                />
              </div>
              <div
                style={{
                  marginLeft: 25,
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  color: "gray",
                }}
              >
                <Tooltip title="Delay between operations" placement="top">
                  <FastForwardIcon style={{ marginRight: 7, fontSize: 18 }} />
                </Tooltip>
                <Slider
                  aria-label="Speed"
                  defaultValue={speed}
                  onChange={handleSpeedChange}
                  min={-1000}
                  max={-1}
                  step={25}
                  valueLabelDisplay="auto"
                  valueLabelFormat={`${
                    speed * -1 === 1000
                      ? "1 second"
                      : `${speed * -1} milliseconds`
                  }`}
                />
              </div>
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                width: "30%",
              }}
            >
              <Button
                startIcon={<ReplayIcon />}
                onClick={generateNewRandomData}
                style={{ padding: "4px 10px" }}
                sx={classes.button}
              >
                Shuffle
              </Button>
              {running === STATUS.IN_PROGRESS ? (
                <Button
                  className="active"
                  startIcon={<PauseIcon />}
                  onClick={handleStop}
                  style={{
                    marginLeft: 10,
                    marginRight: 5,
                    padding: "4px 10px",
                  }}
                  sx={classes.button}
                >
                  Pause
                </Button>
              ) : (
                <Button
                  startIcon={<PlayArrowIcon sx={{}} />}
                  onClick={handleSorting}
                  style={{
                    marginLeft: 10,
                    marginRight: 5,
                    padding: "4px 10px",
                  }}
                  sx={classes.button}
                >
                  Start
                </Button>
              )}
            </Box>
          </div>
          <BarsComponent
            data={data}
            sortedValues={sortedValues}
            twoNumbersSelection={twoNumbersSelection}
          />
        </div>
      </Content>
    </Layout>
  )
}

export default SortingAlgorithmsPage
