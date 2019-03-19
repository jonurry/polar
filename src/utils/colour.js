/**
 * Modified from a stack overflow answer:
 * https://stackoverflow.com/questions/4161369/html-color-codes-red-to-yellow-to-green
 * Answered by: Ascendant (https://stackoverflow.com/users/751738/ascendant)
 * Converts integer to a hexadecimal code, pre-pads single
 * digit hex codes with 0 to always return a two digit code.
 *
 * @param {Integer} i Integer to convert
 * @returns {String} The hexadecimal code
 **/
const intToHex = i => {
  const hex = parseInt(i).toString(16)
  return hex.length < 2 ? "0" + hex : hex
}

/**
 * Return hex colour from scalar *value*.
 *
 * @param {float} value Scalar value between 0 and 1
 * @return {String} color
 */
export const makeColour = value => {
  // value must be between [0, 510]
  let scaledValue = Math.min(Math.max(0, value), 1) * 510
  let redValue
  let greenValue

  if (scaledValue < 255) {
    redValue = 255
    greenValue = Math.sqrt(scaledValue) * 16
    greenValue = Math.round(greenValue)
  } else {
    greenValue = 255
    scaledValue -= 255
    redValue = 255 - (scaledValue * scaledValue) / 255
    redValue = Math.round(redValue)
  }

  return `#${intToHex(redValue)}${intToHex(greenValue)}00`
}
