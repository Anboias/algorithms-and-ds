import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Content from "../components/content"
import BubbleSort from "../components/sorting/bubblesort"

import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"

const sortingAlgorithms = [
  "Bubble Sort",
  "Merge Sort",
  "Quick Sort",
  "Selection Sort",
  "Insertion Sort",
]

const SortingAlgorithmsPage = () => {
  // Local state
  const [selected, setSelected] = React.useState(-1)
  const [speed, setSpeed] = React.useState(500)
  const [noOfEntries, setNoOfEntries] = React.useState(30)
  const [data, setData] = React.useState(null)

  // Handlers
  const handleSelection = (event: any) => {
    const newId = parseInt(event.target.id)
    setSelected((prevValue) => (prevValue === newId ? -1 : newId))
  }

  // Load random data
  React.useEffect(() => {
    const newData = Array.from({ length: noOfEntries })

    let index = 0
    while (index < newData.length) {
      var randomN = Math.floor(Math.random() * 100) + 1
      if (newData.indexOf(randomN) === -1) {
        newData[index] = randomN
        index++
      }
    }
    setData(newData)
  }, [noOfEntries])

  // Render selected algorithm
  let selectedJSX = null
  if (data) {
    switch (selected) {
      case sortingAlgorithms.indexOf("Bubble Sort"):
        selectedJSX = <BubbleSort data={data} speed={speed} />
        break
      default:
        break
    }
  }

  console.log("speed", speed)

  return (
    <Layout>
      <Seo title="Home" />
      <Content
        handleSelection={handleSelection}
        options={sortingAlgorithms}
        selected={selected}
        setSpeed={setSpeed}
        speed={speed}
        setNoOfEntries={setNoOfEntries}
        noOfEntries={noOfEntries}
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
              marginTop: -5,
              marginBottom: 5,
              padding: 0,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Box width={300}>
              <span style={{ fontSize: 14, color: "gray", marginLeft: 5 }}>
                Entries
              </span>
              <Slider
                aria-label="Entries"
                defaultValue={noOfEntries}
                onChange={(event) => setNoOfEntries(event.target.value)}
                // getAriaValueText={noOfEntries}
                marks
                min={20}
                max={60}
                step={5}
                style={{ marginTop: -5 }}
                valueLabelDisplay="auto"
              />
            </Box>
            <Box width={300}>
              <span style={{ fontSize: 14, color: "gray" }}>Speed</span>
              <Slider
                aria-label="Speed"
                defaultValue={speed}
                onChange={(event) => setSpeed(event.target.value)}
                // getAriaValueText={noOfEntries}
                marks
                min={25}
                max={800}
                step={50}
                style={{ marginTop: -5 }}
                valueLabelDisplay="auto"
              />
            </Box>
          </div>
          {selectedJSX}
        </div>
      </Content>
    </Layout>
  )
}

export default SortingAlgorithmsPage
