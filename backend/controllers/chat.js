const Chat = require('../models/chat');
const User = require('../models/users');
const Room = require('../models/room');
const Group = require('../models/group');

exports.getChats = async (req, res) => {
  try {
    if(req.body.roomId) {
      const { roomId } = req.body;
      const msgs = await Chat.find({ roomId: roomId });
      res.json(msgs);
    }
    else if(req.body.grpId) {
      const { grpId } = req.body;
      const msgs = await Chat.find({ grpId: grpId });
      res.json(msgs);
    }
    
  } catch (err) {
    console.log(err);
  }
};

exports.mediaMsg = async (req,res) => {
  try {
    res.json(req.file.path);
  } catch (err) {
    console.log(err);
  }
};

exports.newRoom = async (req, res) => {
  try {
    const { p1, p2 } = req.body;

    const user1 = await User.findOne({ email: p1 });
    const user2 = await User.findOne({ email: p2 });

    const newRoom = new Room({
      p1: user1._id,
      p2: user2._id,
    });
    const createdRoom = await newRoom.save();

    let newC1 = [],newC2 = [],newR1 = [],newR2 = [];

    for(let i=0;i<user1.connections.length;i++) {
      newC1.push(user1.connections[i]);
    }
    newC1.push(user2._id);

    for(let i=0;i<user2.connections.length;i++) {
      newC2.push(user2.connections[i]);
    }
    newC2.push(user1._id);

    for(let i=0;i<user1.rooms.length;i++) {
      newR1.push(user1.rooms[i]);
    }
    newR1.push(createdRoom._id);

    for(let i=0;i<user2.rooms.length;i++) {
      newR2.push(user2.rooms[i]);
    }
    newR2.push(createdRoom._id);

    let updatedUser1 = {
      connections: newC1,
      rooms: newR1,
    };
    updatedUser1 = { $set: updatedUser1 };

    await User.updateOne(
      { email: p1 },
      updatedUser1
    ).exec();

    let updatedUser2 = {
      connections: newC2,
      rooms: newR2,
    };
    updatedUser2 = { $set: updatedUser2 };

    await User.updateOne(
      { email: p2 },
      updatedUser2
    ).exec();

    res.json({msg: "Success"});

  } catch (err) {
    console.log(err);
  }
};

exports.newGroup = async (req, res) => {
  try {
    const { name, members } = req.body;

    let grpMembers = [], membersId = [];
    grpMembers = members.split('a.@.a');

    for(let i=0;i<grpMembers.length;i++) {
      let user = await User.findOne({ email: grpMembers[i] });  
      membersId.push(user._id);
    }

    const newGrp = new Group({
      name: name,
      pic: req.file.path,
      members: membersId,
    });
    const createdGrp = await newGrp.save();

    for(let i=0;i<grpMembers.length;i++) {
      let user = await User.findOne({ email: grpMembers[i] });
      let newG = [];
      
      for(let j=0;j<user.groups.length;j++) {
        newG.push(user.groups[j]);
      }
      newG.push(createdGrp._id);

      let updatedUser = {
        groups: newG,
      };
      updatedUser = { $set: updatedUser };
  
      await User.updateOne(
        { email: grpMembers[i] },
        updatedUser
      ).exec();
    }
    
    res.json({msg: "Success"});

  } catch (err) {
    console.log(err);
  }
};

exports.allRooms = async (req, res) => {
  const rooms = await Room.find({}).populate('p2').populate('p1');
  res.json(rooms);
};

exports.allGroups = async (req, res) => {
  const groups = await Group.find({}).populate('members');
  res.json(groups);
};

exports.deleteConversation = async (req, res) => {
  try {
    if(req.body.roomId) {
      const { roomId } = req.body;
      await Chat.deleteMany({ roomId: roomId });
      const resp = await Room.deleteOne({ _id: roomId });
      res.json(resp);
    }
    else if(req.body.grpId) {
      const { grpId } = req.body;
      await Chat.deleteMany({ grpId: grpId });
      const resp = await Group.deleteOne({ _id: grpId });
      res.json(resp);
    }
  } catch (err) {
    console.log(err);
  }
};