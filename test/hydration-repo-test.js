import { expect } from 'chai';
import HydrationRepo from '../src/Hydration-repo';
import UserRepo from '../src/User-repo';

describe('Hydration', function() {
  let hydrationData, hydration, user1, user2, users, userRepo;

  beforeEach(function() {
    hydrationData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "numOunces": 37
      },
      {
        "userID": 2,
        "date": "2019/06/15",
        "numOunces": 38
      },
      {
        "userID": 2,
        "date": "2018/10/23",
        "numOunces": 34
      },
      {
        "userID": 4,
        "date": "2019/09/19",
        "numOunces": 30
      },
      {
        "userID": 4,
        "date": "2019/09/18",
        "numOunces": 40
      },
    ]
    hydration = new HydrationRepo(hydrationData)
   
    user1 = {
      id: 3,
      name: "The Rock",
      address: "1236 Awesome Street, Denver CO 80301-1697",
      email: "therock@hotmail.com",
      strideLength: 10,
      dailyStepGoal: 60000,
      friends: [1, 2, 4]
    };

    user2 = {
      id: 4,
      name: "Rainbow Dash",
      address: "1237 Equestria Street, Denver CO 80301-1697",
      email: "rainbowD1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3]
    };
    users = [user1, user2];
    userRepo = new UserRepo(users);
  });

  it('should take in a list of data', function() {
    expect(hydration.hydrationData[0].userID).to.equal(1);
    expect(hydration.hydrationData[1].numOunces).to.equal(38);
    expect(hydration.hydrationData[2].date).to.equal('2018/10/23');
  });

  it('should find the average water intake per day for a user', function() {
    expect(hydration.calcAvgOuncesConsumedByDay(2)).to.equal(36);
  });

  it('should find the water intake for a user on a specified date', function() {
    expect(hydration.calcOuncesConsumedByDay(1, "2019/06/15")).to.equal(37);
    expect(hydration.calcOuncesConsumedByDay(4, "2019/09/18")).to.equal(40);
  });

  it('should find water intake by day for first week', function() {
    expect(hydration.calcRecentWeekOunces(userRepo, 4)[0]).to.eql('2019/09/19: 30');
  });

  it('should find water intake by day for any week', function() {
    expect(hydration.calcWeekOunces('2019/09/19', 4).to.eql('2019/09/18: 40');
    expect(hydration.calcWeekOunces('2018/10/23', 2).to.eql('2018/10/23: 34');
  });
});