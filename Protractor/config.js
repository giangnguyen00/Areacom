// conf.js
//created by Sangeetha Matchanickal
exports.config = {
  capabilities: {
    'browserName': 'firefox'
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['test.js']
}