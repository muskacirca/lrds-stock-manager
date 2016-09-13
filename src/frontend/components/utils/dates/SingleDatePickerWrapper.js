import React from 'react'

import moment from 'moment'
import DateTime from 'react-datetime';

class SingleDatePickerWrapper extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      date: null,
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDateChange(date) {
    console.log("date : " + JSON.stringify(date));
    this.setState({ date });
  }

  onFocusChange() {
    console.log("focus changed");
    this.setState({open: !this.state.open });
  }

  render() {
    const { focused, date } = this.state;

    return (
      <DateTime />
    );
  }
}

export default SingleDatePickerWrapper;
