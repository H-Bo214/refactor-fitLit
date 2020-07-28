const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
import domUpdates from '../src/domUpdates';
import User from '../src/User'
import UserRepo from '../src/User-repo'

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
      "friends": []
    });
    global.document = {};
    chai.spy.on(document, ['getElementById', 'querySelector'], () => {
      return {
        innerText: '',
        insertAdjacentHTML: () => {}
      }
    });
  });

  it('should spy on displayHeader', function() {
    domUpdates.displayHeader();

    expect(document.getElementById).to.have.been.called(1)
    expect(document.getElementById).to.have.been.called.with('headerText')
  });

  it('should spy on displayUserInfo', function() {
    domUpdates.displayUserInfo();

    expect(document.querySelector).to.have.been.called(1)
    expect(document.querySelector).to.have.been.called.with('.sidebar-header-name')
    expect(document.getElementById).to.have.been.called(3)
    expect(document.getElementById).to.have.been.called.with('userAddress')
    expect(document.getElementById).to.have.been.called.with('userEmail')
    expect(document.getElementById).to.have.been.called.with('friendList')
  })
})
