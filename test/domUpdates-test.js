const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
import domUpdates from '../src/domUpdates';
import UserRepo from '../src/User-repo'
import HydrationRepo from '../src/Hydration-repo'


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

    const hydrationData = [
      {
        "userID": 999,
        "date": "2019/06/15",
        "numOunces": 37
      },
      {
        "userID": 999,
        "date": "2019/06/16",
        "numOunces": 38
      },
      {
        "userID": 999,
        "date": "2019/09/19",
        "numOunces": 30
      },
    ]
    domUpdates.userRepo = new UserRepo([user1]);
    domUpdates.user = domUpdates.userRepo.users[0];
    domUpdates.hydrationRepo = new HydrationRepo(hydrationData);
    domUpdates.today = "2019/06/15";

    global.document = {};
    chai.spy.on(document, ['getElementById', 'querySelector', 'querySelectorAll'], () => {
      return {
        innerText: '',
        insertAdjacentHTML: () => {},
        forEach: () => {}
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
    // console.log(domUpdates)

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

  it('should spy on displayDailyHydration', function() {
    domUpdates.displayDailyHydration();

    expect(document.getElementById).to.have.been.called(2)
    expect(document.getElementById).to.have.been.called.with('hydrationToday')
    expect(document.getElementById).to.have.been.called.with('hydrationAverage')
  })

  it('should spy on displayWeeklyHydration', function() {
    domUpdates.displayWeeklyHydration();

    expect(document.getElementById).to.have.been.called(2)
    expect(document.getElementById).to.have.been.called.with('hydrationThisWeek')
    expect(document.getElementById).to.have.been.called.with('hydrationEarlierWeek')
    expect(document.querySelectorAll).to.have.been.called(1)
    expect(document.querySelectorAll).to.have.been.called.with('.historicalWeek')
  })
})
