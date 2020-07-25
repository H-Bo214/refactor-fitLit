import { expect } from 'chai';

import Sleep from '../src/Sleep'

describe('Sleep', function() {
  let sleep1;

  beforeEach(function() {
    sleep1 = new Sleep({
      "userID": 1,
      "date": "2019/06/15",
      "hoursSlept": 6.1,
      "sleepQuality": 2.2
    });
  });

  it('should be a function', function() {
    expect(Sleep).to.be.a('function');
  });

  it('should be an instance of Sleep', function() {
    expect(sleep1).to.be.an.instanceof(Sleep);
  });

  it('should have an id', function() {
    expect(sleep1.userID).to.equal(1);
  })

  it('should have a date', function() {
    expect(sleep1.date).to.equal("2019/06/15");
  })

  it('should have a number of hours slept', function () {
    expect(sleep1.hoursSlept).to.equal(6.1);
  })

  it('should have have a number for sleep quality', function() {
    expect(sleep1.sleepQuality).to.equal(2.2);
  })
})
