import './css/base.scss';
import './css/style.scss';

import './images/person walking on path.jpg';
import './images/The Rock.jpg';

// import userData from './data/users';
// import hydrationData from './data/hydration';
// import sleepData from './data/sleep';
// import activityData from './data/activity';

import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';

// All query selectors are being used.
var sidebarName = document.getElementById('sidebarName');
var stepGoalCard = document.getElementById('stepGoalCard');
var headerText = document.getElementById('headerText');
var userAddress = document.getElementById('userAddress');
var userEmail = document.getElementById('userEmail');
var userStridelength = document.getElementById('userStridelength');
var friendList = document.getElementById('friendList');
var hydrationToday = document.getElementById('hydrationToday');
var hydrationAverage = document.getElementById('hydrationAverage');
var hydrationThisWeek = document.getElementById('hydrationThisWeek');
var hydrationEarlierWeek = document.getElementById('hydrationEarlierWeek');
var historicalWeek = document.querySelectorAll('.historicalWeek');
var sleepToday = document.getElementById('sleepToday');
var sleepQualityToday = document.getElementById('sleepQualityToday');
var userAvgSleepQuality = document.getElementById('userAvgSleepQuality');
var sleepThisWeek = document.getElementById('sleepThisWeek');
var sleepQualityWeek = document.getElementById('sleepQualityWeek');
var friendChallengeListToday = document.getElementById('friendChallengeListToday');
var friendChallengeListHistory = document.getElementById('friendChallengeListHistory');
var bigWinner = document.getElementById('bigWinner');
var userStepsToday = document.getElementById('userStepsToday');
var avgStepsToday = document.getElementById('avgStepsToday');
var userStairsToday = document.getElementById('userStairsToday');
var avgStairsToday = document.getElementById('avgStairsToday');
var userMinutesToday = document.getElementById('userMinutesToday');
var avgMinutesToday = document.getElementById('avgMinutesToday');
var userStepsThisWeek = document.getElementById('userStepsThisWeek');
var userStairsThisWeek = document.getElementById('userStairsThisWeek');
var userMinutesThisWeek = document.getElementById('userMinutesThisWeek');
var bestUserSteps = document.getElementById('bestUserSteps');
var streakList = document.getElementById('streakList');
var streakListMinutes = document.getElementById('streakListMinutes')
var userAvgSleepQuantity = document.getElementById('userAvgSleepQuantity')

let userRepo, hydrationRepo, sleepRepo, activityRepo;

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
  let randomHistory = makeRandomDate(userRepo, userNowId, hydrationRepo.hydrationData);
  historicalWeek.forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${randomHistory}`));
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
  return userRepo.getDataFromID(id);
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
function addInfoToSidebar(user, userStorage) {
  sidebarName.innerText = user.name;
  headerText.innerText = `${user.getFirstName()}'s Activity Tracker`;
  stepGoalCard.innerText = `Your daily step goal is ${user.dailyStepGoal}.`
  avStepGoalCard.innerText = `The average daily step goal is ${userStorage.calculateAverageStepGoal()}`;
  userAddress.innerText = user.address;
  userEmail.innerText = user.email;
  userStridelength.innerText = `Your stridelength is ${user.strideLength} meters.`;
  friendList.insertAdjacentHTML('afterBegin', makeFriendHTML(user, userStorage))
};

function makeFriendHTML(user, userStorage) {
  return user.getFriendsNames(userStorage).map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
}

function makeWinnerID(activityInfo, user, dateString, userStorage){
  return activityInfo.getWinnerById(user, dateString, userStorage)
}

function makeToday(userStorage, id, dataSet) {
  var sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  return sortedArray[0].date;
}

//
function makeRandomDate(userStorage, id, dataSet) {
  var sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  return sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date
}

function addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString) {

  // Currently displayed on the Hydration Dashboard.
  hydrationToday.insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span class="number">${hydrationInfo.calcOuncesConsumedByDay(id, dateString)}</span></p><p>oz water today.</p>`);

  // Currently displayed on the Hydration Dashboard.
  hydrationAverage.insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${hydrationInfo.calcAvgOuncesConsumedByDay(id)}</span></p> <p>oz per day.</p>`)

  // Currently displayed on the Hydration Dashboard.
  hydrationThisWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calcRecentWeekOunces(userStorage, id)));

