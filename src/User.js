class User {
  constructor(userDetails) {
    this.id = userDetails.id;
    this.name = userDetails.name;
    this.address = userDetails.address;
    this.email = userDetails.email;
    this.strideLength = userDetails.strideLength;
    this.dailyStepGoal = userDetails.dailyStepGoal;
    this.friends = userDetails.friends;

  }
  getFirstName() {
    return this.name.split(' ', 1).join();
  }
//This method takes the users name, splits it by a "space", and then only allows one split element to come back. As far as I can tell, the .join() is being used to turn this from an array to a string & could also be .toString().

// The output from this method is piped into the DOM via scripts.js (line 89), to show up in the main header: "<first name>'s Activity Tracker'"

  getFriendsNames(userStorage) {
    return this.friends.map((friendId) => (userStorage.getDataFromID(friendId).name));
  }
}
//This method returns the names of friends into the friends list (via line 95 of scripts.js). 

// The output from this method is piped into the DOM via scripts.js (line 99) as <li> elements.

export default User;
