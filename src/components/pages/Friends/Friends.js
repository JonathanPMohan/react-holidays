import React from 'react';
import { Button } from 'reactstrap';
import './Friends.scss';

class Friends extends React.Component {
  changeView = (e) => {
    const friendId = e.target.id;
    this.props.history.push(`/friends/${friendId}/edit`);
  }

  render() {
    return (
      <div className="friends mx-auto">
        <Button className="btn btn-secondary mt-5" id="editFriend" onClick={this.changeView}>Edit Friend</Button>
      </div>
    );
  }
}

export default Friends;
