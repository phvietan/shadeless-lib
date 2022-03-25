const {assert} = require('./libs/assert');
const {PacketReader} = require('../dist');
const {packetQL} = require('./libs/init');

async function main() {
  const packets = await packetQL
      .setResponseHeader('Access-Control-Allow-Origin: \\*')
      .query({method: 'POST'});

  for (let i = 0; i < packets.length; ++i) {
    const p = packets[i];
    const reader = new PacketReader();
    const burp = await reader.parseResponseToBurp(p);
    if (process.env.NODE_ENV !== 'test') {
      console.log(burp);
      console.log('===================================================================');
    }
    assert(p.method === 'POST', 'Get ParsedPacket with POST should return POST only');
  };
  if (process.env.NODE_ENV !== 'test') process.exit(0);
}

if (process.env.NODE_ENV !== 'test') main();
module.exports = main;