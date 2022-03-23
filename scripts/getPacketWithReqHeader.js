const { PacketQL, PacketReader } = require('../dist');

async function main() {
  const pql = new PacketQL({
    choosingProject: 'test',
    databaseUrl: 'mongodb://127.0.0.1:27017',
  });
  const packets = await pql
    .setRequestHeader('Cookie')
    .setHeader('X-Client-Data')
    .query();

  for (let i = 0; i < packets.length; ++i) {
    const p = packets[i];
    const reader = new PacketReader();
    const burp = await reader.parseRequestToBurp(p);
    console.log(burp);
    console.log("===================================================================")
  };
  process.exit(0)
}

main().then().catch(err => console.log(err));
