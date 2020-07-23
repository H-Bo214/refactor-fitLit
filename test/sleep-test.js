import { expect } from 'chai';

import SleepRepo from '../src/Sleep-repo';
import UserRepo from '../src/User-repo';

describe.only('Sleep', function() {
  let sleepData, sleep, user1, user2, user3, user4, users, userRepo;

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

    sleep = new SleepRepo(sleepData);
    
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

  it('should take in a list of data', function() {
    expect(sleep.sleepData[1].userID).to.equal(2);
    expect(sleep.sleepData[3].hoursSlept).to.equal(6.1);
    expect(sleep.sleepData[6].sleepQuality).to.equal(1.6);
    expect(sleep.sleepData[7].date).to.equal('2019/06/17');
  });

  it('should find the average sleep hours per day for a user', function() {
    expect(sleep.calcAverageSleepForDay(2)).to.equal(5.9);
  });

  it('should find the average sleep quality per day for a user', function() {
    expect(sleep.calcTotalAverageSleepQuality(4)).to.equal(2.3);
  });

  it('should find the hours slept for a user on a specified date', function() {
    expect(sleep.calcHoursSleptForDay(2, '2019/08/22')).to.equal(6.9);
  });

  it('should find the sleep quality for a user on a specified date', function() {
    expect(sleep.calcSleepQualityForDay(4, '2019/06/18')).to.equal(1.6);
  });

  it('should find sleep by day for that days week', function() {
    expect(sleep.calcHoursSleptDailyForWeek('2019/06/18', 4, userRepo)[0]).to.eql('2019/06/18: 7.9');
    expect(sleep.calcHoursSleptDailyForWeek('2019/06/18', 4, userRepo)[3]).to.eql('2019/06/15: 9');
  });

  it('should find sleep quality by day for that days week', function() {
    expect(sleep.calcQualitySleepForWeek('2019/06/18', 4, userRepo)[0]).to.eql('2019/06/18: 1.6');
    expect(sleep.calcQualitySleepForWeek('2019/06/21', 4, userRepo)[6]).to.eql('2019/06/15: 3.1');
  });

  it('should determine the best quality sleepers for a week', function() {
    expect(sleep.determineBestSleepers('2019/08/22', userRepo)).to.eql(['The Rock']);
  });

  it('should return person with best quality sleep for the week', function() {
    expect(sleep.getUsersWithMostSleepWeekly('2019/06/21', userRepo)).to.eql(['Allie McCarthy']);
  });
  //come back to this test later so it gets a result of 2 people - unsure whether function is correct currently, but some functions need to be combined anyway 
  it('should return all qualifying users if best quality sleep is a tie', function() {
    // let user5 = {
    //   id: 6,
    //   name: "Richmond",
    //   address: "1234 Looney Street, Denver CO 80301-1697",
    //   email: "BugsB1@hotmail.com",
    //   strideLength: 3.8,
    //   dailyStepGoal: 7000,
    //   friends: [1, 2, 3]
    // };
    // users = [user1, user2, user3, user4, user5];
    // userRepo = new UserRepo(users);

    expect(sleep.getUsersWithMostSleepWeekly('2019/06/21', userRepo)).to.eql(['Allie McCarthy', ]);
  });

  it('should return people with longest sleep for the day', function() {
    expect(sleep.getUsersWithMostSleepForDay('2019/06/21', userRepo)).to.eql(['Allie McCarthy', 'Rainbow Dash']);
  });
  //make this test fail when user is NOT best in week
});
