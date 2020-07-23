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
import Activity from "./Activity";
class ActivityRepo {
  constructor(activityData) {
    if (!activityData) {
      this.activityData = []
    } else {
      this.activityData = activityData.map(activity => new Activity(activity));
    }
  }
//dataset passed into constructor is array of objects with userID, date, numSteps, minutesActive & flightsOfStairs properties
//scripts declares just ONE instance of the activity class that holds ALL of activityData; this class should probably be renamed Activity-repo & we should create an additional DailyActivity class that represents each activity object, with its 5 properties

  getMilesByStepsForDate(id, date, userRepo) {
    let userStepsByDate = this.activityData.find(data => id === data.userID && date === data.date);
    // console.log('userRepo', userRepo);
    // console.log('this.activityData', this.activityData);
    //access the user with the id supplied from userRepo; then access strideLength
    let user = userRepo.getUserFromId(id);
    return parseFloat(((userStepsByDate.numSteps * user.strideLength) / 5280).toFixed(1));
  }
//finds activity based on userId & date; accesses that activity's numSteps & multiplies it by stride length from userRepo?????????, dividing by 5280 to get # of miles walked on that date
//this is not displayed on DOM and SHOULD be according to spec
//Also doesn't makes sense to access userRepo.strideLength for this, as this will access the entire array of user data
//instead, need to find user within userRepo whose id matches the id passed into function & access THAT user's strideLength property
//(console.log(userRepo.stridelength)returns undefined)


  getActiveMinutesByDate(id, date) {
    let userActivityByDate = this.activityData.find(data => id === data.userID && date === data.date);
    return userActivityByDate.minutesActive;
  }
//returns # of active minutes based on user id & date (a user's active minutes on single day)

  getAverageMinutesActiveForWeek(id, date, userRepo) {
    return parseFloat((userRepo.getSpecifiedWeekOfData(date, id, this.activityData).reduce((acc, elem) => {
      return acc += elem.minutesActive;
    }, 0) / 7).toFixed(1));
  }
//getSpecifiedWeekOfData takes all of a single user's (activity) data sorted by date & returns a week's worth of (activity) data given a start date
//uses that data to tally up the active minutes for a user for a whole week
//Divides that number by 7 to get the user's daily average active minutes
//Do we need the parseFloat part? I think we're already getting back a number

  accomplishStepGoalForDay(id, date, userRepo) {
    let userStepsByDate = this.activityData.find(data => id === data.userID && date === data.date);
    if (userStepsByDate.numSteps === userRepo.dailyStepGoal) {
      return true;
    }
    return false
  }
//finds activity data for specific user on specific date; if that day's numSteps matches dailyStepGoal from repo, true is returned i.e. step goal was met
//again, can't access userRepo.dailyStepGoal, as that is the entire array of users, not a single user

  exceededStepGoalForDay(id, userRepo) {
    return this.activityData.filter(data => id === data.userID && data.numSteps > userRepo.dailyStepGoal).map(data => data.date);
  }
  //again, cannot access userRepo.dailyStepGoal so this code won't work
  //it attempts to find the activity objects for a particular user where their numSteps exceeds their step goal, and then map that to just an array of the dates when the step goal was met

  getStairClimbingRecord(id) {
    return this.activityData.filter(data => id === data.userID).reduce((acc, elem) => (elem.flightsOfStairs > acc) ? elem.flightsOfStairs : acc, 0);
  }
  //Finds a single user's activities, then returns the activity object with the greatest # of flightsOfStairs, which can be used to represent date of flightsOfStairs record

  getAllUsersAverageDataForDay(date, userRepo, relevantData) {
    let selectedDayData = userRepo.getAllUsersDayData(this.activityData, date);
    return parseFloat((selectedDayData.reduce((acc, elem) => acc += elem[relevantData], 0) / selectedDayData.length).toFixed(1));
  }
//getAllUsersDayData takes activity data & returns just the activities on a particular date (all users)
//this function then gets the average numSteps/minutesActive/flightsOfStairs (whatever relevantData string is passed in) for that day

  getUserDataByDate(id, date, userRepo, relevantData) {
    let userData = userRepo.getDataMatchingUserID(id, this.activityData);
    return userData.find(data => data.date === date)[relevantData];
  }
  //filters activity data to get just data for a particular user, then filters to just that user's data on a particular date, and returns the given property value (i.e. numSteps, minActive, stairs)

  getUserDataForWeek(id, date, userRepo, releventData) {
    return userRepo.getSpecifiedWeekOfData(date, id, this.activityData).map((data) => `${data.date}: ${data[releventData]}`);
  }
  ////takes all of a single user's activity data sorted by date & returns a week's worth of data given a start date
  //maps that data to a string of 'date: num' for each

  // Friends(is for Iteration 5)

  getFriendsActivityData(user, userRepo) {
    let data = this.activityData;
    let userDatalist = user.friendsIds.map(function(friend) {
      return userRepo.getDataMatchingUserID(friend, data)
    });
    return userDatalist.reduce(function(arraySoFar, listItem) {
      return arraySoFar.concat(listItem);
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
  displayIncreasedSteps(userRepo, id, relevantData) {
    let data = this.activityData;
    let sortedUserArray = (userRepo.sortDataByDate(id, data)).reverse();
    let streaks = sortedUserArray.filter(function(element, index) {
      if (index >= 2) {
        return (sortedUserArray[index - 2][relevantData] < sortedUserArray[index - 1][relevantData] && sortedUserArray[index - 1][relevantData] < sortedUserArray[index][relevantData])
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