const {PathQL} = require('../dist');

async function main() {
  const pql = new PathQL({
    choosingProject: 'test',
    databaseUrl: 'mongodb://127.0.0.1:27017',
  });

  const paths = await pql
      .setAll(true)
      .setFilter({origin: {$regex: 'onair'}, path: '/'})
      .query();

  console.log(paths);
}

main();
