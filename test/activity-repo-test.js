import { expect } from 'chai';
import Activity from '../src/Activity';
import ActivityRepo from '../src/Activity-repo';
import DataRepo from '../src/Data-repo';
import UserRepo from '../src/User-repo';

describe.only('Activity', function() {
  let activityData, user1, user2, user3, users, userRepo, activityRepo;

  beforeEach(function() {
    activityData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "numSteps": 10000,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 1,
        "date": "2019/06/14",
        "numSteps": 10000,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 1,
        "date": "2019/06/13",
        "numSteps": 10000,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 1,
        "date": "2019/06/12",
        "numSteps": 10000,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 1,
        "date": "2019/06/11",
        "numSteps": 10000,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 1,
        "date": "2019/06/10",
        "numSteps": 10000,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 1,
        "date": "2019/06/09",
        "numSteps": 10000,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 2,
        "date": "2019/06/15",
        "numSteps": 4000,
        "minutesActive": 120,
        "flightsOfStairs": 10
      },
      {
        "userID": 2,
        "date": "2019/06/14",
        "numSteps": 4000,
        "minutesActive": 120,
        "flightsOfStairs": 10
      },
      {
        "userID": 2,
        "date": "2019/06/13",
        "numSteps": 4000,
        "minutesActive": 120,
        "flightsOfStairs": 10
      },
      {
        "userID": 2,
        "date": "2019/06/12",
        "numSteps": 4000,
        "minutesActive": 120,
        "flightsOfStairs": 10
      },
      {
        "userID": 2,
        "date": "2019/06/11",
        "numSteps": 4000,
        "minutesActive": 120,
        "flightsOfStairs": 10
      },
      {
        "userID": 2,
        "date": "2019/06/10",
        "numSteps": 4000,
        "minutesActive": 120,
        "flightsOfStairs": 10
      },
      {
        "userID": 2,
        "date": "2019/06/09",
        "numSteps": 4000,
        "minutesActive": 120,
        "flightsOfStairs": 10
      },
      {
        "userID": 3,
        "date": "2019/06/15",
        "numSteps": 2000,
        "minutesActive": 80,
        "flightsOfStairs": 5
      },
      {
        "userID": 3,
        "date": "2019/06/14",
        "numSteps": 2000,
        "minutesActive": 80,
        "flightsOfStairs": 5
      },
      {
        "userID": 3,
        "date": "2019/06/13",
        "numSteps": 2000,
        "minutesActive": 80,
        "flightsOfStairs": 5
      },
      {
        "userID": 3,
        "date": "2019/06/12",
        "numSteps": 2000,
        "minutesActive": 80,
        "flightsOfStairs": 5
      },
      {
        "userID": 3,
        "date": "2019/06/11",
        "numSteps": 2000,
        "minutesActive": 80,
        "flightsOfStairs": 5
      },
      {
        "userID": 3,
        "date": "2019/06/10",
        "numSteps": 2000,
        "minutesActive": 80,
        "flightsOfStairs": 5
      },
      {
        "userID": 3,
        "date": "2019/06/09",
        "numSteps": 2000,
        "minutesActive": 80,
        "flightsOfStairs": 5
      },
      {
        "userID": 11,
        "date": "2019/06/15",
        "numSteps": 2000,
        "minutesActive": 41,
        "flightsOfStairs": 31
      },
      {
        "userID": 11,
        "date": "2019/06/16",
        "numSteps": 3000,
        "minutesActive": 106,
        "flightsOfStairs": 33
      },
      {
        "userID": 11,
        "date": "2019/06/17",
        "numSteps": 6000,
        "minutesActive": 114,
        "flightsOfStairs": 37
      }
    ];

    user1 = {
      id: 1,
      name: "Alex Roth",
      address: "1234 Turing Street, Denver CO 80301-1697",
      email: "alex.roth1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 5000,
      friends: [2, 3]
    };

    user2 = {
      id: 2,
      name: "Allie McCarthy",
      address: "1235 Turing Street, Denver CO 80301-1697",
      email: "allie.mcc1@hotmail.com",
      strideLength: 3.3,
      dailyStepGoal: 9000,
      friends: [1, 3, 11]
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

    users = [user1, user2, user3];
    userRepo = new UserRepo(users);
    activityRepo = new ActivityRepo(activityData);

  });

  it('should be a function', function() {
    expect(ActivityRepo).to.be.a('function');
  });

  it('should be an instance of ActivityRepo', function() {
    expect(activityRepo).to.be.an.instanceof(ActivityRepo);
  });

  it('should be an instance of DataRepo', function() {
    expect(activityRepo).to.be.an.instanceof(DataRepo);
  });

  it('should take in activity data', function () {
    expect(activityRepo.activityData[0].date).to.equal('2019/06/15');
    expect(activityRepo.activityData[1].numSteps).to.equal(10000);
    expect(activityRepo.activityData[2].minutesActive).to.equal(140);
    expect(activityRepo.activityData[4].flightsOfStairs).to.equal(16);
  });

  it('each piece of activity data should be an instance of Activity', function() {
    expect(activityRepo.activityData[1]).to.be.an.instanceof(Activity);
  });

  it('should return the miles a given user has walked on a given date', function() {
    expect(activityRepo.getMilesByStepsForDate(1, '2019/06/15', userRepo)).to.equal(8.1);
  });

  it('should return the number of minutes a given user was active on a given day', function() {
    expect(activityRepo.getActiveMinutesByDate(11, '2019/06/16')).to.equal(106);
  });

  it('should return a users average active minutes in a given week', function() {
    expect(activityRepo.getAverageMinutesActiveForWeek(11, '2019/06/17')).to.equal(87);
  });

  it('should be able to determine that a given user met their step goal on a given day', function() {
    expect(activityRepo.accomplishStepGoalForDay(1, '2019/06/15', userRepo)).to.equal(true);
  });

  it('should be able to determine that a given user did not meet their step goal on a given day', function () {
    expect(activityRepo.accomplishStepGoalForDay(2, '2019/06/15', userRepo)).to.equal(false);
  });

  it('should return all days that a given user exceeded their step goal', function() {
    expect(activityRepo.exceededStepGoalForDay(1, userRepo)).to.deep.equal(
      [
      '2019/06/15',
      "2019/06/14",
      "2019/06/13",
      "2019/06/12",
      "2019/06/11",
      "2019/06/10",
      "2019/06/09"
      ]
    );
  });

  it('should return the highest number of stairs climbed in a day for all time', function() {
    expect(activityRepo.getStairClimbingRecord(11)).to.equal(37);
  });

  it('should return the average flight of stairs for all users on given day', function() {
    expect(activityRepo.getAllUsersAverageDataForDay('2019/06/15', 'flightsOfStairs')).to.equal(16)
  })

  it('should return average steps taken for given date for all users', function() {
    expect(activityRepo.getAllUsersAverageDataForDay('2019/06/15', 'numSteps')).to.equal(4500)
  });

  it('should return average minutes active given date for all users', function() {
    expect(activityRepo.getAllUsersAverageDataForDay('2019/06/15', 'minutesActive')).to.equal(95)
  });

  it('should return steps for given user on given date', function() {
    expect(activityRepo.getUserDataByDate(2, '2019/06/15', 'numSteps')).to.equal(4000);
  });

  it('should return minutes active for given user on given date', function() {
    expect(activityRepo.getUserDataByDate(11, '2019/06/16', 'minutesActive')).to.equal(106);
  });

  it('should return a weeks worth of data for any given user with any end date', function() {
    expect(activityRepo.getUserDataForWeek(11, '2019/06/17')[2].numSteps).to.equal(2000);
  });

  it('given a user id & date, it should be able to calculate total weekly steps', function() {
    expect(activityRepo.createActivityData(1, "2019/06/15", userRepo).userSum).to.equal(70000)
  })

  it('(for each friend in the friend list), it should return their name & a week of activity data', function() {
  let date = "2019/06/15";
  user1 = userRepo.users[0];

    expect(activityRepo.getFriendsActivityData(user1, userRepo, date)).to.deep.equal(
      [
        {
          id: 2,
          name: "Allie McCarthy",
          userData: [4000, 4000, 4000, 4000, 4000, 4000, 4000],
          userSum: 28000
        },
        {
          id: 3,
          name: "The Rock",
          userData: [2000, 2000, 2000, 2000, 2000, 2000, 2000],
          userSum: 14000
        }
      ]
    );
  })

  it('should return the step challenge winner', function() {
    expect(activityRepo.getStepChallengeWinner(userRepo.users[0], "2019/06/15", userRepo)[0]).to.equal('Alex Roth')
  })

  it.only('should know the ID of the winning friend', function() {
    expect(activityRepo.getStepChallengeWinner(userRepo.users[0], '2019/06/15', userRepo)[2]).to.equal(1)
  });

  //THIS SECTION HAS NOT BEEN EDITED YET

  it('should show a 3-day increasing streak for a users step count', function() {
    expect(activityRepo.displayIncreasedSteps(userRepo, 11, 'numSteps')).to.deep.equal(['2019/06/17'])
  });

  it('should show a 3-day increasing streak for a users minutes of activity', function() {
    expect(activityRepo.displayIncreasedSteps(userRepo, 11, 'minutesActive')).to.equal(['2019/06/17'])
  });
});
