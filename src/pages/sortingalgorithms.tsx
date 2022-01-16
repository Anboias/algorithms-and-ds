import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Content from "../components/content"
import SortingTable from "../components/sorting/bubblesort"

import { algos } from "../components/sorting/algorithms/sorting"

import { Box, Button, Slider } from "@mui/material"
import FastForwardIcon from "@mui/icons-material/FastForward"
import AddIcon from "@mui/icons-material/Add"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import ReplayIcon from "@mui/icons-material/Replay"

import useTimeout from "../components/hooks/usetimeout"

import constants from "../constants"
import classes from "../components/content.classes"

const sortingAlgorithms = [
  "Bubble Sort",
  "Merge Sort",
  "Quick Sort",
  "Selection Sort",
  "Insertion Sort",
]

const STATUS = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  FINISHED: "FINISHED",
  RESTART: "RESTART",
}

const SortingAlgorithmsPage = () => {
  // Local state
  const [selected, setSelected] = React.useState(0) // Show bubble first as default
  const [speed, setSpeed] = React.useState(500)
  const [noOfEntries, setNoOfEntries] = React.useState(25)
  const [data, setData] = React.useState([])
  const [running, setRunning] = React.useState(STATUS.NOT_STARTED)
  const [sortedValues, setSortedValues] = React.useState(new Set())

  const initialData = React.useRef(null)
  const currentIndex = React.useRef(0)
  const timeouts = React.useRef(null)
  const savedSteps = React.useRef(null)

  // Constants
  const [max, min] = React.useMemo(
    () => [Math.max(...data), Math.min(...data)],
    [data]
  )
  const calcWidth = 100 / data.length
  const twoNumbersSelection = React.useRef([])
  // Do sort - call sorting algorithm
  const sortingSteps = React.useMemo(
    () => algos.bubbleSortAlgorithm(data),
    [data]
  )

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
      var randomN = Math.floor(Math.random() * 100) + 10
      if (newData.indexOf(randomN) === -1) {
        newData[index] = randomN
        index++
      }
    }
    initialData.current = newData.slice()
    setData(newData)
    setSortedValues(new Set())
  }
  // Update data table with new values on entries change
  React.useEffect(() => {
    generateNewRandomData()
  }, [noOfEntries])

  // Update data table with new values on entries change
  React.useEffect(() => {
    if (running === STATUS.RESTART) {
      handleSorting()
    }
  }, [data, running])

  // Start the sort
  const handleSorting = () => {
    if (running === STATUS.FINISHED) {
      generateNewRandomData()
      setRunning(STATUS.RESTART)
    } else {
      setRunning(STATUS.IN_PROGRESS)

      console.log("==== DO SORTING ")

      let sortingSteps = null
      if (currentIndex.current > 0) sortingSteps = savedSteps.current.slice()
      else {
        sortingSteps = algos.bubbleSortAlgorithm(data) // Bubble for now
        sortingSteps.push([-1, -1, false, null, true])
        savedSteps.current = []
        savedSteps.current.push(...sortingSteps)
      }

      console.log(
        ">>>>>>> BEFORE LOOP",
        currentIndex.current,
        sortingSteps.length
      )

      let counter = 0
      for (
        let index = currentIndex.current;
        index < sortingSteps.length;
        index++, counter++
      ) {
        const orderEl = sortingSteps[index]
        console.log("still running 2")

        // Destructure el
        const [firstEl, secondEl, swap, sortedValue, lastEl]: number[] = orderEl

        // Update state to trigger re-render. Do it with a timeout
        timeouts.current = setTimeout(() => {
          currentIndex.current += 1

          console.log(
            ">>>>>>> still running 1",
            currentIndex.current,
            sortingSteps.length
          )

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
                prevValues[indexOfFirst] = secondEl
                prevValues[indexOfSecond] = firstEl
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

              twoNumbersSelection.current = [
                Math.min(firstEl, secondEl),
                Math.max(firstEl, secondEl),
              ]
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
        }, speed * (counter + 1))
      }
    }
  }

  const handleStop = (finish = false) => {
    if (running === STATUS.IN_PROGRESS) {
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
    // generateNewRandomData()
  }

  console.log("==== initialData.current", initialData.current)
  console.log("==== timeouts.current", timeouts.current)
  console.log("==== currentIndex.current", currentIndex.current)
  console.log("==== running", running)

  return (
    <Layout>
      <Seo title="Home" />
      <Content
        handleSelection={handleSelection}
        options={sortingAlgorithms}
        selected={selected}
        setSpeed={setSpeed}
        speed={speed}
        title="Sorting Algorithms"
      >
        <div
          style={{
            border: "1px dotted rgba(12,12,12,0.02)",
            // backgroundColor: "rgba(12,12,12,0.03)",
            height: "100%",
          }}
        >
          <div
            style={{
              // marginTop: -5,
              // marginBottom: 5,
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
                  // marginLeft: 10,
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  color: "gray",
                }}
              >
                <AddIcon style={{ marginRight: 7, fontSize: 18 }} />
                <Slider
                  aria-label="Entries"
                  defaultValue={noOfEntries}
                  onChange={(event) => setNoOfEntries(event.target.value)}
                  // getAriaValueText={noOfEntries}
                  // marks
                  min={5}
                  max={100}
                  // step={5}
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
                <FastForwardIcon style={{ marginRight: 7, fontSize: 18 }} />
                <Slider
                  aria-label="Speed"
                  defaultValue={speed}
                  onChange={(event) => setSpeed(event.target.value)}
                  // getAriaValueText={noOfEntries}
                  min={25}
                  max={1000}
                  // step={50}
                  valueLabelDisplay="auto"
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
              {/* <span style={{ fontSize: 14, color: "gray" }}>Start</span> */}
              <Button
                startIcon={<ReplayIcon />}
                onClick={generateNewRandomData}
                style={{
                  // marginBottom: 5,
                  padding: "4px 10px",
                }}
                sx={{
                  ...classes.button,
                  // border: `2px solid ${constants.COLORS.SLIDER_BLUE}`,
                }}
              >
                New Values
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
                  sx={{
                    ...classes.button,
                    // border: `2px solid ${constants.COLORS.SLIDER_BLUE}`,
                  }}
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
                  sx={{
                    ...classes.button,
                    // border: `2px solid ${constants.COLORS.SLIDER_BLUE}`,
                  }}
                >
                  Start
                </Button>
              )}
            </Box>
          </div>
          <SortingTable
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
