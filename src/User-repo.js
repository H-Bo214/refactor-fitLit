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

  getUserFromId(id) {
    return this.users.find((user) => user.id === id);
  }

  calculateAverageStepGoal() {
    return this.calculateAverage(this.users, 'dailyStepGoal');
  }
}

export default UserRepo;
