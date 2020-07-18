import sleepData from './data/sleep';

class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }
  calculateAverageSleep(id) {
    let perDaySleep = this.sleepData.filter((data) => id === data.userID);
    return perDaySleep.reduce((sumSoFar, data) => {
      return sumSoFar += data.hoursSlept;
    }, 0) / perDaySleep.length;
  }
  calculateAverageSleepQuality(id) {
    let perDaySleepQuality = this.sleepData.filter((data) => id === data.userID);
    return perDaySleepQuality.reduce((sumSoFar, data) => {
      return sumSoFar += data.sleepQuality;
    }, 0) / perDaySleepQuality.length;
  }
  calculateDailySleep(id, date) {
    let findSleepByDate = this.sleepData.find((data) => id === data.userID && date === data.date);
    return findSleepByDate.hoursSlept;
  }

    //needs to be displayed on DOM
  calculateDailySleepQuality(id, date) {
    let findSleepQualityByDate = this.sleepData.find((data) => id === data.userID && date === data.date);
    return findSleepQualityByDate.sleepQuality;
  }
  calculateWeekSleep(date, id, userRepo) {
    return userRepo.getWeekFromDate(date, id, this.sleepData).map((data) => `${data.date}: ${data.hoursSlept}`);
  }
  calculateWeekSleepQuality(date, id, userRepo) {
    return userRepo.getWeekFromDate(date, id, this.sleepData).map((data) => `${data.date}: ${data.sleepQuality}`);
  }
  calculateAllUserSleepQuality() {
    var totalSleepQuality = this.sleepData.reduce(function(sumSoFar, dataItem) {
      sumSoFar += dataItem.sleepQuality;
      return sumSoFar;
    }, 0)
    return totalSleepQuality / sleepData.length
  }
  determineBestSleepers(date, userRepo) {
    let timeline = userRepo.chooseWeekDataForAllUsers(this.sleepData, date);
    let userSleepObject = userRepo.isolateUsernameAndRelevantData(this.sleepData, date, 'sleepQuality', timeline);

    return Object.keys(userSleepObject).filter(function(key) {
      return (userSleepObject[key].reduce(function(sumSoFar, sleepQualityValue) {
        sumSoFar += sleepQualityValue
        return sumSoFar;
      }, 0) / userSleepObject[key].length) > 3
    }).map(function(sleeper) {
      return userRepo.getDataFromID(parseInt(sleeper)).name;
    })
  }
  determineSleepWinnerForWeek(date, userRepo) {
    let timeline = userRepo.chooseWeekDataForAllUsers(this.sleepData, date);
    let sleepRankWithData = userRepo.combineRankedUserIDsAndAveragedData(this.sleepData, date, 'sleepQuality', timeline);

    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  }
  determineSleepHoursWinnerForDay(date, userRepo) {
    let timeline = userRepo.chooseDayDataForAllUsers(this.sleepData, date);
    let sleepRankWithData = userRepo.combineRankedUserIDsAndAveragedData(this.sleepData, date, 'hoursSlept', timeline);

    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  }
  getWinnerNamesFromList(sortedArray, userRepo) {
    let bestSleepers = sortedArray.filter(function(element) {
      return element[Object.keys(element)] === Object.values(sortedArray[0])[0]
    });

    let bestSleeperIds = bestSleepers.map(function(bestSleeper) {
      return (Object.keys(bestSleeper));
    });

    return bestSleeperIds.map(function(sleepNumber) {
      return userRepo.getDataFromID(parseInt(sleepNumber)).name;
    });
  }
}

//get all-time avg sleep quality

//get all-time avg # hrs of sleep


export default Sleep;
