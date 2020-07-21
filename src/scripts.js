import './css/base.scss';
import './css/style.scss';

import './images/person walking on path.jpg';
import './images/The Rock.jpg';

import domUpdates from '../src/domUpdates'

// import userData from './data/users';
// import hydrationData from './data/hydration';
// import sleepData from './data/sleep';
// import activityData from './data/activity';

import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';

let userRepo, hydrationRepo, sleepRepo, activityRepo, randomHistory;

window.onload = getData();

function getData() {
  Promise.all([
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData'),
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData'),
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData'),
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData')
  ])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(([userData, sleepData, activityData, hydrationData]) => startApp(userData, sleepData, activityData, hydrationData)
    )
    .catch(err => console.error(err))
}



function startApp(userData, sleepData, activityData, hydrationData) {
  userRepo = new UserRepo(userData.userData);
  hydrationRepo = new Hydration(hydrationData.hydrationData);
  sleepRepo = new Sleep(sleepData.sleepData);
  activityRepo = new Activity(activityData.activityData);
  let userNowId = generateRandomId(userRepo);
  let userNow = generateRandomUser(userRepo, userNowId);
  //Note: Former today was string of "2019/06/15"; new function below generates string of same format
  // let today = generateCurrentDate();
  // console.log(today)
  // let userList = [];
  // users are instantiated in the makeUser method and pushed into userList, which then is used to instantiate the userRepo.
  // makeUsers(userList);
  // let userRepo = new UserRepo(userList);
  // userNowId is a random user chosen on page load through pickUser method.
  // var userNowId = pickUser();
  // userNow is the current random user.
  // today is always 9/22/19
  let today = makeToday(userRepo, userNowId, hydrationRepo.hydrationData);
  console.log(today)
  randomHistory = makeRandomDate(userRepo, userNowId, hydrationRepo.hydrationData);

  //Some of this is hydration card functionality- not sure why it's in start app rather than in the hydration function below!

  addInfoToSidebar(userNow, userRepo);
  addHydrationInfo(userNowId, hydrationRepo, today, userRepo, randomHistory);
  addSleepInfo(userNowId, sleepRepo, today, userRepo, randomHistory);
  let winnerNow = makeWinnerID(activityRepo, userNow, today, userRepo);
  addActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, userNow, winnerNow);
  addFriendGameInfo(userNowId, activityRepo, userRepo, today, randomHistory, userNow);
}

function generateRandomId(dataset) {
  return Math.floor(Math.random() * dataset.users.length);
}

function generateRandomUser(userRepo, id) {
  return userRepo.getUserFromId(id);
};

//Not being used right now; use to get date later
function generateCurrentDate() {
  const rawDate = new Date();
  let day = rawDate.getDate();
  if (day < 10) {
    day = `0${day.toString()}`
  };
  let month = rawDate.getMonth() + 1;
  if (month < 10) {
    month = `0${month.toString()}`
  };
  const year = rawDate.getFullYear();
  return `${year}/${month}/${day}`
}

// function makeUsers(array) {
//   userData.forEach(function(dataItem) {
//     let user = new User(dataItem);
//     array.push(user);
//   })
// }

///////

/* Dom functions */
function addInfoToSidebar(user, userStorage) {
  let headerText = document.getElementById('headerText');
  headerText.innerText = `${user.getUserFirstName()}'s Activity Tracker`;

  let sidebarHeader = document.querySelector('.sidebar-header-name');
  sidebarHeader.innerText = user.name;

  let userAddress = document.getElementById('userAddress');
  userAddress.innerText = user.address;

  let userEmail = document.getElementById('userEmail');
  userEmail.innerText = user.email;

  let userStrideLength = document.getElementById('userStridelength');
  userStrideLength.innerText = `Your stridelength is ${user.strideLength} meters.`;

  let userStepGoal = document.querySelector('.step-goal-card');
  userStepGoal.innerText = `Your daily step goal is ${user.dailyStepGoal}.`

  //Right now, this is missing from the DOM interface! Not sure if we want to include this or remove both this method & html elements. The FitLit spec does say that this should be included
  let avgStepGoalCard = document.querySelector('.avg-step-goal-card')
  avgStepGoalCard.innerText = `The average daily step goal is ${userStorage.calculateAverageStepGoal()}`;

  let friendList = document.getElementById('friendList');
  friendList.insertAdjacentHTML('afterBegin', makeFriendHTML(user, userStorage))
};

