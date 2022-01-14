import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import Content from "../../components/content"
import BubbleSort from "./bubblesort"

const sortingAlgorithms = [
  "Merge Sort",
  "Quick Sort",
  "Bubble Sort",
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
    setSelected(prevValue => (prevValue === newId ? -1 : newId))
  }

  switch (selected) {
    case sortingAlgorithms.indexOf("Bubble Sort"):
      selectedJSX = <BubbleSort data={[123, 32, 5, 10, 1, 100]} />
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
        {selectedJSX}
      </Content>
    </Layout>
  )
}

export default SortingAlgorithmsPage
