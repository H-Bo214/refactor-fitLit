import { expect } from 'chai';
import DataRepo from '../src/Data-repo'
import SleepRepo from '../src/Sleep-repo';
import UserRepo from '../src/User-repo';

describe.only('Sleep Repo', function() {
  let sleepData, sleepRepo,  user1, user2, user3, user4, users, userRepo, user4SleepData;
  // sleep,
  beforeEach(function() {
    sleepData = [
      {
        "userID": 1,
        "date": "2019/08/22",
        "hoursSlept": 10.1,
        "sleepQuality": 1.8
      },
      {
        "userID": 2,
        "date": "2019/08/22",
        "hoursSlept": 6.9,
        "sleepQuality": 1.2
      },
      {
        "userID": 3,
        "date": "2019/08/22",
        "hoursSlept": 4,
        "sleepQuality": 4
      },
      {
        "userID": 4,
        "date": "2019/06/21",
        "hoursSlept": 6.1,
        "sleepQuality": 3.5
      },
      {
        "userID": 4,
        "date": "2019/06/20",
        "hoursSlept": 4.7,
        "sleepQuality": 4
      },
      {
        "userID": 4,
        "date": "2019/06/19",
        "hoursSlept": 10.1,
        "sleepQuality": 1.3
      },
      {
        "userID": 4,
        "date": "2019/06/18",
        "hoursSlept": 7.9,
        "sleepQuality": 1.6
      },
      {
        "userID": 4,
        "date": "2019/06/17",
        "hoursSlept": 5.9,
        "sleepQuality": 1.6
      },
      {
        "userID": 4,
        "date": "2019/06/16",
        "hoursSlept": 9.6,
        "sleepQuality": 1
      },
      {
        "userID": 4,
        "date": "2019/06/15",
        "hoursSlept": 9,
        "sleepQuality": 3.1
      },
      {
        "userID": 2,
        "date": "2019/06/21",
        "hoursSlept": 6.1,
        "sleepQuality": 3.5
      },
      {
        "userID": 2,
        "date": "2019/06/20",
        "hoursSlept": 4.7,
        "sleepQuality": 4
      },
    ];
    user4SleepData = [{
        "userID": 4,
        "date": "2019/06/21",
        "hoursSlept": 6.1,
        "sleepQuality": 3.5
      },
      {
        "userID": 4,
        "date": "2019/06/20",
        "hoursSlept": 4.7,
        "sleepQuality": 4
      },
      {
        "userID": 4,
        "date": "2019/06/19",
        "hoursSlept": 10.1,
        "sleepQuality": 1.3
      },
      {
        "userID": 4,
        "date": "2019/06/18",
        "hoursSlept": 7.9,
        "sleepQuality": 1.6
      },
      {
        "userID": 4,
        "date": "2019/06/17",
        "hoursSlept": 5.9,
        "sleepQuality": 1.6
      },
      {
        "userID": 4,
        "date": "2019/06/16",
        "hoursSlept": 9.6,
        "sleepQuality": 1
      },
      {
        "userID": 4,
        "date": "2019/06/15",
        "hoursSlept": 9,
        "sleepQuality": 3.1
      },]
    sleepRepo = new SleepRepo(sleepData);
    // console.log('sleepRepo', sleepRepo);
    user1 = {
      id: 1,
      name: "Alex Roth",
      address: "1234 Turing Street, Denver CO 80301-1697",
      email: "alex.roth1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [2, 3, 4]
    };
    user2 = {
      id: 2,
      name: "Allie McCarthy",
      address: "1235 Turing Street, Denver CO 80301-1697",
      email: "allie.mcc1@hotmail.com",
      strideLength: 3.3,
      dailyStepGoal: 9000,
      friends: [1, 3, 4]
    };
    user3 = {
      id: 3,
      name: "The Rock",
      address: "1236 Awesome Street, Denver CO 80301-1697",
      email: "therock@hotmail.com",
      strideLength: 10,
      dailyStepGoal: 60000,
      friends: [1, 2, 4]
    };
    user4 = {
      id: 4,
      name: "Rainbow Dash",
      address: "1237 Equestria Street, Denver CO 80301-1697",
      email: "rainbowD1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3]
    };
    users = [user1, user2, user3, user4];
    userRepo = new UserRepo(users);
  });

  it.only('should be a function', function() {
    expect(SleepRepo).to.be.a('function')
  });

  it.only('should be an instance of SleepRepo', function() {
    expect(sleepRepo).to.be.an.instanceof(SleepRepo);
  });

  it.only('should be an instance of DataRepo', function() {
    expect(sleepRepo).to.be.an.instanceof(DataRepo);
  });

    it.only('should take in a list of data', function() {
    expect(sleepRepo.sleepData[1].userID).to.equal(2);
    expect(sleepRepo.sleepData[3].hoursSlept).to.equal(6.1);
    expect(sleepRepo.sleepData[6].sleepQuality).to.equal(1.6);
    expect(sleepRepo.sleepData[7].date).to.equal('2019/06/17');
  });

  it.only('should find the average sleep hours per day for a user', function() {
    expect(sleepRepo.calcAverageUserSleep(2, 'hoursSlept')).to.equal(5.9);
  });

  it.only('should find the average sleep quality per day for a user', function() {
    expect(sleepRepo.calcAverageUserSleep(4, 'sleepQuality')).to.equal(2.3);
  });

  it.only('should find the hours slept for a user on a specified date', function() {
    expect(sleepRepo.calcDailySleep(2, '2019/08/22', 'hoursSlept')).to.equal(6.9);
  });

  it.only('should find the sleep quality for a user on a specified date', function() {
    expect(sleepRepo.calcDailySleep(4, '2019/06/18', 'sleepQuality')).to.equal(1.6);
  });

  it.only('should find a users sleep data for a week', function() {
    expect(sleepRepo.getWeekOfSleep('2019/06/21', 4)).to.deep.eq(user4SleepData);
  });













/// left off on this test, calcAllUserSleepQuality. confirm the math is correct.

  it.only('should get all users sleep quality', function() {
    expect(sleepRepo.calcAllUserSleepQuality()).to.eq('hello')
  });
// Method determineBestSleepers returns the user object in an array. The prior version of this test would return the user name. The spec doesn't specifically state to return the user name so I believe this method is fine, as is. 
  it.only('should determine the best quality sleepers for a week', function() {
    expect(sleepRepo.determineBestSleepers('2019/08/22', users)).to.deep.eql([user3]);
  });

  //come back to this test later so it gets a result of 2 people - unsure whether function is correct currently, but some functions need to be combined anyway 

  it('should return people with longest sleep for the day', function() {
    expect(sleep.getUsersWithMostSleepForDay('2019/06/21', userRepo)).to.eql(['Allie McCarthy', 'Rainbow Dash']);
  });
  //make this test fail when user is NOT best in week
});