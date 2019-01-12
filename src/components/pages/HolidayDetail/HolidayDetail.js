import React from 'react';
import { Button } from 'reactstrap';
import './HolidayDetail.scss';

class HolidayDetail extends React.Component {
  editHolidayView = (e) => {
    const holidayId = e.target.id;
    this.props.history.push(`/holidays/${holidayId}/edit`);
  }

  holidayFriendsView = (e) => {
    const holidayFriendId = e.target.id;
    this.props.history.push(`/holidays/${holidayFriendId}/friends`);
  }

  render() {
    return (
      <div className="holidayDetail mx-auto">
        <Button className="btn btn-success mt-5" id="editHoliday">Edit Holiday</Button>
        <Button className="btn btn-warning mt-5" id="holidayFriends" >Holiday Friends</Button>
      </div>
    );
  }
}

export default HolidayDetail;
