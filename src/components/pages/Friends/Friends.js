import React from 'react';
import { Button } from 'reactstrap';
import friendsData from '../../../helpers/data/friendsData';
import authRequests from '../../../helpers/data/authRequests';
import PrintFriendCard from '../../PrintFriendCard/PrintFriendCard';
import './Friends.scss';

class Friends extends React.Component {
  state = {
    friends: [],
  }

  getFriends = () => {
    const uid = authRequests.getCurrentUid();
    friendsData.getAllFriends(uid)
      .then((friends) => {
        this.setState({ friends });
      })
      .catch((err) => {
        console.error('error with friends GET', err);
      });
  };

  componentDidMount() {
    this.getFriends();
  }

  newFriendView = () => {
    this.props.history.push('/friends/new');
  }

  render() {
    const printFriend = this.state.friends.map(friend => (
      <PrintFriendCard
        key={friend.id}
        friend={friend}
      />
    ));
    return (
      <div className="friends mx-auto">
        <h2>Friends</h2>
        <Button className="btn btn-secondary mt-5" id="editFriend" onClick={this.newFriendView}>Add Friend</Button>
        <div className="row justify-content-center">{printFriend}</div>
      </div>
    );
  }
}

export default Friends;
