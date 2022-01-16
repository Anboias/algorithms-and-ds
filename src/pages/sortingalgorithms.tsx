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
    handleStop()

    // Handle numbers generator
    const newData = Array.from({ length: noOfEntries })
    let index = 0
    while (index < newData.length) {
      var randomN = Math.floor(Math.random() * 100) + 1
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

  // Start the sort
  const handleSorting = () => {
    setRunning(STATUS.IN_PROGRESS)

    console.log("==== DO SORTING ")

    const sortingSteps = algos.bubbleSortAlgorithm(data) // Bubble for now
    sortingSteps.push([-1, -1, false, null, true])

    for (let index = 0; index < sortingSteps.length; index++) {
      const orderEl = sortingSteps[index]
      console.log("still running 1")
      currentIndex.current += 1

      // Destructure el
      const [firstEl, secondEl, swap, sortedValue, lastEl]: number[] = orderEl

      // Update state to trigger re-render. Do it with a timeout
      timeouts.current = setTimeout(() => {
        console.log("still running 2")

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
      }, speed * (index + 1))
    }
  }

  const handleStop = () => {
    if (running === STATUS.IN_PROGRESS) {
      while (timeouts.current--) window.clearTimeout(timeouts.current)
    }
    setData((prevData) => [...prevData])
    setRunning(STATUS.FINISHED)
    twoNumbersSelection.current[0] = null
    twoNumbersSelection.current[1] = null
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
                onClick={generateNewRandomData}
                style={
                  {
                    // marginBottom: 5,
                  }
                }
                sx={{ ...classes.button }}
              >
                Randomize
              </Button>
              <Button
                className={running === STATUS.IN_PROGRESS && "active"}
                onClick={
                  running === STATUS.IN_PROGRESS ? handleStop : handleSorting
                }
                style={{
                  marginLeft: 10,
                  marginRight: 5,
                }}
                sx={{ ...classes.button }}
              >
                {running === STATUS.IN_PROGRESS ? "Stop" : "Start"}
              </Button>
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
