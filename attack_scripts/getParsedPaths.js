const {assert} = require('./libs/assert');
const {pathQL: pql} = require('./libs/init');

async function main() {
  const paths = await pql
      .setAll(false)
      .query({origin: {$regex: 'onair'}});
  for (let i = 0; i < paths.length; ++i) {
    const p = paths[i];
    assert(p.origin.includes('onair'), 'ParsedPath origin should contain onair');
  }
  if (process.env.NODE_ENV !== 'test') process.exit(0);
}

if (process.env.NODE_ENV !== 'test') main();
module.exports = main;