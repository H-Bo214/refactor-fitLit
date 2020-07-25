// Items that need to be included in the Sleep class:

// For a user (identified by their userID), the average number of hours slept per day
// For a user, their average sleep quality per day over all time
// For a user, how many hours they slept for a specific day (identified by a date)
// For a user, their sleep quality for a specific day (identified by a date)
// For a user, how many hours slept each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
// For a user, their sleep quality each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
// For all users, the average sleep quality
// Find all users who average a sleep quality greater than 3 for a given week (7 days) - you should be able to calculate this for any week, not just the latest week
// For a given day (identified by the date), find the users who slept the most number of hours (one or more if they tied)
// Make a metric of your own! Document it, calculate it, and display it.

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

  getUsersWithMostSleepWeekly(date, userRepo) {
    

    let timeline = userRepo.getAllUsersWeekOfData(this.sleepData, date);
    let sleepRankWithData = userRepo.getRankedUserIDsWithDataAverages('sleepQuality', timeline);
    return this.getBestSleepersForWeekandDay(sleepRankWithData, userRepo);
  }
  //function for users who have slept the most for the past week

  getUsersWithMostSleepForDay(date, userRepo) {
    let timeline = userRepo.getAllUsersDayData(this.sleepData, date);
    let sleepRankWithData = userRepo.getRankedUserIDsWithDataAverages('hoursSlept', timeline);

    return this.getBestSleepersForWeekandDay(sleepRankWithData, userRepo);
  }
  //function for users who have slept the most for the day

  getBestSleepersForWeekandDay(sortedArray, userRepo) {
    let bestSleepers = sortedArray.filter(function(element) {
      return element[Object.keys(element)] === Object.values(sortedArray[0])[0]
    });
    let bestSleeperIds = bestSleepers.map(bestSleeper => (Object.keys(bestSleeper)));
    return bestSleeperIds.map(sleepNumber => userRepo.getUserFromId(parseInt(sleepNumber)).name);
  }
  //function for extracting user names for those who slept the most that week and the most that day
}

//get all-time avg # hrs of sleep for a user

export default SleepRepo;
