import React from 'react';
import { Button } from 'reactstrap';
import authRequests from '../../../helpers/data/authRequests';
import friendsData from '../../../helpers/data/friendsData';
import './NewFriend.scss';

const defaultFriend = {
  name: '',
  address: '',
  phoneNumber: '',
  email: '',
  relationship: '',
  isAvoiding: false,
  uid: '',
};

class NewFriend extends React.Component {
  state = {
    newFriend: defaultFriend,
    checkValue: false,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempFriend = { ...this.state.newFriend };
    tempFriend[name] = e.target.value;
    this.setState({ newFriend: tempFriend });
  }

  nameChange = e => this.formFieldStringState('name', e);

  addressChange = e => this.formFieldStringState('address', e);

  phoneNumberChange = e => this.formFieldStringState('phoneNumber', e);

  emailChange = e => this.formFieldStringState('email', e);

  relationshipChange = e => this.formFieldStringState('relationship', e);

  formSubmit = (e) => {
    e.preventDefault();
    const myFriend = { ...this.state.newFriend };
    myFriend.uid = authRequests.getCurrentUid();
    myFriend.isAvoiding = this.state.checkValue;
    this.addFriend(myFriend);
    this.setState({ newFriend: defaultFriend });
  }

  checkEvent = (e) => {
    const isDone = e.target.checked;
    this.setState({ checkValue: isDone });
  }

  addFriend = (newFriend) => {
    friendsData.createFriend(newFriend)
      .then(() => {
        this.props.history.push('/friends');
      });
  }

  render() {
    const { newFriend } = this.state;

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
                value={newFriend.name}
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
                value={newFriend.address}
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
                value={newFriend.phoneNumber}
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
                value={newFriend.email}
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
                value={newFriend.relationship}
                onChange={this.relationshipChange}
              />
            </div>
            <div className="custom-control custom-checkbox" onChange={this.checkEvent}>
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">Am I avoiding this person?</label>
            </div>
            <Button className="btn btn-secondary mt-3" onSubmit={this.formSubmit}>
              Submit New Friend
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default NewFriend;
