import Sleep from "./Sleep";
import DataRepo from "./Data-repo";

class SleepRepo extends DataRepo {
  constructor(sleepData) {
    super()
    if (!sleepData) {
      this.sleepData = []
    } else {
      this.sleepData = sleepData.map(data => new Sleep(data));
    }
  }

  calcAverageUserSleep(id, dataKey) {
    let userData = this.getDataMatchingUserID(id, this.sleepData);
    let averageSleep = this.calculateAverage(userData, dataKey);
    return Math.round(averageSleep * 10) / 10;
  }


  calcDailySleep(id, date, dataKey) {
    let userData = this.getDataMatchingUserID(id, this.sleepData);
    return this.getDataByDate(date, userData)[dataKey];
  }



  getWeekOfSleep(date, id) {
    let userData = this.getDataMatchingUserID(id, this.sleepData);
    let sortedData = this.sortDataByDate(userData);
    let indexOfDate = this.getIndexOfDate(date, sortedData);
    let weekOfData = this.getDataInDateSpan(indexOfDate, 7, sortedData);
    return weekOfData;
  }



  calcAllUserSleepQuality() {
    return Math.round(this.calculateAverage(this.sleepData, 'sleepQuality'));
  }

  determineBestSleepers(date, userList) {
    return userList.reduce((wellRestedUsers, user) => {
      let weekOfData = this.getWeekOfSleep(date, user.id);
      let averageSleepQuality = this.calculateAverage(weekOfData, 'sleepQuality');
      if (averageSleepQuality > 3) {
        wellRestedUsers.push(user);
      }
      return wellRestedUsers;
    }, [])
  }



  getMaxSleepData(date) {
    let sleepDataOnDate = this.getDataMatchingDate(date, this.sleepData);
    let sortedSleepData = sleepDataOnDate.sort((a, b) => b.hoursSlept - a.hoursSlept);
    let maxSleep = sortedSleepData[0].hoursSlept;
    return sortedSleepData.filter(data => {
      return data.hoursSlept === maxSleep
    });
  }

  getUsersWithMostSleepForDay(dataSet, userRepo) {
    let users = dataSet.reduce((usersWithMaxSleep, data) => {
      let matchingUser = userRepo.users.find(user => user.id === data.userID);
      usersWithMaxSleep.push(matchingUser);
      return usersWithMaxSleep
    }, [])
    return users.map(user => user.name)
  }



}

export default SleepRepo;
