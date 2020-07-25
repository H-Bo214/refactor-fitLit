import DataRepo from './Data-repo'
import Activity from "./Activity";

class ActivityRepo extends DataRepo {
  constructor(activityData) {
    super()
    if (!activityData) {
      this.activityData = []
    } else {
      this.activityData = activityData.map(data => new Activity(data));
    }
  }

  getMilesByStepsForDate(id, date, userRepo) {
    let userData = this.getDataMatchingUserID(id, this.activityData);
    let activityOnDate = this.getDataByDate(date, userData)
    let user = userRepo.getUserFromId(id);
    return parseFloat(((activityOnDate.numSteps * user.strideLength) / 5280).toFixed(1));
  }

  getActiveMinutesByDate(id, date) {
    let userData = this.getDataMatchingUserID(id, this.activityData);
    let activityOnDate = this.getDataByDate(date, userData)
    return activityOnDate.minutesActive;
  }

  getAverageMinutesActiveForWeek(id, date) {
    let userData = this.getDataMatchingUserID(id, this.activityData);
    let sortedData = this.sortDataByDate(userData);
    let indexOfDate = this.getIndexOfDate(date, sortedData)
    let weekOfData = this.getDataInDateSpan(indexOfDate, 7, sortedData);
    return Math.round(this.calculateAverage(weekOfData, 'minutesActive'))
  }

  accomplishStepGoalForDay(id, date, userRepo) {
    let user = userRepo.getUserFromId(id)
    let userData = this.getDataMatchingUserID(id, this.activityData);
    let dataOneDay = this.getDataByDate(date, userData);
    return dataOneDay.numSteps >= user.dailyStepGoal; 
  }

  exceededStepGoalForDay(id, userRepo) {
    let user = userRepo.getUserFromId(id)
    let userData = this.getDataMatchingUserID(id, this.activityData);
    let daysExceeded = userData.filter(data => data.numSteps > user.dailyStepGoal);
    return daysExceeded.map(data => data.date);
  }

  getStairClimbingRecord(id) {
    let userData = this.getDataMatchingUserID(id, this.activityData);
    return userData.reduce((max, data) => (data.flightsOfStairs > max) ? data.flightsOfStairs : max, 0);
  }

  getAllUsersAverageDataForDay(date, dataKey) {
    let selectedDayData = this.getDataMatchingDate(date, this.activityData);
    return Math.round(this.calculateAverage(selectedDayData, dataKey))
  }

  getUserDataByDate(id, date, dataKey) {
    let userData = this.getDataMatchingUserID(id, this.activityData);
    return this.getDataByDate(date, userData)[dataKey];
  }

  getUserDataForWeek(id, date) {
    let userData = this.getDataMatchingUserID(id, this.activityData);
    let sortedData = this.sortDataByDate(userData);
    let indexOfDate = this.getIndexOfDate(date, sortedData)
    let weekOfData = this.getDataInDateSpan(indexOfDate, 7, sortedData);
    return weekOfData;
  }

  // Friends(is for Iteration 5)
    // Will need to refactor the 4 functions below. They use each other to currently function.
  getFriendsActivityData(user, userRepo) {
    let data = this.activityData;
    let userActivityData = user.friendsIds.map(friend => userRepo.getDataMatchingUserID(friend, data));
    return userActivityData.reduce((friendsActivities, listItem) => {
      return friendsActivities.concat(listItem);
    }, []);
  }

  //gets activity data for each friend & merges into 1 array

  getFriendsAverageStepsForWeek(user, date, userRepo) {
    let friendsActivity = this.getFriendsActivityData(user, userRepo);
    let timeline = userRepo.getAllUsersWeekOfData(friendsActivity, date);
    return userRepo.getRankedUserIDsWithDataAverages('numSteps', timeline)
  }
  //gets friends' average steps for week? need to review all methods to be sure of accuracy

  displayStepChallengeWinner(user, date, userRepo) {
    let rankedList = this.getFriendsAverageStepsForWeek(user, date, userRepo);
    return rankedList.map(function(listItem) {
      let userID = Object.keys(listItem)[0];
      let userName = userRepo.getUserFromId(parseInt(userID)).name;
      return `${userName}: ${listItem[userID]}`
    })
  }
//returns user's name & data for the challenge winner

  displayWinner(user, date, userRepo) {
    let namedList = this.displayStepChallengeWinner(user, date, userRepo);
    let winner = this.displayStepChallengeWinner(user, date, userRepo).shift();
    return winner;
  }
  displayIncreasedSteps(userRepo, id, dataKey) {
    let data = this.activityData;
    let sortedUserArray = (userRepo.sortDataByDate(id, data)).reverse();
    let streaks = sortedUserArray.filter(function(element, index) {
      if (index >= 2) {
        return (sortedUserArray[index - 2][dataKey] < sortedUserArray[index - 1][dataKey] && sortedUserArray[index - 1][dataKey] < sortedUserArray[index][dataKey])
      }
    });
    return streaks.map(function(streak) {
      return streak.date;
    })
  }
  getWinnerById(user, date, userRepo) {
    let rankedList = this.getFriendsAverageStepsForWeek(user, date, userRepo);
    let keysList = rankedList.map(listItem => Object.keys(listItem));
    return parseInt(keysList[0].join(''))
  }
}



export default ActivityRepo;
