import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import friendsData from '../../../helpers/data/friendsData';
import authRequests from '../../../helpers/data/authRequests';

import './EditFriend.scss';

const defaultFriend = {
  name: '',
  address: '',
  phoneNumber: '',
  email: '',
  relationship: '',
  isAvoiding: false,
  uid: '',
};

class EditFriend extends React.Component {
  static PropTypes = {
    onSubmit: PropTypes.func,
  }

  state = {
    friendEdit: defaultFriend,
    checkValue: false,
    editId: '-1',
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempFriend = { ...this.state.friendEdit };
    tempFriend[name] = e.target.value;
    this.setState({ friendEdit: tempFriend });
  }

  nameChange = e => this.formFieldStringState('name', e);

  addressChange = e => this.formFieldStringState('address', e);

  phoneNumberChange = e => this.formFieldStringState('phoneNumber', e);

  emailChange = e => this.formFieldStringState('email', e);

  relationshipChange = e => this.formFieldStringState('relationship', e);

  addFriendEdit = (friendEdit) => {
    const { editId } = this.state;
    friendsData.updateFriend(friendEdit, editId)
      .then(() => {
        this.props.history.push('/friends');
      });
  }

  checkEvent = (e) => {
    const isAvoiding = e.target.checked;
    this.setState({ checkValue: isAvoiding });
  }

  formSubmit = (e) => {
    e.preventDefault();
    const myFriend = { ...this.state.friendEdit };
    myFriend.uid = authRequests.getCurrentUid();
    myFriend.isAvoiding = this.state.checkValue;
    this.addFriendEdit(myFriend);
    this.setState({ friendEdit: defaultFriend });
  }

  componentDidMount() {
    const firebaseId = this.props.match.params.id;
    friendsData.getSingleFriend(firebaseId)
      .then((friendToEdit) => {
        this.setState({ friendEdit: friendToEdit });
        this.setState({ checkValue: friendToEdit.isAvoiding });
        this.setState({ editId: friendToEdit.id });
      });
  }

  render() {
    const {
      friendEdit,
      checkValue,
    } = this.state;

    return (
      <div className='newFriend mx-auto'>
        <div className="friend-form mt-5">
          <form onSubmit={this.formSubmit}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="name-pre">Name</span>
              </div>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Friend Name"
                aria-describedby="nameHelp"
                value={friendEdit.name}
                onChange={this.nameChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="address-pre">Address</span>
              </div>
              <input
                type="text"
                id="address"
                className="form-control"
                placeholder="Friend Address"
                aria-describedby="addressHelp"
                value={friendEdit.address}
                onChange={this.addressChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="phone-pre">Phone</span>
              </div>
              <input
                type="text"
                id="phoneNumber"
                className="form-control"
                placeholder="555-555-5555"
                aria-describedby="phoneHelp"
                value={friendEdit.phoneNumber}
                onChange={this.phoneNumberChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="email-pre">Email</span>
              </div>
              <input
                type="text"
                id="email"
                className="form-control"
                placeholder="email1999@example.com"
                aria-describedby="emailHelp"
                value={friendEdit.email}
                onChange={this.emailChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="relationship-pre">Relationship</span>
              </div>
              <input
                type="text"
                id="relationship"
                className="form-control"
                placeholder="Relationship"
                aria-describedby="relationshipHelp"
                value={friendEdit.relationship}
                onChange={this.relationshipChange}
              />
            </div>
            <div className="custom-control custom-checkbox" onChange={this.checkEvent}>
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">Avoiding?</label>
            </div>
            <Button className="btn btn-secondary mt-3" onSubmit={this.formSubmit}>
              Submit Friend Edit
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditFriend;
