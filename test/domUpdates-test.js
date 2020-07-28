const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
import domUpdates from '../src/domUpdates';
import User from '../src/User'
import UserRepo from '../src/User-repo'

chai.use(spies);

describe.only('domUpdates', function() {
  beforeEach(() => {
    const user1 = {
      "id": 999,
      "name": "Fake Data",
      "address": "1500 Fake Address, Faketown VA",
      "email": "FakeEmail@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": []
    }
    domUpdates.userRepo = new UserRepo([user1]);
    domUpdates.user = domUpdates.userRepo.users[0]

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

  it('should spy on displayUserGoals', function() {
    domUpdates.displayUserGoals();

    expect(document.querySelector).to.have.been.called(2)
    expect(document.querySelector).to.have.been.called.with('.step-goal-card')
    expect(document.querySelector).to.have.been.called.with('.avg-step-goal-card')
    expect(document.getElementById).to.have.been.called(1)
    expect(document.getElementById).to.have.been.called.with('userStridelength')
  })
})
