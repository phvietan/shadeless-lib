/* eslint-disable require-jsdoc */

const fs = require('fs');

function incVersion(v) {
  const s = v.split('.');
  const p = s.length - 1;
  s[p] = (parseInt(s[p], 10) + 1).toString();
  return s.join('.');
}

function tryUpdateVersion(filename) {
  try {
    const fPackage = require(filename);
    fPackage.version = incVersion(fPackage.version);
    fs.writeFileSync(filename, JSON.stringify(fPackage, null, '  '));
    console.log(`Successfully pumped version for ${filename}`);
  } catch (err) {
    console.log(err.message.split('\n')[0]);
  }
}

tryUpdateVersion('./package.json');
tryUpdateVersion('./package-lock.json');
