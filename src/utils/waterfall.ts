export function waterfall<T>(
  list: T[],
  columnLength: number,
  calcHeight: (row: T, index?: number) => number
) {
  const result = Array.from<T[]>({ length: columnLength }).map(() => [] as T[])
  const heights = Array.from<number>({ length: columnLength }).fill(0)

  list.forEach((row, index) => {
    const rowHeight = calcHeight(row, index)
    const minHeight = Math.min(...heights)
    const k = heights.indexOf(minHeight)

    heights[k] += rowHeight
    result[k].push(row)
  })

  return result
}
