import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import logo from "../images/polar-2.png"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#FC4C02`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <img
            src={logo}
            alt="Polar Logo"
            style={{ height: "2.25rem", float: `left` }}
          />
          {siteTitle.slice(1)}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
