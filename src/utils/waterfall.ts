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

export interface PackerRect {
  w: number
  h: number
  x: number
  y: number
}

// Fork from https://github.com/mapbox/potpack
interface PackerOptions {
  maxWidth: number
  gapX: number
  gapY: number
}

export const CELL_SIZE = 32
export const CELL_GAP = 12
export const BOX_SIZES: AnyMap = {
  '2x0.5': { w: 4 * CELL_SIZE + 3 * CELL_GAP, h: CELL_SIZE },
  '1x1': { w: 2 * CELL_SIZE + CELL_GAP, h: 2 * CELL_SIZE + CELL_GAP },
  '2x1': { w: 4 * CELL_SIZE + 3 * CELL_GAP, h: 2 * CELL_SIZE + CELL_GAP },
  '2x2': { w: 4 * CELL_SIZE + 3 * CELL_GAP, h: 4 * CELL_SIZE + 3 * CELL_GAP }
}

export function packer<T extends PackerRect>(boxes: T[], { maxWidth, gapX, gapY }: PackerOptions) {
  // start with a single empty space, unbounded at the bottom
  const spaces = [{ x: 0, y: 0, w: maxWidth, h: Infinity }]

  for (const box of boxes) {
    // look through spaces backwards so that we check smaller spaces first
    for (let i = spaces.length - 1; i >= 0; i--) {
      const space = spaces[i]

      // look for empty spaces that can accommodate the current box
      if (box.w > space.w || box.h > space.h) continue

      // found the space; add the box to its top-left corner
      // |-------|-------|
      // |  box  |       |
      // |_______|       |
      // |         space |
      // |_______________|
      box.x = space.x
      box.y = space.y

      if (box.w === space.w && box.h === space.h) {
        // space matches the box exactly; remove it
        const last = spaces.pop()

        if (i < spaces.length) {
          spaces[i] = last!
        }
      } else if (box.h === space.h) {
        // space matches the box height; update it accordingly
        // |-------|---------------|
        // |  box  | updated space |
        // |_______|_______________|
        space.x += box.w + gapX
        space.w -= box.w + gapX
      } else if (box.w === space.w) {
        // space matches the box width; update it accordingly
        // |---------------|
        // |      box      |
        // |_______________|
        // | updated space |
        // |_______________|
        space.y += box.h + gapY
        space.h -= box.h + gapY
      } else {
        // otherwise the box splits the space into two spaces
        // |-------|-----------|
        // |  box  | new space |
        // |_______|___________|
        // | updated space     |
        // |___________________|
        spaces.push({
          x: space.x + box.w + gapX,
          y: space.y,
          w: space.w - (box.w + gapX),
          h: box.h
        })
        space.y += box.h + gapY
        space.h -= box.h + gapY
      }
      break
    }
  }

  return boxes
}