function makeFriendHTML(user, userStorage) {
  return user.getFriendsNames(userStorage).map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
}

function makeWinnerID(activityInfo, user, dateString, userStorage){
  return activityInfo.getWinnerById(user, dateString, userStorage)
}

function makeToday(userStorage, id, dataSet) {
  var sortedArray = userStorage.sortDataByDate(id, dataSet);
  return sortedArray[0].date;
}

//
function makeRandomDate(userStorage, id, dataSet) {
  var sortedArray = userStorage.sortDataByDate(id, dataSet);
  return sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date
}

function addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString) {
  // Currently displayed on the Hydration Dashboard.
  let hydrationToday = document.getElementById('hydrationToday');
  hydrationToday.insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span class="number">${hydrationInfo.calcOuncesConsumedByDay(id, dateString)}</span></p><p>oz water today.</p>`);

  // Currently displayed on the Hydration Dashboard.
  let hydrationAverage = document.getElementById('hydrationAverage');
  hydrationAverage.insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${hydrationInfo.calcAvgOuncesConsumedByDay(id).toFixed(2)}</span></p> <p>oz per day.</p>`)

  // Currently displayed on the Hydration Dashboard.
  let hydrationThisWeek = document.getElementById('hydrationThisWeek');
  hydrationThisWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calcRecentWeekOunces(userStorage, id)));

