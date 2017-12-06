#! /usr/bin/env node
/* eslint-disable */
var FlowCLI = require('../dist/node/api-flow.js').default;

// var cli = new FlowCLI(process.argv);
// var parser = cli._createParser();
// cli.processArguments(parser);
// cli.run().then((data) => {
//     console.log(data)
// });

var sourceFile = process.argv[2];

var format;
if (process.argv.indexOf("-f") != -1) {
  format = process.argv[process.argv.indexOf("-f") + 1];
}

var target;
if (process.argv.indexOf("-t") != -1) {
  target = process.argv[process.argv.indexOf("-t") + 1];
}

// TODO Need to be able to pass in version, as right now we're luckily using two things on v2
const options = {
  source: {
    format: format,
    version: 'v2.0'
  },
  target: {
    format: target,
    version: 'v2.0'
  }
};

const promise = ApiFlow.transform({ options, uri: sourceFile });

promise.then((data) => {
  process.stdout.write(data)
}).catch((e) => {
  console.error(e)
});
