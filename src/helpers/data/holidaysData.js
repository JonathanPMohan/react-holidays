import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllHolidays = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/holidays.json`)
    .then((results) => {
      const friendsObject = results.data;
      const friendsArray = [];
      if (friendsObject !== null) {
        Object.keys(friendsObject).forEach((friendId) => {
          friendsObject[friendId].id = friendId;
          friendsArray.push(friendsObject[friendId]);
        });
      }
      resolve(friendsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteHoliday = holidayId => axios.delete(`${firebaseUrl}/holidays/${holidayId}.json`);

export default { getAllHolidays, deleteHoliday };
