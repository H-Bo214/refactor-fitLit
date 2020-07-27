import './css/style.scss';


import './images/runner.jpg';
import './images/track.svg';
import './images/friends-running.jpg';
// import domUpdates from '../src/domUpdates'

// import userData from './data/users';
// import hydrationData from './data/hydration';
// import sleepData from './data/sleep';
// import activityData from './data/activity';

import User from './User';
import ActivityRepo from './Activity-repo';
import HydrationRepo from './Hydration-repo';
import SleepRepo from './Sleep-repo';
import UserRepo from './User-repo';

let userRepo, hydrationRepo, sleepRepo, activityRepo, randomHistory, userNow, today;

let sleepDataButton = document.querySelector('.sleep-data-button')
let mainPage = document.querySelector('.main')
let sleepInputPage = document.querySelector('.sleep-input')
let activityInputPage = document.querySelector('.activity-input')
let activityDataButton = document.querySelector('.activity-data-button')
let hydrationDataButton = document.querySelector('.hydration-data-button')
let hydrationInputPage = document.querySelector('.hydration-input')
let submitHydrationButton = document.getElementById('hydration-submit')
let submitSleepButton = document.getElementById('sleep-submit')
let submitActivityButton = document.getElementById('activity-submit')

sleepDataButton.addEventListener('click', accessSleepInputForm)
activityDataButton.addEventListener('click', accessActivityInputForm)
hydrationDataButton.addEventListener('click', accessHydrationInputForm)
submitHydrationButton.addEventListener('click', submitButton)
submitSleepButton.addEventListener('click', submitButton)
submitActivityButton.addEventListener('click', submitButton)


window.onload = getData();



function getData() {
  Promise.all([
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData'),
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData'),
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData'),
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData')
  ])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(([userData, sleepData, activityData, hydrationData]) => createDataRepos(userData, sleepData, activityData, hydrationData))
    .catch(err => console.error(err))
}


function postData(directory, body) {
  const root = 'https://fe-apps.herokuapp.com/api/v1/fitlit/1908/'
  fetch(root + directory, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(response => console.log(response.status))
  .catch(err => console.error(err))
}

function createSleepBody() {
  let userSleepDate = document.getElementById('sleep-user-date').value
  let userHoursSlept = parseFloat(document.getElementById('user-hours-slept').value)
  let userSleepQuality = parseFloat(document.getElementById('user-sleep-quality').value)
  return {userID: userNow.id, date: userSleepDate, hoursSlept: userHoursSlept, sleepQuality: userSleepQuality}
}

function createHydrationBody() {
  let userHydrationDate = document.getElementById('hydration-user-date').value
  let userOuncesConsumed = parseFloat(document.getElementById('user-ounces-number').value)
  return {userID: userNow.id, date: userHydrationDate, numOunces: userOuncesConsumed}
}

function createActivityBody() {
  let userActivityDate = document.getElementById('acitivity-user-date').value
  let userNumberOfSteps = parseFloat(document.getElementById('user-step-number').value)
  let userMinutesActive = parseFloat(document.getElementById('user-minutes-active').value)
  let userStairsClimbed = parseFloat(document.getElementById('user-stairs-climbed').value)
  return {userID: userNow.id, date: userActivityDate, numSteps: userNumberOfSteps, minutesActive: userMinutesActive, flightsOfStairs: userStairsClimbed}
}

function clickHandler(event) {
  if(event.target.id === 'sleep-submit') {
    let sleepBody = createSleepBody();
    postData('sleep/sleepData', sleepBody)
  }
  if(event.target.id === 'hydration-submit') {
    let hydrationBody = createHydrationBody();
    postData('hydration/hydrationData', hydrationBody)
  }
  if(event.target.id === 'activity-submit') {
    let activityBody = createActivityBody();
    postData('activity/activityData', activityBody)
  }
}

function submitButton(event) {
  event.preventDefault();
  clickHandler(event);
  backToMainPage();
  }

function createDataRepos(userData, sleepData, activityData, hydrationData) {
  userRepo = new UserRepo(userData.userData);
  hydrationRepo = new HydrationRepo(hydrationData.hydrationData);
  sleepRepo = new SleepRepo(sleepData.sleepData);
  activityRepo = new ActivityRepo(activityData.activityData);

  startApp();
}

function startApp(userData, sleepData, activityData, hydrationData) {

  // console.log('activityRepo', activityRepo);
  let userNowId = generateRandomId(userRepo);

  // console.log('userNowId', userNowId);
  userNow = generateRandomUser(userRepo, userNowId);

  today = makeToday(userRepo, userNowId, hydrationRepo.hydrationData);
  randomHistory = hydrationRepo.makeRandomDate(hydrationRepo.hydrationData);

  createDOMElements()
}

function generateRandomId(dataset) {
  let randNum = Math.ceil(Math.random() * dataset.users.length)
  if (randNum === 0) {
    randNum ++
  };
  return randNum
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
function createDOMElements() {
  addInfoToSidebar();
  addHydrationInfo(userNow.id, hydrationRepo, today, userRepo, randomHistory);
  addActivityInfo(userNow.id, activityRepo, today, userRepo, randomHistory, userNow);
  addSleepInfo(userNow.id, sleepRepo, today, userRepo, randomHistory);
  addFriendGameInfo(userNow.id, activityRepo, userRepo, today, randomHistory, userNow);
}

/* Dom functions */
function addInfoToSidebar() {
  let headerText = document.getElementById('headerText');
  headerText.innerText = `${userNow.getUserFirstName()}'s Activity Tracker`;

  let sidebarHeader = document.querySelector('.sidebar-header-name');
  sidebarHeader.innerText = userNow.name;

  let userAddress = document.getElementById('userAddress');
  userAddress.innerText = userNow.address;

  let userEmail = document.getElementById('userEmail');
  userEmail.innerText = userNow.email;

  let userStrideLength = document.getElementById('userStridelength');
  userStrideLength.innerText = `Your stridelength is ${userNow.strideLength} meters.`;

  let userStepGoal = document.querySelector('.step-goal-card');
  userStepGoal.innerText = `Your daily step goal is ${userNow.dailyStepGoal}.`

  let avgStepGoalCard = document.querySelector('.avg-step-goal-card')
  avgStepGoalCard.innerText = `The average daily step goal is ${userRepo.calculateAverageStepGoal()}`;

  let friendList = document.getElementById('friendList');
  friendList.insertAdjacentHTML('afterBegin', makeFriendHTML(userNow, userRepo))
};

function makeFriendHTML(user, userStorage) {
  return user.getFriendsNames(userStorage).map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
}

// function makeWinnerID(activityInfo, user, dateString, userStorage){
//   return activityInfo.getWinnerById(user, dateString, userStorage)
// }

function makeToday(userStorage, id, dataSet) {
  var sortedArray = userStorage.sortDataByDate(dataSet);
  return sortedArray[0].date;
}

function addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString) {
  // Currently displayed on the Hydration Dashboard.
  // console.log('hydrationInfo.calcOuncesConsumedByDay(id, dateString)', hydrationInfo.calcOuncesConsumedByDay(id, dateString));
  let hydrationToday = document.getElementById('hydrationToday');
  hydrationToday.insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span class="number">${hydrationInfo.calcOuncesConsumedByDay(id, dateString)}</span></p><p>oz water today.</p>`);

  // Currently displayed on the Hydration Dashboard.
  let hydrationAverage = document.getElementById('hydrationAverage');
  hydrationAverage.insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${hydrationInfo.calcAvgOuncesConsumedByDay(id).toFixed(2)}</span></p> <p>oz per day.</p>`)

  // Currently displayed on the Hydration Dashboard.
  // Refactor .map((data) => `${data.date}: ${data.numOunces}`) at some point.
  let hydrationThisWeek = document.getElementById('hydrationThisWeek');
  hydrationThisWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calcWeekOunces(dateString, id).map((data) => `${data.date}: ${data.numOunces}`)));

