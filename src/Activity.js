class Activity {
  constructor(activityData) {
    this.activityData = activityData
  }
//dataset passed into constructor is array of objects with userID, date, numSteps, minutesActive & flightsOfStairs properties

  getMilesFromStepsByDate(id, date, userRepo) {
    let userStepsByDate = this.activityData.find(data => id === data.userID && date === data.date);
    return parseFloat(((userStepsByDate.numSteps * userRepo.strideLength) / 5280).toFixed(1));
  }
//finds activity based on userId & date; accesses that activity's numSteps & multiplies it by stride length from userRepo?????????, dividing by 5280 to get # of miles walked on that date
//this is not displayed on DOM and SHOULD be according to spec
//Also doesn't makes sense to access userRepo.strideLength for this, as this will access the entire array of user data
//instead, need to find user within userRepo whose id matches the id passed into function & access THAT user's strideLength property 


  getActiveMinutesByDate(id, date) {
    let userActivityByDate = this.activityData.find(data => id === data.userID && date === data.date);
    return userActivityByDate.minutesActive;
  }
//returns # of active minutes based on user id & date (a user's active minutes on single day)

  calculateActiveAverageForWeek(id, date, userRepo) {
    return parseFloat((userRepo.getWeekFromDate(date, id, this.activityData).reduce((acc, elem) => {
      return acc += elem.minutesActive;
    }, 0) / 7).toFixed(1));
  }
//getWeekFromDate takes all of a single user's (activity) data sorted by date & returns a week's worth of (activity) data given a start date
//uses that data to tally up the active minutes for a user for a whole week
//Divides that number by 7 to get the user's daily average active minutes
//Do we need the parseFloat part? I think we're already getting back a number

  accomplishStepGoal(id, date, userRepo) {
    let userStepsByDate = this.activityData.find(data => id === data.userID && date === data.date);
    if (userStepsByDate.numSteps === userRepo.dailyStepGoal) {
      return true;
    }
    return false
  }
  getDaysGoalExceeded(id, userRepo) {
    return this.activityData.filter(data => id === data.userID && data.numSteps > userRepo.dailyStepGoal).map(data => data.date);
  }
  getStairRecord(id) {
    return this.activityData.filter(data => id === data.userID).reduce((acc, elem) => (elem.flightsOfStairs > acc) ? elem.flightsOfStairs : acc, 0);
  }
  getAllUserAverageForDay(date, userRepo, relevantData) {
    let selectedDayData = userRepo.chooseDayDataForAllUsers(this.activityData, date);
    return parseFloat((selectedDayData.reduce((acc, elem) => acc += elem[relevantData], 0) / selectedDayData.length).toFixed(1));
  }
  userDataForToday(id, date, userRepo, relevantData) {
    let userData = userRepo.getDataFromUserID(id, this.activityData);
    return userData.find(data => data.date === date)[relevantData];
  }
  userDataForWeek(id, date, userRepo, releventData) {
    return userRepo.getWeekFromDate(date, id, this.activityData).map((data) => `${data.date}: ${data[releventData]}`);
  }

  // Friends

  getFriendsActivity(user, userRepo) {
    let data = this.activityData;
    let userDatalist = user.friends.map(function(friend) {
      return userRepo.getDataFromUserID(friend, data)
    });
    return userDatalist.reduce(function(arraySoFar, listItem) {
      return arraySoFar.concat(listItem);
    }, []);
  }
  getFriendsAverageStepsForWeek(user, date, userRepo) {
    let friendsActivity = this.getFriendsActivity(user, userRepo);
    let timeline = userRepo.chooseWeekDataForAllUsers(friendsActivity, date);
    return userRepo.combineRankedUserIDsAndAveragedData(friendsActivity, date, 'numSteps', timeline)
  }
  showChallengeListAndWinner(user, date, userRepo) {
    let rankedList = this.getFriendsAverageStepsForWeek(user, date, userRepo);

    return rankedList.map(function(listItem) {
      let userID = Object.keys(listItem)[0];
      let userName = userRepo.getDataFromID(parseInt(userID)).name;
      return `${userName}: ${listItem[userID]}`
    })
  }
  showcaseWinner(user, date, userRepo) {
    let namedList = this.showChallengeListAndWinner(user, date, userRepo);
    let winner = this.showChallengeListAndWinner(user, date, userRepo).shift();
    return winner;
  }
  getStreak(userRepo, id, relevantData) {
    let data = this.activityData;
    let sortedUserArray = (userRepo.makeSortedUserArray(id, data)).reverse();
    let streaks = sortedUserArray.filter(function(element, index) {
      if (index >= 2) {
        return (sortedUserArray[index - 2][relevantData] < sortedUserArray[index - 1][relevantData] && sortedUserArray[index - 1][relevantData] < sortedUserArray[index][relevantData])
      }
    });
    return streaks.map(function(streak) {
      return streak.date;
    })
  }
  getWinnerId(user, date, userRepo) {
    let rankedList = this.getFriendsAverageStepsForWeek(user, date, userRepo);
    let keysList = rankedList.map(listItem => Object.keys(listItem));
    return parseInt(keysList[0].join(''))
  }
}



export default Activity;
