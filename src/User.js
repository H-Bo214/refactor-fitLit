class User {
  constructor(userDetails) {
    this.id = userDetails.id;
    this.name = userDetails.name;
    this.address = userDetails.address;
    this.email = userDetails.email;
    this.strideLength = userDetails.strideLength;
    this.dailyStepGoal = userDetails.dailyStepGoal;
    this.friendsIds = userDetails.friends;
  }
  getUserFirstName() {
    return this.name.split(' ', 1).join();
  }
  
  getFriendsNames(users) {
    return this.friendsIds.map(friendId => users.getUserFromId(friendId).name);
  }
}

export default User;
