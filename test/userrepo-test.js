import { expect } from 'chai';

import UserRepo from '../src/User-repo';
import User from '../src/User';


describe.only('User Repo', function() {
  let user1;
  let user2;
  let users; // This was originally missing an "s" at the end, so this test suite wouldn't run
  let userRepo;

  beforeEach(function() {
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
    users = [user1, user2];
    userRepo = new UserRepo(users);
  });
// In these beforeEach() statements, should we use a copy of one of the elements in the data array?
  // For example, user1 = new User(userData[0]) and user2 = new User(userData[1])

  it('should be a function', function() {
    const userRepo = new UserRepo();

    expect(UserRepo).to.be.a('function');
  });
  //This test looks good to me- making sure that UserRepo is indeed a function

  it('should store an array of Users', function() {

    expect(userRepo.users[0]).to.be.an.instanceof(User);
  });
  // This test isn't really worded for what it's testing. I think there should be some sad path testing here as well- what happens if the argument passed in is undefined/falsey/null/number/etc??
  // This assertion is appropriate for a test like: "it (should have a list of users)" & I think an appropriate followup would be, each of these users should be instances of `User`.

  it('should have a parameter to take in user data', function() {
  //Lines 53-65: I'm not sure why this code is here- if the beforeEach() is set up properly, there wouldn't need to be a new user1 & repo instantiation. If you comment all of these lines out, this test still passes, indicating the beforeEach() is working properly.
    // const user1 = new User({
    //   id: 1,
    //   name: "Alex Roth",
    //   address: "1234 Turing Street, Denver CO 80301-1697",
    //   email: "alex.roth1@hotmail.com",
    //   strideLength: 4.3,
    //   dailyStepGoal: 10000,
    //   friends: [2, 3, 4]
    // });
    // const users = [user1];
    // const userRepo = new UserRepo(users);
    //
    // console.log('here: ', userRepo.users[0]);

    expect(userRepo.users[0].id).to.equal(1);
  });
// Here, I think we're wanting to get at sad path testing for arguments that ARENT user objects.

  it('should return user data when given user ID', function() {

  // This line of code is extraneous & I think this assertion should be a deep equal (looking at an Object)
    // userRepo.getUserFromId(1);

    expect(userRepo.getUserFromId(1).id).to.eql(1);
  });
//

  it('should return the average of all users step goals', function() {

// This line of code is extraneous
    // userRepo.calculateAverageStepGoal();

    expect(userRepo.calculateAverageStepGoal()).to.eql(9500);
  });
  //This test looks solid! & is indeed the average of these 2 users step goals (10000 + 9000 / 2 = 9500).

  describe('array changes', function() {
// I am not sure why ANY of these tests are in this file! To me, it seems like a lot of this data retrieval can/should be happening within the Hydration/Activity/Sleep class files. (Though I totally may be off here!)
    let user1;
    let user2;
    let user3;
    let user4;
    let user5;
    let users;
    let userRepo;
    let hydrationData;
    let sleepData;

    beforeEach(function() {
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
        friends: [1, 2, 3]
      });

      user5 = new User({
        id: 5,
        name: "Bugs Bunny",
        address: "1234 Looney Street, Denver CO 80301-1697",
        email: "BugsB1@hotmail.com",
        strideLength: 3.8,
        dailyStepGoal: 7000,
        friends: [1, 2, 3]
      });
      users = [user1, user2, user3, user4, user5];
      userRepo = new UserRepo(users);

      hydrationData = [{
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
          "userID": 3,
          "date": "2019/05/09",
          "numOunces": 1
        },
        {
          "userID": 4,
          "date": "2019/04/15",
          "numOunces": 36
        },
        {
          "userID": 2,
          "date": "2018/10/23",
          "numOunces": 34
        },
        {
          "userID": 1,
          "date": "2018/06/16",
          "numOunces": 39
        },
        {
          "userID": 3,
          "date": "2018/03/30",
          "numOunces": 2
        },
        {
          "userID": 4,
          "date": "2018/02/01",
          "numOunces": 28
        },
        {
          "userID": 1,
          "date": "2016/08/22",
          "numOunces": 30
        },
        {
          "userID": 3,
          "date": "2016/05/14",
          "numOunces": 3
        },
        {
          "userID": 2,
          "date": "2016/04/27",
          "numOunces": 40
        },
        {
          "userID": 4,
          "date": "2019/03/15",
          "numOunces": 35
        },
        {
          "userID": 4,
          "date": "2019/09/20",
          "numOunces": 40
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
        {
          "userID": 4,
          "date": "2019/09/17",
          "numOunces": 40
        },
        {
          "userID": 4,
          "date": "2019/09/16",
          "numOunces": 30
        },
        {
          "userID": 4,
          "date": "2019/09/15",
          "numOunces": 30
        },
        {
          "userID": 3,
          "date": "2019/09/17",
          "numOunces": 30
        }
      ]

      sleepData = [{
          "userID": 1,
          "date": "2017/06/15",
          "hoursSlept": 6.1,
          "sleepQuality": 2.2
        },
        {
          "userID": 2,
          "date": "2017/06/15",
          "hoursSlept": 7,
          "sleepQuality": 4.7
        },
        {
          "userID": 3,
          "date": "2017/06/15",
          "hoursSlept": 2,
          "sleepQuality": 3
        },
        {
          "userID": 4,
          "date": "2017/06/15",
          "hoursSlept": 5.4,
          "sleepQuality": 3
        },
        {
          "userID": 1,
          "date": "2018/07/15",
          "hoursSlept": 4.1,
          "sleepQuality": 3.6
        },
        {
          "userID": 2,
          "date": "2018/07/15",
          "hoursSlept": 9.6,
          "sleepQuality": 2.9
        },
        {
          "userID": 3,
          "date": "2018/07/15",
          "hoursSlept": 2,
          "sleepQuality": 3
        },
        {
          "userID": 4,
          "date": "2018/07/23",
          "hoursSlept": 8.1,
          "sleepQuality": 3.5
        },
        {
          "userID": 1,
          "date": "2019/05/30",
          "hoursSlept": 8.9,
          "sleepQuality": 2.2
        },
        {
          "userID": 2,
          "date": "2019/05/30",
          "hoursSlept": 4.4,
          "sleepQuality": 1.6
        },
        {
          "userID": 3,
          "date": "2019/05/30",
          "hoursSlept": 4,
          "sleepQuality": 1
        },
        {
          "userID": 4,
          "date": "2019/05/30",
          "hoursSlept": 8,
          "sleepQuality": 3.4
        },
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
          "sleepQuality": 1
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
        {
          "userID": 2,
          "date": "2019/06/19",
          "hoursSlept": 10.1,
          "sleepQuality": 3.3
        },
        {
          "userID": 2,
          "date": "2019/06/18",
          "hoursSlept": 7.9,
          "sleepQuality": 3.6
        },
        {
          "userID": 2,
          "date": "2019/06/17",
          "hoursSlept": 5.9,
          "sleepQuality": 3.6
        },
        {
          "userID": 2,
          "date": "2019/06/16",
          "hoursSlept": 9.6,
          "sleepQuality": 4
        },
        {
          "userID": 2,
          "date": "2019/06/15",
          "hoursSlept": 9,
          "sleepQuality": 3.1
        },
        {
          "userID": 5,
          "date": "2019/06/21",
          "hoursSlept": 9,
          "sleepQuality": 4
        },
        {
          "userID": 5,
          "date": "2019/06/20",
          "hoursSlept": 8,
          "sleepQuality": 4
        },
        {
          "userID": 5,
          "date": "2019/06/19",
          "hoursSlept": 10,
          "sleepQuality": 4
        },
        {
          "userID": 5,
          "date": "2019/06/18",
          "hoursSlept": 9,
          "sleepQuality": 4
        },
        {
          "userID": 5,
          "date": "2019/06/17",
          "hoursSlept": 8,
          "sleepQuality": 4
        },
        {
          "userID": 5,
          "date": "2019/06/16",
          "hoursSlept": 10,
          "sleepQuality": 4
        },
        {
          "userID": 5,
          "date": "2019/06/15",
          "hoursSlept": 9,
          "sleepQuality": 4
        }
      ];
    });
    it('should get a users data from its userID in any data set', function() {
      expect(userRepo.getDataMatchingUserID(1, hydrationData)).to.eql([{
          "userID": 1,
          "date": "2019/06/15",
          "numOunces": 37
        },
        {
          "userID": 1,
          "date": "2018/06/16",
          "numOunces": 39
        },
        {
          "userID": 1,
          "date": "2016/08/22",
          "numOunces": 30
        }
      ]);
    });
    //test missing for sortDataByDate
  

    it('should get a users most recent date using the app', function() {
      expect(userRepo.getLatestDateInData(4, hydrationData)).to.eql("2019/09/20");
    });


    it('should sort data by date and extract its week', function() {

      expect(userRepo.getDataFromLatestWeek(4, hydrationData)[3].date).to.eql("2019/09/17");
    });


    it('should get a sorted week of data for a single user from a date', function() {
      expect(userRepo.getSpecifiedWeekOfData('2019/09/17', 4, hydrationData)[3].date).to.eql("2019/04/15");
      expect(userRepo.getSpecifiedWeekOfData('2019/09/18', 4, hydrationData)[3].date).to.eql("2019/09/15");
    });
// This test has multiple expect statements, which (I think) is a no. This method is not used in scripts.js.

    it('should get a week of data for all users in data set', function() {
      expect(userRepo.getAllUsersWeekOfData(hydrationData, '2019/09/17')[2].date).to.eql("2019/09/15");
      expect(userRepo.getAllUsersWeekOfData(hydrationData, '2019/09/17')[2].userID).to.eql(4);
      expect(userRepo.getAllUsersWeekOfData(hydrationData, '2019/09/17')[3].date).to.eql("2019/09/17");
      expect(userRepo.getAllUsersWeekOfData(hydrationData, '2019/09/17')[3].userID).to.eql(3);
    });
    it('should get a day of data for all users in data set', function() {
      expect(userRepo.getAllUsersDayData(sleepData, '2019/06/15')[0].date).to.eql('2019/06/15');
      expect(userRepo.getAllUsersDayData(sleepData, '2019/06/15')[0].hoursSlept).to.eql(9);
      expect(userRepo.getAllUsersDayData(sleepData, '2019/06/15')[2].date).to.eql('2019/06/15');
      expect(userRepo.getAllUsersDayData(sleepData, '2019/06/15')[2].userID).to.eql(5);
    });
    it('should isolate a user ID and its values of any relevant data', function() {
      expect(userRepo.isolateUserIdAndPropertyData('sleepQuality', userRepo.getAllUsersWeekOfData(sleepData, "2019/06/21"))).to.eql({
        '2': [3.5, 4, 3.3, 3.6, 3.6, 4, 3.1],
        '4': [3.5, 4, 1.3, 1.6, 1.6, 1, 3.1],
        '5': [4, 4, 4, 4, 4, 4, 4]
      })
      expect(userRepo.isolateUserIdAndPropertyData('numOunces', userRepo.getAllUsersWeekOfData(hydrationData, "2019/05/09"))).to.eql({
        '3': [1]
      })
    });
    it('should rank user ids according to relevant data value averages', function() {
      expect(userRepo.rankUserIdsByPropertyValues( 'sleepQuality', userRepo.getAllUsersWeekOfData(sleepData, "2019/06/21"))).to.eql(['5', '2', '4'])
    });
    it('should show list in order of userID and average of relevant value', function() {
      expect(userRepo.getRankedUserIDsWithDataAverages('sleepQuality', userRepo.getAllUsersWeekOfData(sleepData, "2019/06/21"))[0]).to.eql({
        '5': 4
      })
    });

  });
});
