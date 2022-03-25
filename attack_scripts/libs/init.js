const {PathQL, PacketQL, ToolNoteQL} = require('../../dist');

const creds = require('./creds.json');

const pathQL = new PathQL({
  choosingProject: 'test',
  ...creds,
});

const packetQL = new PacketQL({
  choosingProject: 'test',
  ...creds,
});

const toolNoteQL = new ToolNoteQL({
  choosingProject: 'test',
  ...creds,
});

module.exports = {
  pathQL,
  packetQL,
  toolNoteQL,
};