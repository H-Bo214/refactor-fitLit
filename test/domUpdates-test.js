const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
const domUpdates = require('..src/domUpdates')
chai.use(spies);
