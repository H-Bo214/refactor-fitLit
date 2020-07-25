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
        "userID": 2,
        "date": "2019/06/15",
        "numSteps": 4000,
        "minutesActive": 138,
        "flightsOfStairs": 10
      },
      {
        "userID": 3,
        "date": "2019/06/15",
        "numSteps": 9000,
        "minutesActive": 116,
        "flightsOfStairs": 33
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
    expect(activityRepo.activityData[0].date).to.eql('2019/06/15');
    expect(activityRepo.activityData[1].numSteps).to.eql(4000);
    expect(activityRepo.activityData[2].minutesActive).to.eql(116);
    expect(activityRepo.activityData[4].flightsOfStairs).to.eql(33);
  });

  it('each piece of activity data should be an instance of Activity', function() {
    expect(activityRepo.activityData[1]).to.be.an.instanceof(Activity);
  });

  it('should return the miles a given user has walked on a given date', function() {
    expect(activityRepo.getMilesByStepsForDate(1, '2019/06/15', userRepo)).to.eql(8.1);
  });

  it('should return the number of minutes a given user was active for on a given day', function() {
    expect(activityRepo.getActiveMinutesByDate(11, '2019/06/16')).to.eql(106);
  });

  it('should return average active minutes in a given week', function() {
    expect(activityRepo.getAverageMinutesActiveForWeek(11, '2019/06/17', userRepo)).to.eql('87.0');
  });

  it('should return true/false if the given user met their step goal on a given day', function() {
    expect(activityRepo.accomplishStepGoalForDay(1, '2019/06/15', userRepo.users[0])).to.eql(true);
  });

  it('should return all days that a given user exceeded their step goal', function() {
    expect(activityRepo.exceededStepGoalForDay(1, userRepo.users[0])).to.eql(['2019/06/15']);
  });
  it('should return the highest number of stairs climbed in a day for all time', function() {
    expect(activityRepo.getStairClimbingRecord(11)).to.eql(37);
  });

  it('should return the average flight of stairs for all users on given day', function() {
    expect(activityRepo.getAllUsersAverageDataForDay('2019/06/15', userRepo, 'flightsOfStairs')).to.eql(22.5)
  })

  it('should return average steps taken for given date for all users', function() {
    expect(activityRepo.getAllUsersAverageDataForDay('2019/06/15', userRepo, 'numSteps')).to.eql(6250)
  });

  it('should return average minutes active given date for all users', function() {
    expect(activityRepo.getAllUsersAverageDataForDay('2019/06/15', userRepo, 'minutesActive')).to.eql(108.8)
  });

  it('should return steps for given user on given date', function() {
    expect(activityRepo.getUserDataByDate(2, '2019/06/15', userRepo, 'numSteps')).to.eql(4000);
  });

  it('should return minutes active for given user on given date', function() {
    expect(activityRepo.getUserDataByDate(11, '2019/06/16', userRepo, 'minutesActive')).to.eql(106);
  });

  it('should return a weeks worth steps for a given user', function() {
    expect(activityRepo.getUserDataForWeek(11, '2019/06/17', userRepo, 'numSteps')[2]).to.eql('2019/06/15: 2000');
  });

  it('should return a weeks worth active minutes for a given user', function() {
    expect(activityRepo.getUserDataForWeek(11, '2019/06/17', userRepo, 'minutesActive')[1]).to.eql('2019/06/16: 106');
  });

  it('should return a weeks worth stairs for a given user', function() {
    expect(activityRepo.getUserDataForWeek(11, '2019/06/17', userRepo, 'flightsOfStairs')[2]).to.eql('2019/06/15: 31');
  });

  it('should get a users friend lists activity', function() {
    const result = [
      {
        "userID": 2,
        "date": "2019/06/15",
        "numSteps": 4000,
        "minutesActive": 138,
        "flightsOfStairs": 10
      },
      {
        "userID": 3,
        "date": "2019/06/15",
        "numSteps": 9000,
        "minutesActive": 116,
        "flightsOfStairs": 33
      }
    ]
    expect(activityRepo.getFriendsActivityData(userRepo.users[0], userRepo)).to.eql(result)
  });

  it('should get a users ranked friendslist activity for a chosen week', function() {
    expect(activityRepo.getFriendsAverageStepsForWeek(userRepo.users[1], '2019/06/17', userRepo)).to.eql([{ '1': 10000 }, { '3': 9000 }, { '11': 3667 }]);
  });

  it('should get a users ranked friendslist activity for a chosen week with names', function() {
    expect(activityRepo.displayStepChallengeWinner(userRepo.users[0], '2019/06/15', userRepo)).to.eql([
      'The Rock: 9000', 'Allie McCarthy: 4000'
    ])
  });

  it('should know the ID of the winning friend', function() {
    expect(activityRepo.getWinnerById(userRepo.users[1], '2019/06/15', userRepo)).to.eql(1)
  });

  it('should show a 3-day increasing streak for a users step count', function() {
    expect(activityRepo.displayIncreasedSteps(userRepo, 11, 'numSteps')).to.eql(['2019/06/17'])
  });

  it('should show a 3-day increasing streak for a users minutes of activity', function() {
    expect(activityRepo.displayIncreasedSteps(userRepo, 11, 'minutesActive')).to.eql(['2019/06/17'])
  });
});