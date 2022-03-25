const {execStr, successLog} = require('@drstrain/drutil');

async function main() {
  const {stdout} = await execStr(`ls ${__dirname}`);
  const testFiles = stdout
      .split('\n')
      .filter((name) => name !== 'test.js' && /\.js$/i.test(name));
  process.env.NODE_ENV = 'test';
  for (let i = 0; i < testFiles.length; ++i) {
    const fileName = testFiles[i];
    console.log(`Testing ${fileName}`);
    const testFile = require(`./${fileName}`);
    await testFile();
    successLog(`Successfully tested ${fileName}`);
  }
  process.exit(0);
}

main();