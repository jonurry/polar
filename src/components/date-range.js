import React from "react"
import "react-dates/initialize"
import { DateRangePicker } from "react-dates"
import "react-dates/lib/css/_datepicker.css"
import "./date-range.css"
import moment from "moment"

moment.locale("en") // English

class DateRange extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment(props.dateFrom),
      endDate: moment(props.dateTo),
    }
    this.handleDateRange = this.handleDateRange.bind(this)
  }

  handleDateRange(startDate, endDate) {
    if (startDate && endDate) {
      this.props.setDateRange(
        startDate.format("YYYY-MM-DD"),
        endDate.format("YYYY-MM-DD")
      )
    }
  }

  render() {
    const { dateFrom, dateTo, children } = this.props
    return (
      <div style={{ marginBottom: "1.45rem" }}>
        <DateRangePicker
          style={{ boxSizing: "border-box", padding: "0" }}
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId={dateFrom} // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId={dateTo} // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }) => {
            this.setState({ startDate, endDate })
            this.handleDateRange(startDate, endDate)
          }} // PropTypes.func.isRequired,
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
