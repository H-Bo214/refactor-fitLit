// For a specific day (specified by a date), return the miles a user has walked based on their number of steps (use their strideLength to help calculate this)
// For a user, (identified by their userID) how many minutes were they active for a given day (specified by a date)?
// For a user, how many minutes active did they average for a given week (7 days)?
// For a user, did they reach their step goal for a given day (specified by a date)?
// For a user, find all the days where they exceeded their step goal
// For a user, find their all-time stair climbing record
// For all users, what is the average number of:
// stairs climbed for a specified date
// steps taken for a specific date
// minutes active for a specific date
// Make a metric of your own! Document it, calculate it, and display it.
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
//dataset passed into constructor is array of objects with userID, date, numSteps, minutesActive & flightsOfStairs properties
//scripts declares just ONE instance of the activity class that holds ALL of activityData; this class should probably be renamed Activity-repo & we should create an additional DailyActivity class that represents each activity object, with its 5 properties

  getMilesByStepsForDate(id, date, userRepo) {
    let userData = this.getDataMatchingUserID(id, this.activityData);
    let activityOnDate = this.getDataByDate(date, userData)
    let user = userRepo.getUserFromId(id);
    return parseFloat(((activityOnDate.numSteps * user.strideLength) / 5280).toFixed(1));
  }
//finds activity based on userId & date; accesses that activity's numSteps & multiplies it by stride length from userRepo?????????, dividing by 5280 to get # of miles walked on that date
//this is not displayed on DOM and SHOULD be according to spec
//Also doesn't makes sense to access userRepo.strideLength for this, as this will access the entire array of user data
//instead, need to find user within userRepo whose id matches the id passed into function & access THAT user's strideLength property
//(console.log(userRepo.stridelength)returns undefined)


  getActiveMinutesByDate(id, date) {
    let userData = this.getDataMatchingUserID(id, this.activityData);
    let activityOnDate = this.getDataByDate(date, userData)
    return activityOnDate.minutesActive;
  }

  // Not displayed on DOM. Confirm functional via test.
  getAverageMinutesActiveForWeek(id, date) {
    let userData = this.getDataMatchingUserID(id, this.activityData);
    let sortedData = this.sortDataByDate(userData);
    let indexOfDate = this.getIndexOfDate(date, sortedData)
    let weekOfData = this.getDataInDateSpan(indexOfDate, 7, sortedData);
    return Math.round(this.calculateAverage(weekOfData, 'minutesActive'))
  }

  // Not displayed on DOM. Confirm functional via test.
  accomplishStepGoalForDay(id, date, userRepo) {
    let user = userRepo.getUserFromId(id)
    let userData = this.getDataMatchingUserID(id, this.activityData);
    let dataOneDay = this.getDataByDate(date, userData);
    return dataOneDay.numSteps >= user.dailyStepGoal; 
  }

  // Not displayed on DOM. Confirm functional via test.
  exceededStepGoalForDay(id, userRepo) {
    let user = userRepo.getUserFromId(id)
    let userData = this.getDataMatchingUserID(id, this.activityData);
    let daysExceeded = userData.filter(data => data.numSteps > user.dailyStepGoal);
    return daysExceeded.map(data => data.date);
  }

// Not displayed on DOM. Confirm functional via test.
  getStairClimbingRecord(id) {
    let userData = this.getDataMatchingUserID(id, this.activityData);
    return userData.reduce((max, data) => (data.flightsOfStairs > max) ? data.flightsOfStairs : max);
  }

  getAllUsersAverageDataForDay(date, dataKey) {
    let selectedDayData = this.getDataMatchingDate(date, this.activityData);
    return Math.round(this.calculateAverage(selectedDayData, dataKey))
  }

  getUserDataByDate(id, date, dataKey) {
    let userData = this.getDataMatchingUserID(id, this.activityData);
    return this.getDataByDate(date, userData)[dataKey];
  }

  getUserDataForWeek(id, date,) {
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
