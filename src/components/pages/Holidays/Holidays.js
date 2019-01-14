import React from 'react';
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

  render() {
    const holidaysCards = this.state.holidays.map(holiday => (
      <PrintHolidayCard
        key={holiday.id}
        holiday={holiday}
      />
    ));
    return (
      <div className="holidays mx-auto">
        <h2>Holidays</h2>
        <button className="btn btn-secondary">
          <i className="fas fa-plus">Add A Holiday</i>
        </button>
        <div className="row justify-content-center">{holidaysCards}</div>
      </div>
    );
  }
}

export default Holidays;
