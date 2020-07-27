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

  createActivityData(id, date, userRepo) {
    let userName = userRepo.getUserFromId(id).name;
    let userData = this.getUserDataForWeek(id, date);
    let userStepData = userData.map((data) => data.numSteps);
    let userSum = userStepData.reduce((sum, data) => sum += data);
    let userInfo = {
      id: id,
      name: userName,
      userData: userStepData,
      userSum: userSum
    }
    return userInfo
  }

  getFriendsActivityData(user, userRepo, date) {
    return user.friendsIds.reduce((friendActivityData, id) => {
      let friendInfo = this.createActivityData(id, date, userRepo);
      friendActivityData.push(friendInfo)
      return friendActivityData
    }, [])
  }

  getStepChallengeWinner(user, date, userRepo) {
    let currentUserData = this.createActivityData(user.id, date, userRepo);
    let friendActivityData = this.getFriendsActivityData(user, userRepo, date);
    friendActivityData.push(currentUserData);
    let sortedData = friendActivityData.sort((a, b) => b.userSum - a.userSum);
    return [sortedData[0].name, sortedData[0].userSum, sortedData[0].id]
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

}



export default ActivityRepo;
