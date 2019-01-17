import React from 'react';
import friendShape from '../../helpers/propz/friendShape';
import authRequests from '../../helpers/data/authRequests';

import './PrintFriendCard.scss';

class PrintFriendCard extends React.Component {
  static propTypes = {
    friend: friendShape.friendShape,
  }

  friendClick = (e) => {
    e.stopPropagation();
    const { friend, onSelect } = this.props;
    onSelect(friend.id);
  }

  render() {
    const { friend } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (friend.uid === uid) {
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
      <div className="card col-3 mt-3 mr-1">
        <h5 className="card-header">{friend.name}</h5>
        <div className="card-body">
          <p className="card-text">{friend.address}</p>
          <p className="card-text">{friend.phoneNumber}</p>
          <p className="card-text">{friend.email}</p>
          <p className="card-text">{friend.relationship}</p>
          {makeButtons()}
        </div>
      </div>
    );
  }
}

export default PrintFriendCard;
