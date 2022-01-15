export const algos = {
  bubbleSortAlgorithm: (data, delay = 1500) => {
    const dupBlocks = data.slice()
    const order = []

    let i, j // i: advance index; j: sorted element index - 1

    // [j, j + 1, null, null] - selection1; selection2; swapped; fixed value
    for (i = 0; i < dupBlocks.length; i++) {
      for (j = 0; j < dupBlocks.length - i - 1; j++) {
        order.push([j, j + 1, null, null]) // Compare
        if (dupBlocks[j] > dupBlocks[j + 1]) {
          swap(dupBlocks, j, j + 1)
          order.push([j, j + 1, true, null]) // Swap
        }
      }
      order.push([null, null, null, dupBlocks[j]]) // j-th element is in correct position ( Sorted )
    }
    console.log("newOrder", order)
    return order
    // return order.map(
    //   (el) => new Promise((resolve) => setTimeout(resolve(el), delay))
    // )
    // return order.map((orderEl) => {
    //   return new Promise((resolve) => {
    //     return setTimeout(() => resolve(orderEl), delay)
    //   })
    // })
  },
}

const swap = (arr, i, j) => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
