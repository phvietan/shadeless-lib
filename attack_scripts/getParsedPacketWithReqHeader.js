const {assert} = require('./libs/assert');
const {PacketReader} = require('../dist');
const {packetQL} = require('./libs/init');

async function main() {
  const packets = await packetQL
      .setRequestHeader('Cookie')
      .setHeader('X-Client-Data')
      .query();

  for (let i = 0; i < packets.length; ++i) {
    const p = packets[i];
    const reader = new PacketReader();
    const burp = await reader.parseRequestToBurp(p);
    if (process.env.NODE_ENV !== 'test') {
      console.log(burp);
      console.log('===================================================================');
    }
    let checkHasCookie = false;
    p.requestHeaders.forEach((h) => {
      checkHasCookie |= /Cookie/i.test(h);
    });
    assert(checkHasCookie, 'RequestHeader should contain Cookie header');
  };
  if (process.env.NODE_ENV !== 'test') process.exit(0);
}

if (process.env.NODE_ENV !== 'test') main();
module.exports = main;