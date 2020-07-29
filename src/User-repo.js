import User from "./User";
import DataRepo from './Data-repo'

class UserRepo extends DataRepo {
  constructor(users) {
    super()
    if (!users) {
      this.users = []
    } else {
      this.users = users.map(user => new User(user));
    }
  }

  //Do not delete
  getUserFromId(id) {
    return this.users.find((user) => user.id === id);
  }

  //NOT NEEDED: moved to parent repo
  //  getDataMatchingUserID(id, dataSet) {
  //    return dataSet.filter((data) => data.userID === id);
  // };

  calculateAverageStepGoal() {
    return this.calculateAverage(this.users, 'dailyStepGoal');
  }
}

export default UserRepo;
