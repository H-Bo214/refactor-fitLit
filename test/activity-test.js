import { expect } from 'chai';
import Activity from '../src/Activity';
import UserRepo from '../src/User-repo';
import User from '../src/User';

describe.only('Activity', function() {
  let activityData;
  let user1;
  let user2;
  let user3;
  let user4;
  let users;
  let userRepo;
  let activity;

  beforeEach(function() {
    activityData = [{
        "userID": 1,
        "date": "2019/06/15",
        "numSteps": 3577,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 2,
        "date": "2019/06/15",
        "numSteps": 4294,
        "minutesActive": 138,
        "flightsOfStairs": 10
      },
      {
        "userID": 3,
        "date": "2019/06/15",
        "numSteps": 7402,
        "minutesActive": 116,
        "flightsOfStairs": 33
      },
      {
        "userID": 4,
        "date": "2019/06/15",
        "numSteps": 3486,
        "minutesActive": 114,
        "flightsOfStairs": 32
      },
      {
        "userID": 5,
        "date": "2019/06/15",
        "numSteps": 11374,
        "minutesActive": 213,
        "flightsOfStairs": 13
      },
      {
        "userID": 6,
        "date": "2019/06/15",
        "numSteps": 14810,
        "minutesActive": 287,
        "flightsOfStairs": 18
      },
      {
        "userID": 7,
        "date": "2019/06/15",
        "numSteps": 2634,
        "minutesActive": 107,
        "flightsOfStairs": 5
      },
      {
        "userID": 11,
        "date": "2019/06/15",
        "numSteps": 10333,
        "minutesActive": 114,
        "flightsOfStairs": 31
      },
      {
        "userID": 11,
        "date": "2019/06/15",
        "numSteps": 6389,
        "minutesActive": 41,
        "flightsOfStairs": 33
      },
      {
        "userID": 10,
        "date": "2019/06/15",
        "numSteps": 8015,
        "minutesActive": 106,
        "flightsOfStairs": 37
      },
      {
        "userID": 11,
        "date": "2019/06/15",
        "numSteps": 11652,
        "minutesActive": 20,
        "flightsOfStairs": 24
      },
      {
        "userID": 12,
        "date": "2019/06/15",
        "numSteps": 9256,
        "minutesActive": 108,
        "flightsOfStairs": 2
      },
      {
        "userID": 1,
        "date": "2019/06/16",
        "numSteps": 5000,
        "minutesActive": 12,
        "flightsOfStairs": 14
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "numSteps": 9303,
        "minutesActive": 45,
        "flightsOfStairs": 9
      },
      {
        "userID": 1,
        "date": "2019/06/18",
        "numSteps": 3000,
        "minutesActive": 62,
        "flightsOfStairs": 23
      },
      {
        "userID": 1,
        "date": "2019/06/19",
        "numSteps": 9303,
        "minutesActive": 4,
        "flightsOfStairs": 2
      },
      {
        "userID": 1,
        "date": "2019/06/20",
        "numSteps": 9303,
        "minutesActive": 7,
        "flightsOfStairs": 4
      },
      {
        "userID": 1,
        "date": "2019/06/21",
        "numSteps": 12000,
        "minutesActive": 13,
        "flightsOfStairs": 26
      },
      {
        "userID": 1,
        "date": "2019/06/22",
        "numSteps": 9303,
        "minutesActive": 21,
        "flightsOfStairs": 14
      },
      {
        "userID": 1,
        "date": "2019/06/23",
        "numSteps": 9000,
        "minutesActive": 8,
        "flightsOfStairs": 9
      }
    ];

    user1 = new User({
      id: 1,
      name: "Alex Roth",
      address: "1234 Turing Street, Denver CO 80301-1697",
      email: "alex.roth1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 5000,
      friends: [2, 3, 4]
    });

    user2 = new User({
      id: 2,
      name: "Allie McCarthy",
      address: "1235 Turing Street, Denver CO 80301-1697",
      email: "allie.mcc1@hotmail.com",
      strideLength: 3.3,
      dailyStepGoal: 9000,
      friends: [1, 3, 4]
    });

    user3 = new User({
      id: 3,
      name: "Jerry Seinfield",
      address: "32 Baker Street, Denver CO 12345",
      email: "jseinfield@gmail.com",
      strideLength: 3.8,
      dailyStepGoal: 20000,
      friends: [1, 2, 4]
    });

    user4 = new User({
      id: 4,
      name: "Patrick the Starfish",
      address: "A rock in the ocean",
      email: "thebigpstar@pacificocean.net",
      strideLength: .2,
      dailyStepGoal: 13000,
      friends: [1, 2]
    });
    users = [user1, user2, user3, user4];
    userRepo = new UserRepo(users);
    activity = new Activity(activityData);
  });
  it('should take in data', function() {
    expect(activity.activityData[0].userID).to.eql(1);
    expect(activity.activityData[4].date).to.eql("2019/06/15");
    expect(activity.activityData[3].numSteps).to.eql(3486);
    expect(activity.activityData[8].minutesActive).to.eql(41);
    expect(activity.activityData[10].flightsOfStairs).to.eql(24);
  });
  //rewrite test below to work with actual method 
  it('should return the miles a given user has walked on a given date', function() {
    expect(activity.getMilesFromStepsByDate(1, "2019/06/15", userRepo)).to.eql(2.9);
  });
  it('should return the number of minutes a given user was active for on a given day', function() {
    expect(activity.getActiveMinutesByDate(1, "2019/06/16")).to.eql(12);
  });
  it('should return average active minutes in a given week', function() {
    expect(activity.calculateActiveAverageForWeek(1, "2019/06/21", userRepo)).to.eql(40.4);
  });
  it('should return true/false if the given user met their step goal on a given day', function() {
    expect(activity.accomplishStepGoal(4, "2019/06/15", userRepo.users[3])).to.eql(false);
  });
  it('should return all days that a given user exceeded their step goal', function() {
    expect(activity.getDaysGoalExceeded(1, userRepo.users[0])).to.eql([
      "2019/06/17",
      "2019/06/19",
      "2019/06/20",
      "2019/06/21",
      "2019/06/22",
      "2019/06/23"
    ]);
  });
  it('should return the highest number of stairs climbed in a day for all time', function() {
    expect(activity.getStairRecord(11)).to.eql(33);
  });

  it('should return the average flight of stairs for all users on given day', function() {
    expect(activity.getAllUserAverageForDay("2019/06/15", userRepo, "flightsOfStairs")).to.eql(21.2)
  })

  it('should return average steps taken for given date for all users', function() {
    activityData = activityData.push({
      "userID": 1,
      "date": "2019/06/23",
      "numSteps": 12000,
      "minutesActive": 13,
      "flightsOfStairs": 26
    }, {
      "userID": 2,
      "date": "2019/06/23",
      "numSteps": 9000,
      "minutesActive": 21,
      "flightsOfStairs": 14
    }, {
      "userID": 3,
      "date": "2019/06/23",
      "numSteps": 2000,
      "minutesActive": 8,
      "flightsOfStairs": 9
    });
    expect(activity.getAllUserAverageForDay("2019/06/23", userRepo, "numSteps")).to.eql(8000)
  });

  it('should return average minutes active given date for all users', function() {
    activityData = activityData.push({
      "userID": 1,
      "date": "2019/06/23",
      "numSteps": 12000,
      "minutesActive": 13,
      "flightsOfStairs": 26
    }, {
      "userID": 2,
      "date": "2019/06/23",
      "numSteps": 9000,
      "minutesActive": 21,
      "flightsOfStairs": 14
    }, {
      "userID": 3,
      "date": "2019/06/23",
      "numSteps": 2000,
      "minutesActive": 8,
      "flightsOfStairs": 9
    });
    expect(activity.getAllUserAverageForDay("2019/06/23", userRepo, "minutesActive")).to.eql(12.5)
  });

  it('should return steps for given user on given date', function() {
    expect(activity.userDataForToday(2, "2019/06/15", userRepo, 'numSteps')).to.eql(4294);
  });
  it('should return minutes active for given user on given date', function() {
    expect(activity.userDataForToday(1, "2019/06/18", userRepo, 'minutesActive')).to.eql(62);
  });
  it('should return a weeks worth steps for a given user', function() {
    expect(activity.userDataForWeek(1, "2019/06/23", userRepo, 'numSteps')[0]).to.eql("2019/06/23: 9000");
    expect(activity.userDataForWeek(1, "2019/06/23", userRepo, 'numSteps')[3]).to.eql("2019/06/20: 9303");
  });
  it('should return a weeks worth active minutes for a given user', function() {
    expect(activity.userDataForWeek(1, "2019/06/23", userRepo, 'minutesActive')[0]).to.eql("2019/06/23: 8");
    expect(activity.userDataForWeek(1, "2019/06/23", userRepo, 'minutesActive')[3]).to.eql("2019/06/20: 7");
  });
  it('should return a weeks worth stairs for a given user', function() {
    expect(activity.userDataForWeek(1, "2019/06/23", userRepo, 'flightsOfStairs')[0]).to.eql("2019/06/23: 9");
    expect(activity.userDataForWeek(1, "2019/06/23", userRepo, 'flightsOfStairs')[3]).to.eql("2019/06/20: 4");
  });
})

