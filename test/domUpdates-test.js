const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
import domUpdates from '../src/domUpdates';
import User from '../src/User'
chai.use(spies);

describe.only('domUpdates', function() {
  beforeEach(() => {
    domUpdates.user = new User({
      "id": 999,
      "name": "Fake Data",
      "address": "1500 Fake Address, Faketown VA",
      "email": "FakeEmail@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [
        16,
        4,
        8
      ]
    });
    global.document = {};
    chai.spy.on(document, ['getElementById', 'querySelector'], () => {
      return { innerText: '' }
    });
  });

  it('should spy on displayHeader', function() {
    domUpdates.displayHeader();

    expect(document.getElementById).to.have.been.called(1)
    expect(document.getElementById).to.have.been.called.with('headerText')
  });
})
