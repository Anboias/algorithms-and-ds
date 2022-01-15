import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Content from "../components/content"
import BubbleSort from "../components/sorting/bubblesort"

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
  let selectedJSX = null

  // Handlers
  const handleSelection = (event: any) => {
    const newId = parseInt(event.target.id)
    setSelected((prevValue) => (prevValue === newId ? -1 : newId))
  }

  const data: number[] = Array.from({ length: 30 })
  let index = 0

  while (index < data.length) {
    var randomN = Math.floor(Math.random() * 100) + 1
    if (data.indexOf(randomN) === -1) {
      data[index] = randomN
      index++
    }
  }

  switch (selected) {
    case sortingAlgorithms.indexOf("Bubble Sort"):
      selectedJSX = <BubbleSort data={data} />
      break
    default:
      break
  }

  return (
    <Layout>
      <Seo title="Home" />
      <Content
        handleSelection={handleSelection}
        options={sortingAlgorithms}
        selected={selected}
        title="Sorting Algorithms"
      >
        <div
          style={{
            border: "1px dotted rgba(12,12,12,0.02)",
            // backgroundColor: "rgba(12,12,12,0.03)",
            height: "100%",
          }}
        >
          {selectedJSX}
        </div>
      </Content>
    </Layout>
  )
}

export default SortingAlgorithmsPage
