const { PacketQL, PacketReader } = require('../dist');

async function main() {
  const pql = new PacketQL({
    choosingProject: 'test',
    databaseUrl: 'mongodb://127.0.0.1:27017',
  });
  const packets = await pql
    .setResponseHeader('Access-Control-Allow-Origin: \\*')
    .query({
      method: 'POST',
    });

  for (let i = 0; i < packets.length; ++i) {
    const p = packets[i];
    const reader = new PacketReader();
    const burp = await reader.parseResponseToBurp(p);
    console.log(burp);
    console.log("===================================================================")
  };
}

main().then().catch(err => console.log(err));
