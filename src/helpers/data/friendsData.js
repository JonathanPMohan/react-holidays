import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllFriends = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/friends.json`)
    .then((result) => {
      const friendObject = result.data;
      const friendArray = [];
      if (friendObject != null) {
        Object.keys(friendObject).forEach((friendId) => {
          friendObject[friendId].id = friendId;
          friendArray.push(friendObject[friendId]);
        });
      }
      resolve(friendArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleFriend = friendId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/friends/${friendId}.json`)
    .then((result) => {
      const singleFriend = result.data;
      singleFriend.id = friendId;
      resolve(singleFriend);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteFriend = friendId => axios.delete(`${firebaseUrl}/friends/${friendId}.json`);

const addNewFriend = friendObject => axios.post(`${firebaseUrl}/friends.json`, JSON.stringify(friendObject));

const updateFriend = (friendObject, friendId) => axios.put(`${firebaseUrl}/friends/${friendId}.json`, JSON.stringify(friendObject));

const updatedIsAvoiding = (friendId, isAvoiding) => axios.patch(`${firebaseUrl}/friends/${friendId}.json`, { isAvoiding });

export default {
  getAllFriends,
  getSingleFriend,
  deleteFriend,
  addNewFriend,
  updateFriend,
  updatedIsAvoiding,
};
