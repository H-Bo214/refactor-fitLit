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
  domUpdates.defineUserRepo(userRepo);
  domUpdates.defineHydrationRepo(hydrationRepo);
  domUpdates.defineSleepRepo(sleepRepo);
  domUpdates.defineActivityRepo(activityRepo);
  createUser();
}

function createUser() {
  let userNowId = generateRandomId(userRepo);
  userNow = generateRandomUser(userRepo, userNowId);
  // today = makeToday(userRepo, userNowId, hydrationRepo.hydrationData);
  today = '2020/01/22';
  randomHistory = hydrationRepo.makeRandomDate(hydrationRepo.hydrationData);
  domUpdates.defineUser(userNow);
  domUpdates.defineToday(today);
  domUpdates.defineRandomHistory(randomHistory); 
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

/*---------Hydration Dashboard Functions---------*/
function addHydrationInfo() {
  domUpdates.displayDailyHydration();
  domUpdates.displayWeeklyHydration();
}

/*---------Sleep Dashboard Functions---------*/
function addSleepInfo() {
  domUpdates.displayDailySleep();
  domUpdates.displayAverageDailySleep();
  domUpdates.displayWeeklySleep(); 
}

/*---------Activity Dashboard Functions---------*/
function addActivityInfo() {
  domUpdates.displayDailyActivity();
  domUpdates.displayAverageDailyActivity();
  domUpdates.displayWeeklyActivity();
}


  /*-----Step Challenge Dashboard Functions----*/
function addFriendGameInfo() {
  domUpdates.displayWinner();
  domUpdates.displayFriendChallenge();
}

//These currently need to be refactored in Activity Repo! Then, we'll need to hook these back up to our display methods here.
  // let increasedActivityStreak = document.getElementById('streakListMinutes')
  // increasedActivityStreak.insertAdjacentHTML("afterBegin", createStepStreak(userNow.id, activityRepo, userRepo, activityRepo.displayIncreasedSteps(userRepo, userNow.id, 'minutesActive')));
  //
  // let stepStreak = document.getElementById('streakList');
  // stepStreak.insertAdjacentHTML("afterBegin", createStepStreak(userNow.id, activityRepo, userRepo, activityRepo.displayIncreasedSteps(userRepo, userNow.id, 'numSteps')));

  // function createStepStreak(id, activityInfo, userStorage, method) {
//   return method.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
// }


// function makeFriendChallengeHTML(friendActivityData) {
//   return friendActivityData.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData.name}, averaged ${friendChallengeData.userSum} steps.</li>`).join('');
// }



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
