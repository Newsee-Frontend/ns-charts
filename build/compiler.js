// const path = require('path');
// const fs = require('fs-extra');
//
// const esDir = path.resolve('./es');
// const libDir = path.resolve('./lib');
// const srcDir = path.resolve('./src');
//
//
// fs.copySync(srcDir, esDir);
//
//
// /**
//  * Build npm src
//  */
// const path = require('path');
// const glob = require('glob');
// const shell = require('shelljs');
// const signale = require('signale');
// const {Signale} = signale;
//
//
// const p = path.resolve(__dirname, './compile-style.js');
// const msg = 'compile file in es';
//
// signale.start(msg);
//
// const interactive = new Signale({interactive: true});
// interactive.pending(msg);
//
//
// shell.exec(`gulp  --gulpfile ${p}`, function (error, stdout, stderr) {
//     signale.success(msg);
// });
//
//
