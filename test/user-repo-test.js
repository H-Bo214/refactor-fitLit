import { expect } from 'chai';

import UserRepo from '../src/User-repo';
import User from '../src/User';
import DataRepo from '../src/Data-repo';


describe('User Repo', function() {
  let user1, user2, users, userRepo;

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

  it('should be a function', function() {
    expect(UserRepo).to.be.a('function');
  });

  it('should be an instance of UserRepo', function() {
    expect(userRepo).to.be.an.instanceof(UserRepo);
  });

  it('should be an instance of DataRepo', function() {
    expect(userRepo).to.be.an.instanceof(DataRepo);
  });

  it('should store an array of Users', function() {
    expect(userRepo.users[0]).to.be.an.instanceof(User);
  });

  it('should store an empty array if no user data is passed in', function() {
    const userRepo2 = new UserRepo();

    expect(userRepo2.users).to.deep.equal([]);
  });

  it('should be able to locate a user based on a user id', function() {
    expect(userRepo.getUserFromId(1).name).to.eql('Alex Roth');
  });

  it('should be able to calculate the average user step goal', function() {
    expect(userRepo.calculateAverageStepGoal()).to.eql(9500);
  });
});
