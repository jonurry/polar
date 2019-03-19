import PropTypes from "prop-types"
import React from "react"
import { makeColour } from "../utils/colour.js"

const Polarity = ({ polarity }) => (
  <div>
    <b>Overall polarity score:</b>
    <div
      style={{
        backgroundColor: makeColour(polarity / 100),
        borderColor: makeColour(
          (polarity + 15 > 100 ? 100 : polarity + 15) / 100
        ),
        borderRadius: "1.5em",
        borderStyle: "dashed",
        borderWidth: ".1em",
        color: "#333",
        fontSize: "1.5em",
        height: "3em",
        lineHeight: "2.8em",
        textAlign: "center",
        width: "3em",
      }}
    >
      <b>{polarity}</b>
    </div>
  </div>
)

Polarity.propTypes = {
  polarity: PropTypes.number,
}

Polarity.defaultProps = {
  polarity: 0,
}

export default Polarity
