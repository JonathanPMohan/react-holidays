import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import holidaysData from '../../../helpers/data/holidaysData';
import './EditHoliday.scss';
import authRequests from '../../../helpers/data/authRequests';

const defaultHoliday = {
  name: '',
  date: '',
  imageUrl: '',
  location: '',
  startTime: '',
  uid: '',
};

class EditHoliday extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  state = {
    holidayEdit: defaultHoliday,
    editId: '-1',
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempHoliday = { ...this.state.holidayEdit };
    tempHoliday[name] = e.target.value;
    this.setState({ holidayEdit: tempHoliday });
  }

  nameChange = e => this.formFieldStringState('name', e);

  dateChange = e => this.formFieldStringState('date', e);

  imageChange = e => this.formFieldStringState('imageUrl', e);

  locationChange = e => this.formFieldStringState('location', e);

  startTimeChange = e => this.formFieldStringState('startTime', e);

  addHolidayEdit = (holidayEdit) => {
    const { editId } = this.state;
    holidaysData.updateHoliday(holidayEdit, editId)
      .then(() => {
        this.props.history.push('/holidays');
      });
  }

  formSubmit = (e) => {
    e.preventDefault();
    const myHoliday = { ...this.state.holidayEdit };
    myHoliday.uid = authRequests.getCurrentUid();
    this.addHolidayEdit(myHoliday);
    this.setState({ holidayEdit: defaultHoliday });
  }

  componentDidMount() {
    const firebaseId = this.props.match.params.id;
    holidaysData.getSingleHoliday(firebaseId)
      .then((holidayToEdit) => {
        this.setState({ holidayEdit: holidayToEdit });
        this.setState({ editId: holidayToEdit.id });
      });
  }

  render() {
    const { holidayEdit } = this.state;

    return (
      <div className="new-holiday mx-auto">
        <div className="holiday-form mt-5">
          <form onSubmit={this.formSubmit}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="name-pre">Name</span>
              </div>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Event Name"
                aria-describedby="nameHelp"
                value={holidayEdit.name}
                onChange={this.nameChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="address-pre">Date</span>
              </div>
              <input
                type="text"
                id="date"
                className="form-control"
                placeholder="Event Date"
                aria-describedby="dateHelp"
                value={holidayEdit.date}
                onChange={this.dateChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="phone-pre">Image Url</span>
              </div>
              <input
                type="text"
                id="imageUrl"
                className="form-control"
                placeholder="Image URL"
                aria-describedby="imageUrlHelp"
                value={holidayEdit.imageUrl}
                onChange={this.imageChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="email-pre">Location</span>
              </div>
              <input
                type="text"
                id="location"
                className="form-control"
                placeholder="Event Location"
                aria-describedby="locationHelp"
                value={holidayEdit.location}
                onChange={this.locationChange}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="relationship-pre">Start Time</span>
              </div>
              <input
                type="text"
                id="start-time"
                className="form-control"
                placeholder="Event Start Time"
                aria-describedby="relationshipHelp"
                value={holidayEdit.startTime}
                onChange={this.startTimeChange}
              />
            </div>
            <Button className="btn btn-secondary mt-3" onClick={this.formSubmit}>
              Submit New Holiday
          </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditHoliday;
