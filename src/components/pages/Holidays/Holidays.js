import React from 'react';
import { Button } from 'reactstrap';
import holidaysData from '../../../helpers/data/holidaysData';
import authRequests from '../../../helpers/data/authRequests';
import PrintHolidayCard from '../../PrintHolidayCard/PrintHolidayCard';
import './Holidays.scss';


class Holidays extends React.Component {
  state = {
    holidays: [],
  }

  getHolidays = () => {
    const uid = authRequests.getCurrentUid();
    holidaysData.getAllHolidays(uid)
      .then((holidays) => {
        this.setState({ holidays });
      })
      .catch((err) => {
        console.error('error with holiday GET', err);
      });
  };

  componentDidMount() {
    this.getHolidays();
  }

  deleteSingleHoliday = (holidayId) => {
    holidaysData.deleteHoliday(holidayId)
      .then(() => {
        this.getHolidays();
      });
  }

  passHolidayToEdit = (holidayId) => {
    this.setState({ editId: holidayId });
    this.props.history.push(`/holidays/${holidayId}/edit`);
  }

  newHolidayView = () => {
    this.props.history.push('/holidays/new');
  }

  render() {
    const holidaysCards = this.state.holidays.map(holiday => (
      <PrintHolidayCard
        key={holiday.id}
        holiday={holiday}
        deleteSingleHoliday={this.deleteSingleHoliday}
        passHolidayToEdit={this.passHolidayToEdit}
      />
    ));
    return (
      <div className="holidays mx-auto">
        <h2>Holidays</h2>
        <Button className="btn btn-secondary mt-5" id="addHoliday" onClick={this.newHolidayView}>Add Holiday</Button>
        <div className="row justify-content-center">{holidaysCards}</div>
      </div>
    );
  }
}

export default Holidays;
