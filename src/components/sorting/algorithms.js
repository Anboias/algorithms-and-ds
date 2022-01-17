/**
 * Helpers
 */
const swap = (arr, i, j) => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

export const algos = {
  bubbleSort: (data) => {
    const result = []
    const blocks = [...data]

    let i, j // i: advance index; j: sorted element index - 1

    // [j, j + 1, null, null] - selection1; selection2; swapped; fixed value
    for (i = 0; i < blocks.length; i++) {
      for (j = 0; j < blocks.length - i - 1; j++) {
        const firstEl = blocks[j]
        const secondEl = blocks[j + 1]
        result.push([firstEl, secondEl, null, null])
        if (firstEl > secondEl) {
          swap(blocks, j, j + 1)
          result.push([firstEl, secondEl, true, null]) // Swap
        }
      }
      result.push([null, null, null, blocks[j]]) // j-th element is in correct position ( Sorted )
    }
    return result
  },
  insertionSort: (data) => {
    const blocks = [...data]
    const result = []

    let i, j, alreadyPushed

    for (i = 0; i < blocks.length; i++) {
      j = i - 1
      if (i !== 0) {
        result.push([blocks[j], blocks[i], null, null])
        alreadyPushed = true
      }

      while (j >= 0 && blocks[j] > blocks[j + 1]) {
        const firstEl = blocks[j]
        const secondEl = blocks[j + 1]
        // result.push([firstEl, secondEl, null, null]) // Swap
        swap(blocks, j, j + 1)
        if (alreadyPushed) alreadyPushed = false
        else result.push([firstEl, secondEl, null, null]) // Swap
        result.push([firstEl, secondEl, true, null]) // Swap
        // result.push([firstEl, secondEl, null, null])
        j -= 1
      }
    }

    for (i = 1; i <= blocks.length; i++) {
      result.push([null, null, null, i]) // Add at the end all elements in their sorded order
    }

    return result
  },
  selectionSort: (data) => {
    const blocks = [...data]
    const result = []

    let i, j

    for (i = 0; i < blocks.length; i++) {
      for (j = i + 1; j < blocks.length; j++) {
        result.push([blocks[i], blocks[j], null, null]) // Compare
        if (blocks[i] > blocks[j]) {
          swap(blocks, i, j)
          result.push([blocks[i], blocks[j], true, null]) // Swap
        }
      }
      result.push([null, null, null, blocks[i]]) // i-th element is in correct position ( Sorted )
    }

    return result
  },
}
