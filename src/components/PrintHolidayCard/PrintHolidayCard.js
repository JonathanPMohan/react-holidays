import React from 'react';
// import holidayShape from '../../helpers/propz/holidayShape';

import './PrintHolidayCard.scss';

class PrintHolidayCard extends React.Component {
  static propTypes = {
    // holiday: holidayShape.holidayShape,
  }

  holidayClick = (e) => {
    e.stopPropagation();
    const { holiday, onSelect } = this.props;
    onSelect(holiday.id);
  }

  render() {
    const { holiday } = this.props;
    return (
      <div className="card col-5 mt-3 mr-1">
        <h5 className="card-header">{holiday.name}</h5>
        <div className="card-body">
          <img className="card-img-top" src={holiday.imageUrl} alt={holiday.name} />
          <p className="card-text">{holiday.Date}</p>
          <p className="card-text">{holiday.location}</p>
          <p className="card-text">{holiday.startTime}</p>
        </div>
      </div>
    );
  }
}


export default PrintHolidayCard;
