import React from 'react';
import './Holidays.scss';
import { Button } from 'reactstrap';

class Holidays extends React.Component {
  holidayDetailsView = (e) => {
    const holidayId = e.target.id;
    this.props.history.push(`/holidays/${holidayId}`);
  }

  render() {
    return (
      <div className="holidays mx-auto">
        <Button className="btn btn-danger mt-5" id="holidayDetails" onClick={this.holidayDetailsView}>Holiday Details</Button>
      </div>
    );
  }
}

export default Holidays;
