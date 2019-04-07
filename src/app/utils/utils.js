// eslint-disable-next-line import/prefer-default-export
export const generateTwoDiemesionArray = (width, height) => {
  let idxHeight = 0
  const blankArray = []
  while (idxHeight < height) {
    blankArray.push(new Array(width))
    idxHeight += 1
  }
  return blankArray
}
