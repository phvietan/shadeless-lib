const {FuzzStatus} = require('../dist');
const {assert} = require('./libs/assert');
const {toolNoteQL} = require('./libs/init');

async function main() {
  await toolNoteQL.setTool('random_test').query();
  await toolNoteQL.setQueryDone({key: 'test'});
  const testNote = await toolNoteQL.query({key: 'test'});
  assert(testNote.length === 1, 'There should be 1 note after set query DONE');
  assert(testNote[0].tool === 'random_test', 'TestNote should have correct tool name');
  assert(testNote[0].status === FuzzStatus.DONE, 'TestNote status should be DONE after mark as DONE');

  await toolNoteQL.setQueryTodo({key: 'test'});
  const testNote2 = await toolNoteQL.query({key: 'test'});
  assert(testNote2.length === 1, 'There should be 1 note after set query TODO');
  assert(testNote2[0].tool === 'random_test', 'TestNote2 should have correct tool name');
  assert(testNote2[0].status === FuzzStatus.TODO, 'TestNote status should be TODO after mark as TODO');

  if (process.env.NODE_ENV !== 'test') process.exit(0);
}

if (process.env.NODE_ENV !== 'test') main();
module.exports = main;