describe('Friend Activity', function() {
  let activityData;
  let activity;
  let user1;
  let user2;
  let user3;
  let user4;
  let user5;
  let users;
  let userRepo;

  beforeEach(function() {
    activityData = [{
        "userID": 1,
        "date": "2019/06/15",
        "numSteps": 3577,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 2,
        "date": "2019/06/14",
        "numSteps": 4294,
        "minutesActive": 138,
        "flightsOfStairs": 10
      },
      {
        "userID": 3,
        "date": "2019/06/13",
        "numSteps": 7402,
        "minutesActive": 116,
        "flightsOfStairs": 33
      },
      {
        "userID": 4,
        "date": "2019/06/12",
        "numSteps": 3486,
        "minutesActive": 114,
        "flightsOfStairs": 32
      },
      {
        "userID": 1,
        "date": "2019/06/14",
        "numSteps": 11374,
        "minutesActive": 213,
        "flightsOfStairs": 13
      },
      {
        "userID": 2,
        "date": "2019/06/13",
        "numSteps": 14810,
        "minutesActive": 287,
        "flightsOfStairs": 18
      },
      {
        "userID": 3,
        "date": "2019/06/12",
        "numSteps": 2634,
        "minutesActive": 107,
        "flightsOfStairs": 5
      },
      {
        "userID": 4,
        "date": "2019/06/11",
        "numSteps": 10333,
        "minutesActive": 114,
        "flightsOfStairs": 31
      },
      {
        "userID": 1,
        "date": "2019/06/02",
        "numSteps": 6389,
        "minutesActive": 41,
        "flightsOfStairs": 33
      },
      {
        "userID": 2,
        "date": "2019/06/03",
        "numSteps": 8015,
        "minutesActive": 106,
        "flightsOfStairs": 37
      },
      {
        "userID": 3,
        "date": "2019/06/19",
        "numSteps": 11652,
        "minutesActive": 20,
        "flightsOfStairs": 24
      },
      {
        "userID": 4,
        "date": "2019/06/15",
        "numSteps": 9256,
        "minutesActive": 108,
        "flightsOfStairs": 2
      },
      {
        "userID": 1,
        "date": "2019/06/16",
        "numSteps": 3578,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "numSteps": 3579,
        "minutesActive": 141,
        "flightsOfStairs": 16
      },
      {
        "userID": 1,
        "date": "2019/06/18",
        "numSteps": 3580,
        "minutesActive": 142,
        "flightsOfStairs": 16
      }
    ];

    activity = new Activity(activityData);

    user1 = new User({
      id: 1,
      name: "Alex Roth",
      address: "1234 Turing Street, Denver CO 80301-1697",
      email: "alex.roth1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [2, 3, 4]
    });

    user2 = new User({
      id: 2,
      name: "Allie McCarthy",
      address: "1235 Turing Street, Denver CO 80301-1697",
      email: "allie.mcc1@hotmail.com",
      strideLength: 3.3,
      dailyStepGoal: 9000,
      friends: [1, 3, 4]
    });

    user3 = new User({
      id: 3,
      name: "The Rock",
      address: "1236 Awesome Street, Denver CO 80301-1697",
      email: "therock@hotmail.com",
      strideLength: 10,
      dailyStepGoal: 60000,
      friends: [1, 2, 4]
    });

    user4 = new User({
      id: 4,
      name: "Rainbow Dash",
      address: "1237 Equestria Street, Denver CO 80301-1697",
      email: "rainbowD1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2]
    });
    users = [user1, user2, user3, user4];
    userRepo = new UserRepo(users);
  });

  it('should get a users friend lists activity', function() {
    expect(activity.getFriendsActivity(user4, userRepo)).to.eql([{
        "userID": 1,
        "date": "2019/06/15",
        "numSteps": 3577,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 1,
        "date": "2019/06/14",
        "numSteps": 11374,
        "minutesActive": 213,
        "flightsOfStairs": 13
      },
      {
        "userID": 1,
        "date": "2019/06/02",
        "numSteps": 6389,
        "minutesActive": 41,
        "flightsOfStairs": 33
      },
      {
        "userID": 1,
        "date": "2019/06/16",
        "numSteps": 3578,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "numSteps": 3579,
        "minutesActive": 141,
        "flightsOfStairs": 16
      },
      {
        "userID": 1,
        "date": "2019/06/18",
        "numSteps": 3580,
        "minutesActive": 142,
        "flightsOfStairs": 16
      },
      {
        "userID": 2,
        "date": "2019/06/14",
        "numSteps": 4294,
        "minutesActive": 138,
        "flightsOfStairs": 10
      },
      {
        "userID": 2,
        "date": "2019/06/13",
        "numSteps": 14810,
        "minutesActive": 287,
        "flightsOfStairs": 18
      },
      {
        "userID": 2,
        "date": "2019/06/03",
        "numSteps": 8015,
        "minutesActive": 106,
        "flightsOfStairs": 37
      }
    ]);
  });

  it('should get a users ranked friendslist activity for a chosen week', function() {
    expect(activity.getFriendsAverageStepsForWeek(user4, "2019/06/15", userRepo)).to.eql([{
        '2': 9552
      },
      {
        '1': 7475.5
      }
    ]);
  });

  it('should get a users ranked friendslist activity for a chosen week with names', function() {
    expect(activity.showChallengeListAndWinner(user4, "2019/06/15", userRepo)).to.eql([
      'Allie McCarthy: 9552', 'Alex Roth: 7475.5'
    ])
  });
  it('should know the ID of the winning friend', function() {
    expect(activity.getWinnerId(user4, "2019/06/15", userRepo)).to.eql(2)
  })
  it('should show a 3-day increasing streak for a users step count', function() {
    expect(activity.getStreak(userRepo, 1, 'numSteps')).to.eql(['2019/06/17', '2019/06/18'])
  });
  it('should show a 3-day increasing streak for a users minutes of activity', function() {
    expect(activity.getStreak(userRepo, 1, 'minutesActive')).to.eql(['2019/06/18'])
  });
});
