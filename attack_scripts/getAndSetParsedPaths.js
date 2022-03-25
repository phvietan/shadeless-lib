const {FuzzStatus} = require('../dist');
const {assert} = require('./libs/assert');
const {pathQL} = require('./libs/init');

async function main() {
  const paths = await pathQL
      .query({
        origin: {$regex: 'onair'},
        status: FuzzStatus.TODO,
      });

  for (let i = 0; i < paths.length; ++i) {
    const p = paths[i];
    assert(p.status === FuzzStatus.TODO, 'PathQL should get correct TODO paths');
    await pathQL.setQueryDone(p);
    const newP = await pathQL.queryId(p._id);
    assert(newP.status === FuzzStatus.DONE, 'PathQL after set DONE should get correct DONE status');
    await pathQL.setQueryTodo(p);
    const lastNewP = await pathQL.queryId(p._id);
    assert(lastNewP.status === FuzzStatus.TODO, 'PathQL after set TODO should get correct TODO status');
  }
  if (process.env.NODE_ENV !== 'test') process.exit(0);
}

if (process.env.NODE_ENV !== 'test') main();
module.exports = main;