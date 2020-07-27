import './css/style.scss';
import './images/runner.jpg';
import './images/track.svg';
import './images/friends-running.jpg';
import domUpdates from '../src/domUpdates'

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

/*---------GET/POST Functions---------*/
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

/*---------Create Data Repos/Start App---------*/
function createDataRepos(userData, sleepData, activityData, hydrationData) {
  userRepo = new UserRepo(userData.userData);
  hydrationRepo = new HydrationRepo(hydrationData.hydrationData);
  sleepRepo = new SleepRepo(sleepData.sleepData);
  activityRepo = new ActivityRepo(activityData.activityData);
  domUpdates.defineUserRepo(userRepo)
  createUser();
}

function createUser() {
  let userNowId = generateRandomId(userRepo);
  userNow = generateRandomUser(userRepo, userNowId);
  today = makeToday(userRepo, userNowId, hydrationRepo.hydrationData);
  randomHistory = hydrationRepo.makeRandomDate(hydrationRepo.hydrationData);
  domUpdates.defineUser(userNow);
  createDashboard()
}

function makeToday(userStorage, id, dataSet) {
  var sortedArray = userStorage.sortDataByDate(dataSet);
  return sortedArray[0].date;
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

function createDashboard() {
  addInfoToSidebar();
  addHydrationInfo();
  addActivityInfo();
  addSleepInfo();
  addFriendGameInfo();
}

/*---------Header/Sidebar Functions---------*/
function addInfoToSidebar() {
  domUpdates.displayHeader();
  domUpdates.displayUserInfo();
  domUpdates.displayUserGoals();
}

// function displayHeader() {
//   let headerText = document.getElementById('headerText');
//   headerText.innerText = `${userNow.getUserFirstName()}'s Activity Tracker`;
// }

// function displayUserInfo() {
//   let sidebarHeader = document.querySelector('.sidebar-header-name');
//   sidebarHeader.innerText = userNow.name;

//   let userAddress = document.getElementById('userAddress');
//   userAddress.innerText = userNow.address;

//   let userEmail = document.getElementById('userEmail');
//   userEmail.innerText = userNow.email;

//   let friendList = document.getElementById('friendList');
//   friendList.insertAdjacentHTML('afterBegin', makeFriendHTML(userNow, userRepo))
// }

// function displayUserGoals() {
//   let userStrideLength = document.getElementById('userStridelength');
//   userStrideLength.innerText = `Your stride length is ${userNow.strideLength} meters.`;

//   let userStepGoal = document.querySelector('.step-goal-card');
//   userStepGoal.innerText = `Your daily step goal is ${userNow.dailyStepGoal}.`

//   let avgStepGoalCard = document.querySelector('.avg-step-goal-card')
//   avgStepGoalCard.innerText = `The average daily step goal is ${userRepo.calculateAverageStepGoal()}`;
// }



function makeFriendHTML(user, userStorage) {
  return user.getFriendsNames(userStorage).map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
}

/*---------Hydration Dashboard Functions---------*/
function addHydrationInfo() {
  let hydrationToday = document.getElementById('hydrationToday');
  hydrationToday.insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span class="number">${hydrationRepo.calcOuncesConsumedByDay(userNow.id, today)}</span></p><p>oz water today.</p>`);

  let hydrationAverage = document.getElementById('hydrationAverage');
  hydrationAverage.insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${hydrationRepo.calcAvgOuncesConsumedByDay(userNow.id).toFixed(2)}</span></p> <p>oz per day.</p>`)

  // Refactor .map((data) => `${data.date}: ${data.numOunces}`) at some point.
  let hydrationThisWeek = document.getElementById('hydrationThisWeek');
  hydrationThisWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(hydrationRepo.calcWeekOunces(today, userNow.id).map((data) => `${data.date}: ${data.numOunces}`)));

  let hydrationRandomHeader = document.querySelectorAll('.historicalWeek');
  hydrationRandomHeader.forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${randomHistory}`));

  let hydrationRandomWeek = document.getElementById('hydrationEarlierWeek');
  hydrationRandomWeek.insertAdjacentHTML('afterBegin', makeHydrationHTML(hydrationRepo.calcWeekOunces(randomHistory, userNow.id).map((data) => `${data.date}: ${data.numOunces}`)));

}

function makeHydrationHTML(weekOfData) {
  return weekOfData.map(drinkData => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join('');
}

/*---------Sleep Dashboard Functions---------*/
function addSleepInfo() {
  let sleepToday = document.getElementById('sleepToday');
  sleepToday.insertAdjacentHTML("afterBegin", `<p>You slept</p> <p><span class="number">${sleepRepo.calcDailySleep(userNow.id, today, 'hoursSlept')}</span></p> <p>hours today.</p>`);

  let sleepQualityToday = document.getElementById('sleepQualityToday');
  sleepQualityToday.insertAdjacentHTML("afterBegin", `<p>Your sleep quality was</p> <p><span class="number">${sleepRepo.calcDailySleep(userNow.id, today, 'sleepQuality')}</span></p><p>out of 5.</p>`);

  let userAvgSleepQuality = document.getElementById('userAvgSleepQuality');
  userAvgSleepQuality.insertAdjacentHTML("afterBegin", `<p>Your average sleep quality is</p> <p><span class="number">${Math.round(sleepRepo.calcAverageUserSleep(userNow.id, 'sleepQuality') *100)/100}</span></p><p>out of 5.</p>`);

  let userAvgSleepQuantity = document.getElementById('userAvgSleepQuantity')
  userAvgSleepQuantity.insertAdjacentHTML("afterBegin", `<p>Your average hours slept is</p> <p><span class="number">${Math.round(sleepRepo.calcAverageUserSleep(userNow.id, 'hoursSlept') * 100)/100}</span></p><p>per day.</p>`)

  let sleepThisWeek = document.getElementById('sleepThisWeek');
  sleepThisWeek.insertAdjacentHTML('afterBegin', makeSleepHTML(userNow.id, sleepRepo, userRepo, sleepRepo.getWeekOfSleep(today, userNow.id).map(data => `${data.date}: ${data.hoursSlept}`)));

  let sleepQualityWeek = document.getElementById('sleepQualityWeek');
  sleepQualityWeek.insertAdjacentHTML('afterBegin', makeSleepQualityHTML(userNow.id, sleepRepo, userRepo, sleepRepo.getWeekOfSleep(today, userNow.id).map(data => `${data.date}: ${data.sleepQuality}`)));
}

function makeSleepHTML(id, sleepInfo, userStorage, method) {
  return method.map(sleepData => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
}

function makeSleepQualityHTML(id, sleepInfo, userStorage, method) {
  return method.map(sleepQualityData => `<li class="historical-list-listItem">On ${sleepQualityData}/5 quality of sleep</li>`).join('');
}

/*---------Activity Dashboard Functions---------*/
function addActivityInfo() {
  let userStepsToday = document.getElementById('userStepsToday');
  userStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>You</p><p><span class="number">${activityRepo.getUserDataByDate(userNow.id, today, 'numSteps')} (${activityRepo.getMilesByStepsForDate(userNow.id, today, userRepo)} miles)</span></p>`)

  let avgStepsToday = document.getElementById('avgStepsToday');
  avgStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>All Users</p><p><span class="number">${activityRepo.getAllUsersAverageDataForDay(today, 'numSteps')}</span></p>`)

  let userStairsToday = document.getElementById('userStairsToday');
  userStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count:</p><p>You</><p><span class="number">${activityRepo.getUserDataByDate(userNow.id, today,  'flightsOfStairs')}</span></p>`)

  let avgStairsToday = document.getElementById('avgStairsToday');
  avgStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count: </p><p>All Users</p><p><span class="number">${activityRepo.getAllUsersAverageDataForDay(today, 'flightsOfStairs')}</span></p>`)

  let userMinutesToday = document.getElementById('userMinutesToday');
  userMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>You</p><p><span class="number">${activityRepo.getUserDataByDate(userNow.id, today, 'minutesActive')}</span></p>`)

  let avgMinutesToday = document.getElementById('avgMinutesToday');
  avgMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityRepo.getAllUsersAverageDataForDay(today, 'minutesActive')}</span></p>`)

  let userStepsThisWeek = document.getElementById('userStepsThisWeek');
  userStepsThisWeek.insertAdjacentHTML("afterBegin", makeStepsHTML(userNow.id, activityRepo, userRepo, activityRepo.getUserDataForWeek(userNow.id, today).map((data) => `${data.date}: ${data['numSteps']}`)));

  let userStairsThisWeek = document.getElementById('userStairsThisWeek');
  userStairsThisWeek.insertAdjacentHTML("afterBegin", makeStairsHTML(userNow.id, activityRepo, userRepo, activityRepo.getUserDataForWeek(userNow.id, today).map((data) => `${data.date}: ${data['flightsOfStairs']}`)));

  let userMinutesThisWeek = document.getElementById('userMinutesThisWeek');
  userMinutesThisWeek.insertAdjacentHTML("afterBegin", makeMinutesHTML(userNow.id, activityRepo, userRepo, activityRepo.getUserDataForWeek(userNow.id, today).map((data) => `${data.date}: ${data['minutesActive']}`)));

  let bestUserSteps = document.getElementById('bestUserSteps');
  let winnerId = activityRepo.getStepChallengeWinner(userNow, today, userRepo)[2];
  bestUserSteps.insertAdjacentHTML("afterBegin", makeStepsHTML(userNow, activityRepo, userRepo, activityRepo.getUserDataForWeek(winnerId, today).map((data) => `${data.date}: ${data['numSteps']}`)));
}
//getAllUserAverage is not SRP and handling the AVERAGE of, flightsOfStairs, numSteps, minutesActive.
//getUserDataByDate is not SRP and handling the DAILY stats of, flightsOfStairs, numSteps, minutesActive.
//getUserDataForWeek is not SRP and handling the WEEKLY AVERAGE of, flightsOfStairs, numSteps, minutesActive.

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

  /*-----Step Challenge Dashboard Functions----*/
function addFriendGameInfo() {
  let thisWeeksWinner = document.getElementById('bigWinner');
  let winnerData = activityRepo.getStepChallengeWinner(userNow, today, userRepo);
  thisWeeksWinner.insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${winnerData[0]}, ${winnerData[1]} steps`)

  let friendChallengeListToday = document.getElementById('friendChallengeListToday');
  let friendDataThisWeek = activityRepo.getFriendsActivityData(userNow, userRepo, today);
  friendChallengeListToday.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(friendDataThisWeek));

  let friendChallengeListHistory = document.getElementById('friendChallengeListHistory');
  let friendDataHistoricWeek = activityRepo.getFriendsActivityData(userNow, userRepo, randomHistory)
  friendChallengeListHistory.insertAdjacentHTML("afterBegin", makeFriendChallengeHTML(friendDataHistoricWeek));

//These currently need to be refactored in Activity Repo! Then, we'll need to hook these back up to our display methods here.
  // let increasedActivityStreak = document.getElementById('streakListMinutes')
  // increasedActivityStreak.insertAdjacentHTML("afterBegin", createStepStreak(userNow.id, activityRepo, userRepo, activityRepo.displayIncreasedSteps(userRepo, userNow.id, 'minutesActive')));
  //
  // let stepStreak = document.getElementById('streakList');
  // stepStreak.insertAdjacentHTML("afterBegin", createStepStreak(userNow.id, activityRepo, userRepo, activityRepo.displayIncreasedSteps(userRepo, userNow.id, 'numSteps')));
}

function makeFriendChallengeHTML(friendActivityData) {
  return friendActivityData.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData.name}, averaged ${friendChallengeData.userSum} steps.</li>`).join('');
}

function createStepStreak(id, activityInfo, userStorage, method) {
  return method.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
}

/*---------Display Functions---------*/
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
