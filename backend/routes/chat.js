const express = require('express');

const Chat = require('../controllers/chat');

const chatRouter = express.Router();
chatRouter.use(express.json());

chatRouter
  .route('/chat')
  .post(Chat.getChats);

chatRouter
  .route('/newRoom')
  .post(Chat.newRoom);

chatRouter
  .route('/newGroup')
  .post(Chat.newGroup);

chatRouter
  .route('/getRooms')
  .get(Chat.allRooms);

chatRouter
  .route('/getGroups')
  .get(Chat.allGroups);

chatRouter
  .route('/deleteConversation')
  .post(Chat.deleteConversation);

module.exports = chatRouter;