// Currently displayed on the Hydration Dashboard.
  let hydrationRandomHeader = document.querySelectorAll('.historicalWeek');
  hydrationRandomHeader.forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${randomHistory}`));

// Currently displayed on the Hydration Dashboard.
  let hydrationRandomWeek = document.getElementById('hydrationEarlierWeek');
  hydrationRandomWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calcWeekOunces(laterDateString, id).map((data) => `${data.date}: ${data.numOunces}`)));

}

function makeHydrationHTML(id, hydrationInfo, userStorage, method) {
  return method.map(drinkData => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join('');
}

function addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString) {
  let sleepToday = document.getElementById('sleepToday');
  sleepToday.insertAdjacentHTML("afterBegin", `<p>You slept</p> <p><span class="number">${sleepInfo.calcDailySleep(id, dateString, 'hoursSlept')}</span></p> <p>hours today.</p>`);

  let sleepQualityToday = document.getElementById('sleepQualityToday');
  sleepQualityToday.insertAdjacentHTML("afterBegin", `<p>Your sleep quality was</p> <p><span class="number">${sleepInfo.calcDailySleep(id, dateString, 'sleepQuality')}</span></p><p>out of 5.</p>`);

  let userAvgSleepQuality = document.getElementById('userAvgSleepQuality');
  userAvgSleepQuality.insertAdjacentHTML("afterBegin", `<p>Your average sleep quality is</p> <p><span class="number">${Math.round(sleepInfo.calcAverageUserSleep(id, 'sleepQuality') *100)/100}</span></p><p>out of 5.</p>`);

  let userAvgSleepQuantity = document.getElementById('userAvgSleepQuantity')
  userAvgSleepQuantity.insertAdjacentHTML("afterBegin", `<p>Your average hours slept is</p> <p><span class="number">${Math.round(sleepInfo.calcAverageUserSleep(id, 'hoursSlept') * 100)/100}</span></p><p>per day.</p>`)

  let sleepThisWeek = document.getElementById('sleepThisWeek');
  sleepThisWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.getWeekOfSleep(dateString, id).map(data => `${data.date}: ${data.hoursSlept}`)));

  let sleepQualityWeek = document.getElementById('sleepQualityWeek');
  sleepQualityWeek.insertAdjacentHTML('afterBegin', makeSleepQualityHTML(id, sleepInfo, userStorage, sleepInfo.getWeekOfSleep(dateString, id).map(data => `${data.date}: ${data.sleepQuality}`)));
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
function addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user) {
  let userStepsToday = document.getElementById('userStepsToday');
  userStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>You</p><p><span class="number">${activityInfo.getUserDataByDate(id, dateString, 'numSteps')} (${activityInfo.getMilesByStepsForDate(id, dateString, userStorage)} miles)</span></p>`)

  let avgStepsToday = document.getElementById('avgStepsToday');
  avgStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUsersAverageDataForDay(dateString, 'numSteps')}</span></p>`)

  let userStairsToday = document.getElementById('userStairsToday');
  userStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count:</p><p>You</><p><span class="number">${activityInfo.getUserDataByDate(id, dateString,  'flightsOfStairs')}</span></p>`)

  let avgStairsToday = document.getElementById('avgStairsToday');
  avgStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count: </p><p>All Users</p><p><span class="number">${activityInfo.getAllUsersAverageDataForDay(dateString, 'flightsOfStairs')}</span></p>`)

  let userMinutesToday = document.getElementById('userMinutesToday');
  userMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>You</p><p><span class="number">${activityInfo.getUserDataByDate(id, dateString, 'minutesActive')}</span></p>`)

  let avgMinutesToday = document.getElementById('avgMinutesToday');
  avgMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUsersAverageDataForDay(dateString, 'minutesActive')}</span></p>`)

  let userStepsThisWeek = document.getElementById('userStepsThisWeek');
  userStepsThisWeek.insertAdjacentHTML("afterBegin", makeStepsHTML(id, activityInfo, userStorage, activityInfo.getUserDataForWeek(id, dateString).map((data) => `${data.date}: ${data['numSteps']}`)));

  let userStairsThisWeek = document.getElementById('userStairsThisWeek');
  userStairsThisWeek.insertAdjacentHTML("afterBegin", makeStairsHTML(id, activityInfo, userStorage, activityInfo.getUserDataForWeek(id, dateString).map((data) => `${data.date}: ${data['flightsOfStairs']}`)));

  let userMinutesThisWeek = document.getElementById('userMinutesThisWeek');
  userMinutesThisWeek.insertAdjacentHTML("afterBegin", makeMinutesHTML(id, activityInfo, userStorage, activityInfo.getUserDataForWeek(id, dateString).map((data) => `${data.date}: ${data['minutesActive']}`)));

  let bestUserSteps = document.getElementById('bestUserSteps');
  let winnerId = activityRepo.getStepChallengeWinner(user, dateString, userStorage)[2];
  bestUserSteps.insertAdjacentHTML("afterBegin", makeStepsHTML(user, activityInfo, userStorage, activityInfo.getUserDataForWeek(winnerId, dateString).map((data) => `${data.date}: ${data['numSteps']}`)));
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
  let thisWeeksWinner = document.getElementById('bigWinner');
  let winnerData = activityInfo.getStepChallengeWinner(user, dateString, userStorage);
  thisWeeksWinner.insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${winnerData[0]}, ${winnerData[1]} steps`)

  let friendChallengeListToday = document.getElementById('friendChallengeListToday');
  friendChallengeListToday.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.getFriendsActivityData(user, userStorage, dateString)));

  let friendChallengeListHistory = document.getElementById('friendChallengeListHistory');
  friendChallengeListHistory.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(id, activityInfo, userStorage, activityInfo.getFriendsActivityData(user, userStorage, laterDateString)));



  let increasedActivityStreak = document.getElementById('streakListMinutes')
  increasedActivityStreak.insertAdjacentHTML("afterBegin", createStepStreak(id, activityInfo, userStorage, activityInfo.displayIncreasedSteps(userStorage, id, 'minutesActive')));


  let stepStreak = document.getElementById('streakList');
  stepStreak.insertAdjacentHTML("afterBegin", createStepStreak(id, activityInfo, userStorage, activityInfo.displayIncreasedSteps(userStorage, id, 'numSteps')));
}

function makeFriendChallengeHTML(id, activityInfo, userStorage, friendActivityData) {
  return friendActivityData.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData.name}, averaged ${friendChallengeData.userSum} steps.</li>`).join('');
}

function createStepStreak(id, activityInfo, userStorage, method) {
  return method.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
}

function accessSleepInputForm() {
  mainPage.classList.add('hidden')
  sleepInputPage.classList.remove('hidden')
}

function accessActivityInputForm() {
  mainPage.classList.add('hidden')
  activityInputPage.classList.remove('hidden')
}

function accessHydrationInputForm() {
  mainPage.classList.add('hidden')
  hydrationInputPage.classList.remove('hidden')
}

function backToMainPage() {
  mainPage.classList.remove('hidden')
  sleepInputPage.classList.add('hidden')
  activityInputPage.classList.add('hidden')
  hydrationInputPage.classList.add('hidden')
}


// Should be invoked with window onload.
// startApp();
