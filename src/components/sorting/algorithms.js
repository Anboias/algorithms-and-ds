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
  mergeSort: (data) => {
    const blocks = [...data]
    const result = []

    const doDivideAndConquer = (arr, low, high) => {
      if (low < high) {
        const pivot = Math.floor((high + low) / 2)

        console.log("===== ", arr, low, pivot, high)
        doDivideAndConquer(arr, low, pivot)
        doDivideAndConquer(arr, pivot + 1, high)

        doMerge(arr, low, pivot, high, result)
      }
    }

    doDivideAndConquer(blocks, 0, data.length - 1)

    for (let i = 0; i < blocks.length; i++) {
      console.log("result[i]", result[i], i)
      result.push([null, null, null, i]) // i th element will be in correct position
    }

    return result
  },
}

const doMerge = (blocks, low, pivot, high, result) => {
  let i = low
  let j = pivot + 1

  const arr = []

  while (i <= pivot && j <= high) {
    result.push([blocks[i], blocks[j], blocks[i] > blocks[j], null])
    if (blocks[i] <= blocks[j]) {
      arr.push(blocks[i++])
    } else arr.push(blocks[j++])
  }

  while (i <= pivot) {
    result.push([blocks[i], null, null, null])
    arr.push(blocks[i++])
  }
  while (j <= high) {
    result.push([null, blocks[j], null, null])
    arr.push(blocks[j++])
  }

  for (i = low; i <= high; i++) {
    const temp = blocks[i]
    blocks[i] = arr[i - low]
    result.push([blocks[i], temp, true, blocks[i]])
  }
}
