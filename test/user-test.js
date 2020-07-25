import { expect } from 'chai';

import UserRepo from '../src/User-repo';
import User from '../src/User';

describe('User', function() {
  let user, user2;

  beforeEach(function() {
    user = new User({
      id: 1,
      name: "Alex Roth",
      address: "1234 Turing Street, Denver CO 80301-1697",
      email: "alex.roth1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [2, 3]
    });
    user2 = new User({
      id: 2,
      name: "Allie McCarthy",
      address: "1235 Turing Street, Denver CO 80301-1697",
      email: "allie.mcc1@hotmail.com",
      strideLength: 3.3,
      dailyStepGoal: 9000,
      friends: [1, 3]
    });
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function() {
    expect(user).to.be.an.instanceof(User);
  });

  it('should have an id', function() {

    expect(user.id).to.equal(1);
  });

  it('should have a name', function() {
    expect(user.name).to.equal('Alex Roth')
  });

  it('should have an address', function () {
    expect(user.address).to.equal('1234 Turing Street, Denver CO 80301-1697')
  });

  it('should have an email address', function () {
    expect(user.email).to.equal('alex.roth1@hotmail.com')
  });

  it('should have a stride length', function () {
    expect(user.strideLength).to.equal(4.3)
  });

  it('should have a step goal', function () {
    expect(user.dailyStepGoal).to.equal(10000)
  });

  it('should have friends', function () {
    expect(user.friendsIds).to.deep.equal([2, 3])
  });

  it('should be able to return its first name', function() {
    expect(user2.getUserFirstName()).to.equal('Allie');
  });

  it('should return a list of friend names from user repository', function() {
    const user3 = new User({
      id: 3,
      name: "The Rock",
      address: "1236 Awesome Street, Denver CO 80301-1697",
      email: "therock@hotmail.com",
      strideLength: 10,
      dailyStepGoal: 60000,
      friends: [1, 2, 4]
    });
    const newUsers = [user, user2, user3];
    const newUserRepo = new UserRepo(newUsers);

    expect(user2.getFriendsNames(newUserRepo)).to.deep.equal(['Alex Roth', 'The Rock']);
  });
});
