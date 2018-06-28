const Jasmine = require('jasmine');
const jasmine = new Jasmine();
const JasmineConsoleReporter = require('jasmine-console-reporter');

const reporter = new JasmineConsoleReporter({
  colors: 1,           // (0|false)|(1|true)|2
  cleanStack: 1,       // (0|false)|(1|true)|2|3
  verbosity: 4,        // (0|false)|1|2|(3|true)|4
  listStyle: 'indent', // "flat"|"indent"
  activity: false
});
jasmine.addReporter(reporter);

jasmine.loadConfigFile('test/support/jasmine.json');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
jasmine.jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;


jasmine.execute();