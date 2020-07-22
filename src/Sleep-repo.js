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

// import sleepData from './data/sleep';
//data being imported from sleep.js

class SleepRepo {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }
  //need to add to DOM
  calcAverageSleepForDay(id) {
    let perDaySleep = this.sleepData.filter((data) => id === data.userID);
    return perDaySleep.reduce((sumSoFar, data) => {
      return sumSoFar += data.hoursSlept;
    }, 0) / perDaySleep.length;
  }
  //function to calculate number of hours slept per day over all time
  //passing through the user ID
  //filter the data where data.userID is equal to the user id
  //doing the calculation to get the average sleep per day
  //appears to be working

  calcTotalAverageSleepQuality(id) {
    let perDaySleepQuality = this.sleepData.filter((data) => id === data.userID);
    return perDaySleepQuality.reduce((sumSoFar, data) => {
      return sumSoFar += data.sleepQuality;
    }, 0) / perDaySleepQuality.length;
  }
  //function to calculate average sleep quality over all time
  //passing through the user ID
  //filter the data data.userID is equal to the user id
  //doing the calculation to get the average sleep quality
  //the functionality does not appear to be working---most likely a data issue---actually maybe bad code

  calcHoursSleptForDay(id, date) {
    let findSleepByDate = this.sleepData.find((data) => id === data.userID && date === data.date);
    return findSleepByDate.hoursSlept;
  }
  //function to calculate how many hours slept in a specific day (identified by date)
  //passing through id and date
  //find the data where id is equal to data.userID and where date is equal to data.date
  //return the hours slept by date
  //appears on page as you slept 4.3 hours today
  //the functionality does appear to be working

  calcSleepQualityForDay(id, date) {
    let findSleepQualityByDate = this.sleepData.find((data) => id === data.userID && date === data.date);
    return findSleepQualityByDate.sleepQuality;
  }
  //function to calculate the sleep quality for a specific date (identified by date)
  //passing through id and date
  //find the data where id is equal to data.userID and where the date is equal to data.date
  //return the sleep quality by date
  //appears on page as your sleep quality was 1.9 out of 5
  //the functionality does not appear to be working

  calcHoursSleptDailyForWeek(date, id, userRepo) {
    return userRepo.getSpecifiedWeekOfData(date, id, this.sleepData).map((data) => `${data.date}: ${data.hoursSlept}`);
  }
  //function for how many hours slept each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
  //passing through date, id and userRepo
  //using map to create list of date: hoursSlept
  //using getSpecifiedWeekOfData method in userRepo
  //the functionality appears to be working

  calcQualitySleepForWeek(date, id, userRepo) {
    return userRepo.getSpecifiedWeekOfData(date, id, this.sleepData).map((data) => `${data.date}: ${data.sleepQuality}`);
  }
  //function for their sleep quality each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
  //passing through date, id and userRepo
  //using map to create list of date: sleepQuality
  //using getSpecifiedWeekOfData method in userRepo
  //the functionality appears absent

  calcAllUserSleepQuality() {
    var totalSleepQuality = this.sleepData.reduce(function(sumSoFar, dataItem) {
      sumSoFar += dataItem.sleepQuality;
      return sumSoFar;
    }, 0)
    return totalSleepQuality / sleepData.length
  }
  //function for all users sleep quality
  //using reduce to calculate all users sleep quality
  //displaying as the average users sleep quality is 2.98 out of 5
  //the functionality appears to be working

  determineBestSleepers(date, userRepo) {
    let timeline = userRepo.getAllUsersWeekOfData(this.sleepData, date);
    let userSleepObject = userRepo.isolateUserIdAndPropertyData('sleepQuality', timeline);

    return Object.keys(userSleepObject).filter(function(key) {
      return (userSleepObject[key].reduce(function(sumSoFar, sleepQualityValue) {
        sumSoFar += sleepQualityValue
        return sumSoFar;
      }, 0) / userSleepObject[key].length) > 3
    }).map(function(sleeper) {
      return userRepo.getUserFromId(parseInt(sleeper)).name;
    })
  }
  //function to determine the best sleepers among users
  //pass through date and userRepo
  //using getAllUsersWeekOfData from user-repo to calculate timeline
  //using isolateUserIdAndPropertyData from user-repo to calculate pertient info for each user
  //using getUserFromId from user-repo to specifiy user
  //does not appear to be functioning

  getUsersWithMostSleepWeekly(date, userRepo) {
    let timeline = userRepo.getAllUsersWeekOfData(this.sleepData, date);
    let sleepRankWithData = userRepo.getRankedUserIDsWithDataAverages(this.sleepData, date, 'sleepQuality', timeline);

    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  }
  //function for users who have slept the most for the past week

  getUsersWithMostSleepForDay(date, userRepo) {
    let timeline = userRepo.getAllUsersDayData(this.sleepData, date);
    let sleepRankWithData = userRepo.getRankedUserIDsWithDataAverages(this.sleepData, date, 'hoursSlept', timeline);

    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  }
  //function for users who have slept the most for the day

  getBestSleepersForWeekandDay(sortedArray, userRepo) {
    let bestSleepers = sortedArray.filter(function(element) {
      return element[Object.keys(element)] === Object.values(sortedArray[0])[0]
    });

    let bestSleeperIds = bestSleepers.map(function(bestSleeper) {
      return (Object.keys(bestSleeper));
    });

    return bestSleeperIds.map(function(sleepNumber) {
      return userRepo.getUserFromId(parseInt(sleepNumber)).name;
    });
  }
  //function for extracting user names for those who slept the most that week and the most that day
}

//get all-time avg # hrs of sleep for a user

export default SleepRepo;
