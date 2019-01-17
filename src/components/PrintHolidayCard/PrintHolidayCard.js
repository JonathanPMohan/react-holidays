import React from 'react';
// import holidayShape from '../../helpers/propz/holidayShape';

import './PrintHolidayCard.scss';
import authRequests from '../../helpers/data/authRequests';

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
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (holiday.uid === uid) {
        return (
          <div>
            <span className="col">
              <button className="btn btn-secondary">
                <i className="fas fa-pencil-alt"></i>
              </button>
            </span>
            <span className="col">
              <button className="btn btn-secondary">
                <i className="fas fa-trash-alt"></i>
              </button>
            </span>
          </div>
        );
      }
      return <span className="col-2"></span>;
    };
    return (
      <div className="card col-5 mt-3 mr-1">
        <h5 className="card-header">{holiday.name}</h5>
        <div className="card-body">
          <img className="card-img-top" src={holiday.imageUrl} alt={holiday.name} />
          <p className="card-text">{holiday.Date}</p>
          <p className="card-text">{holiday.location}</p>
          <p className="card-text">{holiday.startTime}</p>
          {makeButtons()}
        </div>
      </div>
    );
  }
}


export default PrintHolidayCard;