// Currently displayed on the Hydration Dashboard.
  hydrationEarlierWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calcAdditionalWeekOunces(laterDateString, id, userStorage)));
}

function makeHydrationHTML(id, hydrationInfo, userStorage, method) {
  return method.map(drinkData => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join('');
}

function addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString) {
  sleepToday.insertAdjacentHTML("afterBegin", `<p>You slept</p> <p><span class="number">${sleepInfo.calcHoursSleptForDay(id, dateString)}</span></p> <p>hours today.</p>`);
  sleepQualityToday.insertAdjacentHTML("afterBegin", `<p>Your sleep quality was</p> <p><span class="number">${sleepInfo.calcSleepQualityForDay(id, dateString)}</span></p><p>out of 5.</p>`);
  userAvgSleepQuality.insertAdjacentHTML("afterBegin",`<p>Your average sleep quality is</p> <p><span class="number">${Math.round(sleepInfo.calcTotalAverageSleepQuality(id) *100)/100}</span></p><p>out of 5.</p>`);
  userAvgSleepQuantity.insertAdjacentHTML("afterBegin", `<p>Your average hours slept is</p> <p><span class="number">${Math.round(sleepInfo.calcAverageSleepForDay(id) * 100)/100}</span></p><p>per day.</p>`)

  sleepThisWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calcHoursSleptDailyForWeek(dateString, id, userStorage)));
  sleepQualityWeek.insertAdjacentHTML('afterBegin', makeSleepQualityHTML(id, sleepInfo, userStorage, sleepInfo.calcQualitySleepForWeek(dateString, id, userStorage)));
//
  userAvgSleepQuantity
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
  userStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count:</p><p>You</><p><span class="number">${activityInfo.getUserDataByDate(id, dateString, userStorage, 'flightsOfStairs')}</span></p>`)
  avgStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count: </p><p>All Users</p><p><span class="number">${activityInfo.getAllUsersAverageDataForDay(dateString, userStorage, 'flightsOfStairs')}</span></p>`)
  //add miles to this block
  userStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>You</p><p><span class="number">${activityInfo.getUserDataByDate(id, dateString, userStorage, 'numSteps')} (${activityInfo.getMilesByStepsForDate(id, dateString, userStorage)} miles)</span></p>`)
  avgStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUsersAverageDataForDay(dateString, userStorage, 'numSteps')}</span></p>`)
  userMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>You</p><p><span class="number">${activityInfo.getUserDataByDate(id, dateString, userStorage, 'minutesActive')}</span></p>`)
  avgMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUsersAverageDataForDay(dateString, userStorage, 'minutesActive')}</span></p>`)
  userStepsThisWeek.insertAdjacentHTML("afterBegin", makeStepsHTML(id, activityInfo, userStorage, activityInfo.getUserDataForWeek(id, dateString, userStorage, "numSteps")));
  userStairsThisWeek.insertAdjacentHTML("afterBegin", makeStairsHTML(id, activityInfo, userStorage, activityInfo.getUserDataForWeek(id, dateString, userStorage, "flightsOfStairs")));
  userMinutesThisWeek.insertAdjacentHTML("afterBegin", makeMinutesHTML(id, activityInfo, userStorage, activityInfo.getUserDataForWeek(id, dateString, userStorage, "minutesActive")));
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
  friendChallengeListToday.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.displayStepChallengeWinner(user, dateString, userStorage)));
  streakList.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.displayIncreasedSteps(userStorage, id, 'numSteps')));
  streakListMinutes.insertAdjacentHTML("afterBegin", makeStepStreakHTML(id, activityInfo, userStorage, activityInfo.displayIncreasedSteps(userStorage, id, 'minutesActive')));
  friendChallengeListHistory.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.displayStepChallengeWinner(user, dateString, userStorage)));
  bigWinner.insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${activityInfo.displayWinner(user, dateString, userStorage)} steps`)
}

function makeFriendChallengeHTML(id, activityInfo, userStorage, method) {
  return method.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
}

function makeStepStreakHTML(id, activityInfo, userStorage, method) {
  return method.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
}


// Should be invoked with window onload.
// startApp();
