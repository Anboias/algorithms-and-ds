import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Content from "../components/content"

const sortingAlgorithms = [
  "Merge Sort",
  "Quick Sort",
  "Bubble Sort",
  "Selection Sort",
  "Insertion Sort",
]

const SortingAlgorithmsPage = () => (
  <Layout>
    <Seo title="Home" />
    <Content options={sortingAlgorithms} title="Sorting Algorithms">
      <p>Content test sorting</p>
    </Content>
  </Layout>
)

export default SortingAlgorithmsPage
