const {PathQL, FuzzStatus} = require('../dist');

async function main() {
  const pql = new PathQL({
    choosingProject: 'test',
    databaseUrl: 'mongodb://127.0.0.1:27017',
  });

  const paths = await pql
      .setFilter({origin: {$regex: 'onair'}, path: '/'})
      .setStatus(FuzzStatus.DONE)
      .query();

  console.log(paths);
  await pql.setQueryDone(paths);

  process.exit(0);
}

main();
