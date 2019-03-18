import React from "react"
import "react-dates/initialize"
import { DateRangePicker } from "react-dates"
import "react-dates/lib/css/_datepicker.css"
import moment from "moment"

let focusedDate = null
moment.locale("en") // English

class DateRange extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment(props.dateFrom),
      endDate: moment(props.dateTo),
    }
  }
  render() {
    const { dateFrom, dateTo, children } = this.props
    return (
      <div
        style={{ boxSizing: "border-box" }}
        // css={css`
        //   margin: 0 auto;
        //   max-width: 700px;
        //   padding: ${rhythm(2)};
        //   padding-top: ${rhythm(1.5)};
        // `}
      >
        <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId={dateFrom} // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId={dateTo} // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) =>
            this.setState({ startDate, endDate })
          } // PropTypes.func.isRequired,
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          isOutsideRange={day => moment().diff(day) < 0}
        />
        {children}
      </div>
    )
  }
}

export default DateRange
