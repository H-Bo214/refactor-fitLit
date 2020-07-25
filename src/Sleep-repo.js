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

  //NO LONGER BEING USED; calcAverageUserSleep is dynamic
  // calcTotalAverageSleepQuality(id) {
  //   let perDaySleepQuality = this.sleepData.filter((data) => id === data.userID);
  //   let averageSleepQuality = perDaySleepQuality.reduce((totalSleepQuality, data) => {
  //     return totalSleepQuality += data.sleepQuality;
  //   }, 0) / perDaySleepQuality.length;
  //   return Math.round(averageSleepQuality * 10) / 10
  // }

  calcDailySleep(id, date, dataKey) {
    let userData = this.getDataMatchingUserID(id, this.sleepData);
    return this.getDataByDate(date, userData)[dataKey];
  }

  //NO LONGER BEING USED; calcDailySleep is dynamic
  // calcSleepQualityForDay(id, date) {
  //   let findSleepQualityByDate = this.sleepData.find((data) => id === data.userID && date === data.date);
  //   return findSleepQualityByDate.sleepQuality;
  // }

  getWeekOfSleep(date, id) {
    let userData = this.getDataMatchingUserID(id, this.sleepData);
    let sortedData = this.sortDataByDate(userData);
    let indexOfDate = this.getIndexOfDate(date, sortedData);
    let weekOfData = this.getDataInDateSpan(indexOfDate, 7, sortedData);
    // console.log(weekOfData)
    return weekOfData;
  }

  //NO LONGER BEING USED; getWeekOfSleep is dynamic
  // calcQualitySleepForWeek(date, id, userRepo) {
  //   return userRepo.getSpecifiedWeekOfData(date, id, this.sleepData).map((data) => `${data.date}: ${data.sleepQuality}`);
  // }

  calcAllUserSleepQuality() {
    return this.calculateAverage(this.sleepData, 'sleepQuality');
  }

  //DOUBLE CHECK THIS WORKS IN TEST SUITE  
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
  
  ////function for users who have slept the most for the past week: DELETING BECAUSE NOT NEEDED IN SPEC
  // getUsersWithMostSleepWeekly(date, userRepo) {
  //   let timeline = userRepo.getAllUsersWeekOfData(this.sleepData, date);
  //   let sleepRankWithData = userRepo.getRankedUserIDsWithDataAverages('sleepQuality', timeline);
  //   return this.getBestSleepersForWeekandDay(sleepRankWithData, userRepo);
  // }

  //DOUBLE CHECK IN TEST SUITE (NOT CALLED IN SCRIPTS); return value from getMaxSleepData gets passed into getUsersWithMostSleepForDay 
  getMaxSleepData(date) {
    let sleepDataOnDate = this.getDataMatchingDate(date, this.sleepData);
    let sortedSleepData = sleepDataOnDate.sort((a, b) => b.hoursSlept - a.hoursSlept);
    let maxSleep = sortedSleepData[0].hoursSlept; 
    return sortedSleepData.filter(data => {
      return data.hoursSlept === maxSleep
    });
  }

  getUsersWithMostSleepForDay(dataSet, userRepo) {
    return dataSet.reduce((usersWithMaxSleep, data) => {
      let matchingUser = userRepo.users.find(user => user.id === data.userID); 
      usersWithMaxSleep.push(matchingUser);
      return usersWithMaxSleep; 
    }, [])
  }

  //function for extracting user names for those who slept the most that week and the most that day: DELETING BECAUSE NOT NEEDED IN SPEC
  // getBestSleepersForWeekandDay(sortedArray, userRepo) {
  //   let bestSleepers = sortedArray.filter(function(element) {
  //     return element[Object.keys(element)] === Object.values(sortedArray[0])[0]
  //   });
  //   let bestSleeperIds = bestSleepers.map(bestSleeper => (Object.keys(bestSleeper)));
  //   return bestSleeperIds.map(sleepNumber => userRepo.getUserFromId(parseInt(sleepNumber)).name);
  // }
  
}

export default SleepRepo;