// Currently displayed on the Hydration Dashboard.
  let hydrationRandomHeader = document.querySelectorAll('.historicalWeek');
  hydrationRandomHeader.forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${randomHistory}`));

// Currently displayed on the Hydration Dashboard.
  let hydrationRandomWeek = document.getElementById('hydrationEarlierWeek');
  hydrationRandomWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calcAdditionalWeekOunces(laterDateString, id, userStorage)));

}

function makeHydrationHTML(id, hydrationInfo, userStorage, method) {
  return method.map(drinkData => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join('');
}

function addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString) {
  let sleepToday = document.getElementById('sleepToday');
  sleepToday.insertAdjacentHTML("afterBegin", `<p>You slept</p> <p><span class="number">${sleepInfo.calcHoursSleptForDay(id, dateString)}</span></p> <p>hours today.</p>`);

  let sleepQualityToday = document.getElementById('sleepQualityToday');
  sleepQualityToday.insertAdjacentHTML("afterBegin", `<p>Your sleep quality was</p> <p><span class="number">${sleepInfo.calcSleepQualityForDay(id, dateString)}</span></p><p>out of 5.</p>`);

  let userAvgSleepQuality = document.getElementById('userAvgSleepQuality');
  userAvgSleepQuality.insertAdjacentHTML("afterBegin",`<p>Your average sleep quality is</p> <p><span class="number">${Math.round(sleepInfo.calcTotalAverageSleepQuality(id) *100)/100}</span></p><p>out of 5.</p>`);

  let userAvgSleepQuantity = document.getElementById('userAvgSleepQuantity')
  userAvgSleepQuantity.insertAdjacentHTML("afterBegin", `<p>Your average hours slept is</p> <p><span class="number">${Math.round(sleepInfo.calcAverageSleepForDay(id) * 100)/100}</span></p><p>per day.</p>`)

  let sleepThisWeek = document.getElementById('sleepThisWeek');
  sleepThisWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calcHoursSleptDailyForWeek(dateString, id, userStorage)));

  let sleepQualityWeek = document.getElementById('sleepQualityWeek');
  sleepQualityWeek.insertAdjacentHTML('afterBegin', makeSleepQualityHTML(id, sleepInfo, userStorage, sleepInfo.calcQualitySleepForWeek(dateString, id, userStorage)));
}

function makeSleepHTML(id, sleepInfo, userStorage, method) {
  return method.map(sleepData => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
}

function makeSleepQualityHTML(id, sleepInfo, userStorage, method) {
  return method.map(sleepQualityData => `<li class="historical-list-listItem">On ${sleepQualityData}/5 quality of sleep</li>`).join('');
}

//getAllUserAverage is not SRP and handling the AVERAGE of, flightsOfStairs, numSteps, minutesActive.
//getUserDataByDate is not SRP and handling the DAILY stats of, flightsOfStairs, numSteps, minutesActive.
//getUserDataForWeek is not SRP and handling the WEEKLY AVERAGE of, flightsOfStairs, numSteps, minutesActive.
function addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
  let userStepsToday = document.getElementById('userStepsToday');
  userStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'numSteps')} (${activityInfo.getMilesByStepsForDate(id, dateString, userStorage)} miles)</span></p>`)

  let avgStepsToday = document.getElementById('avgStepsToday');
  avgStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'numSteps')}</span></p>`)

  let userStairsToday = document.getElementById('userStairsToday');
  userStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count:</p><p>You</><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'flightsOfStairs')}</span></p>`)

  let avgStairsToday = document.getElementById('avgStairsToday');
  avgStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count: </p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'flightsOfStairs')}</span></p>`)

  let userMinutesToday = document.getElementById('userMinutesToday');
  userMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'minutesActive')}</span></p>`)

  let avgMinutesToday = document.getElementById('avgMinutesToday');
  avgMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'minutesActive')}</span></p>`)

  let userStepsThisWeek = document.getElementById('userStepsThisWeek');
  userStepsThisWeek.insertAdjacentHTML("afterBegin", makeStepsHTML(id, activityInfo, userStorage, activityInfo.getUserDataForWeek(id, dateString, userStorage, "numSteps")));

  let userStairsThisWeek = document.getElementById('userStairsThisWeek');
  userStairsThisWeek.insertAdjacentHTML("afterBegin", makeStairsHTML(id, activityInfo, userStorage, activityInfo.getUserDataForWeek(id, dateString, userStorage, "flightsOfStairs")));

  let userMinutesThisWeek = document.getElementById('userMinutesThisWeek');
  userMinutesThisWeek.insertAdjacentHTML("afterBegin", makeMinutesHTML(id, activityInfo, userStorage, activityInfo.getUserDataForWeek(id, dateString, userStorage, "minutesActive")));

  let bestUserSteps = document.getElementById('bestUserSteps');
  bestUserSteps.insertAdjacentHTML("afterBegin", makeStepsHTML(user, activityInfo, userStorage, activityInfo.getUserDataForWeek(winnerId, dateString, userStorage, "numSteps")));
}
//I think renaming these to 'display' vs. 'make' would be more semantic.
function makeStepsHTML(id, activityInfo, userStorage, method) {
  return method.map(activityData => `<li class="historical-list-listItem">On ${activityData} steps</li>`).join('');
}

function makeStairsHTML(id, activityInfo, userStorage, method) {
  return method.map(data => `<li class="historical-list-listItem">On ${data} flights</li>`).join('');
}

function makeMinutesHTML(id, activityInfo, userStorage, method) {
  return method.map(data => `<li class="historical-list-listItem">On ${data} minutes</li>`).join('');
}

function addFriendGameInfo(id, activityInfo, userStorage, dateString, laterDateString, user) {
  let increasedActivityStreak = document.getElementById('streakListMinutes')
  increasedActivityStreak.insertAdjacentHTML("afterBegin", createStepStreak(id, activityInfo, userStorage, activityInfo.displayIncreasedSteps(userStorage, id, 'minutesActive')));

  let thisWeeksWinner = document.getElementById('bigWinner');
  thisWeeksWinner.insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${activityInfo.displayWinner(user, dateString, userStorage)} steps`)

  let friendChallengeListToday = document.getElementById('friendChallengeListToday');
  friendChallengeListToday.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.displayStepChallengeWinner(user, dateString, userStorage)));

  let friendChallengeListHistory = document.getElementById('friendChallengeListHistory');
  friendChallengeListHistory.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.displayStepChallengeWinner(user, dateString, userStorage)));

  let stepStreak = document.getElementById('streakList');
  stepStreak.insertAdjacentHTML("afterBegin", createStepStreak(id, activityInfo, userStorage, activityInfo.displayIncreasedSteps(userStorage, id, 'numSteps')));
}

function makeFriendChallengeHTML(id, activityInfo, userStorage, method) {
  return method.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
}

function createStepStreak(id, activityInfo, userStorage, method) {
  return method.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
}

// Should be invoked with window onload.
// startApp();
