import { expect } from 'chai';

import Activity from '../src/Activity';

describe('Activity', function() {
  let activity1

  beforeEach(function() {
    activity1 = new Activity({
      "userID": 1,
      "date": "2020/06/09",
      "numSteps": 8000,
      "minutesActive": 200,
      "flightsOfStairs": 25
    });
  });

  it('should be a function', function() {
    expect(Activity).to.be.a('function');
  });

  it('should be an instance of Activity', function() {
    expect(activity1).to.be.an.instanceof(Activity);
  });

  it('should be have a user id', function() {
    expect(activity1.userID).to.equal(1);
  });

  it('should have a date', function() {
    expect(activity1.date).to.equal('2020/06/09');
  });

  it('should store the number of steps walked', function() {
    expect(activity1.numSteps).to.equal(8000);
  });

  it('should store active minutes', function() {
    expect(activity1.minutesActive).to.equal(200);
  });

  it('should store the number of flights of stairs climbed', function() {
    expect(activity1.flightsOfStairs).to.equal(25);
  });
});
