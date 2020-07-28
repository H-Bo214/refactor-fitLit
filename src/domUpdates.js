const domUpdates = {
  user: null,
  userRepo: null,
  today: null,
  randomHistory: null, 
  hydrationRepo: null, 
  sleepRepo: null, 
  activityRepo: null,

  defineUser(user) {
    this.user = user;
  },

  defineUserRepo(userRepo) {
    this.userRepo = userRepo; 
  },

  defineToday(today) {
    this.today = today; 
  },

  defineRandomHistory(date) {
    this.randomHistory = date; 
  },

  defineHydrationRepo(repo) {
    this.hydrationRepo = repo;
  },

  defineSleepRepo(repo) {
    this.sleepRepo = repo; 
  },

  defineActivityRepo(repo) {
    this.activityRepo = repo;
  },

  displayHeader() {
    let headerText = document.getElementById('headerText');
    headerText.innerText = `${this.user.getUserFirstName()}'s Activity Tracker`;
  }, 

  displayUserInfo() {
    let sidebarHeader = document.querySelector('.sidebar-header-name');
    sidebarHeader.innerText = this.user.name;

    let userAddress = document.getElementById('userAddress');
    userAddress.innerText = this.user.address;

    let userEmail = document.getElementById('userEmail');
    userEmail.innerText = this.user.email;

    let friendList = document.getElementById('friendList');
    friendList.insertAdjacentHTML('afterBegin', this.makeFriendHTML(this.user, this.userRepo));  
  },

  displayUserGoals() {
    let userStrideLength = document.getElementById('userStridelength');
    userStrideLength.innerText = `Your stride length is ${this.user.strideLength} meters.`;

    let userStepGoal = document.querySelector('.step-goal-card');
    userStepGoal.innerText = `Your daily step goal is ${this.user.dailyStepGoal}.`

    let avgStepGoalCard = document.querySelector('.avg-step-goal-card')
    avgStepGoalCard.innerText = `The average daily step goal is ${this.userRepo.calculateAverageStepGoal()}`;
  },

  makeFriendHTML() {
    return this.user.getFriendsNames(this.userRepo).map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
  },

  displayDailyHydration() {
    let hydrationToday = document.getElementById('hydrationToday');
    hydrationToday.insertAdjacentHTML('afterBegin', `<p>You drank</p><p><span class="number">${this.hydrationRepo.calcOuncesConsumedByDay(this.user.id, this.today)}</span></p><p>oz water today.</p>`);

    let hydrationAverage = document.getElementById('hydrationAverage');
    hydrationAverage.insertAdjacentHTML('afterBegin', `<p>Your average water intake is</p><p><span class="number">${this.hydrationRepo.calcAvgOuncesConsumedByDay(this.user.id).toFixed(2)}</span></p> <p>oz per day.</p>`)
  },

  displayWeeklyHydration() {
    let hydrationThisWeek = document.getElementById('hydrationThisWeek');
    hydrationThisWeek.insertAdjacentHTML('afterBegin', this.makeHydrationHTML(this.hydrationRepo.calcWeekOunces(this.today, this.user.id).map((data) => `${data.date}: ${data.numOunces}`)));

    let hydrationRandomHeader = document.querySelectorAll('.historicalWeek');
    hydrationRandomHeader.forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${this.randomHistory}`));

    let hydrationRandomWeek = document.getElementById('hydrationEarlierWeek');
    hydrationRandomWeek.insertAdjacentHTML('afterBegin', this.makeHydrationHTML(this.hydrationRepo.calcWeekOunces(this.randomHistory, this.user.id).map((data) => `${data.date}: ${data.numOunces}`)));
  },

  makeHydrationHTML(weekOfData) {
    return weekOfData.map(drinkData => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join('');
  },

  displayDailySleep() {
    let sleepToday = document.getElementById('sleepToday');
    sleepToday.insertAdjacentHTML("afterBegin", `<p>You slept</p> <p><span class="number">${this.sleepRepo.calcDailySleep(this.user.id, this.today, 'hoursSlept')}</span></p> <p>hours today.</p>`);

    let sleepQualityToday = document.getElementById('sleepQualityToday');
    sleepQualityToday.insertAdjacentHTML("afterBegin", `<p>Your sleep quality was</p> <p><span class="number">${this.sleepRepo.calcDailySleep(this.user.id, this.today, 'sleepQuality')}</span></p><p>out of 5.</p>`);
  },

  displayAverageDailySleep() {
    let userAvgSleepQuality = document.getElementById('userAvgSleepQuality');
    userAvgSleepQuality.insertAdjacentHTML("afterBegin", `<p>Your average sleep quality is</p> <p><span class="number">${Math.round(this.sleepRepo.calcAverageUserSleep(this.user.id, 'sleepQuality') * 100) / 100}</span></p><p>out of 5.</p>`);

    let userAvgSleepQuantity = document.getElementById('userAvgSleepQuantity')
    userAvgSleepQuantity.insertAdjacentHTML("afterBegin", `<p>Your average hours slept is</p> <p><span class="number">${Math.round(this.sleepRepo.calcAverageUserSleep(this.user.id, 'hoursSlept') * 100) / 100}</span></p><p>per day.</p>`)
  },

  displayWeeklySleep() {
    let sleepThisWeek = document.getElementById('sleepThisWeek');
    sleepThisWeek.insertAdjacentHTML('afterBegin', this.makeSleepHTML(this.sleepRepo.getWeekOfSleep(this.today, this.user.id).map(data => `${data.date}: ${data.hoursSlept}`)));

    let sleepQualityWeek = document.getElementById('sleepQualityWeek');
    sleepQualityWeek.insertAdjacentHTML('afterBegin', this.makeSleepQualityHTML(this.sleepRepo.getWeekOfSleep(this.today, this.user.id).map(data => `${data.date}: ${data.sleepQuality}`)));
  },

  makeSleepHTML(weekOfData) {
    return weekOfData.map(sleepData => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
  },

  makeSleepQualityHTML(weekOfData) {
    return weekOfData.map(sleepQualityData => `<li class="historical-list-listItem">On ${sleepQualityData}/5 quality of sleep</li>`).join('');
  },

  displayDailyActivity() {
    let userStepsToday = document.getElementById('userStepsToday');
    userStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>You</p><p><span class="number">${this.activityRepo.getUserDataByDate(this.user.id, this.today, 'numSteps')} (${this.activityRepo.getMilesByStepsForDate(this.user.id, this.today, this.userRepo)} miles)</span></p>`);

    let userStairsToday = document.getElementById('userStairsToday');
    userStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count:</p><p>You</><p><span class="number">${this.activityRepo.getUserDataByDate(this.user.id, this.today, 'flightsOfStairs')}</span></p>`);

    let userMinutesToday = document.getElementById('userMinutesToday');
    userMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>You</p><p><span class="number">${this.activityRepo.getUserDataByDate(this.user.id, this.today, 'minutesActive')}</span></p>`);
  },

  displayAverageDailyActivity() {
    let avgStepsToday = document.getElementById('avgStepsToday');
    avgStepsToday.insertAdjacentHTML("afterBegin", `<p>Step Count:</p><p>All Users</p><p><span class="number">${this.activityRepo.getAllUsersAverageDataForDay(this.today, 'numSteps')}</span></p>`);

    let avgStairsToday = document.getElementById('avgStairsToday');
    avgStairsToday.insertAdjacentHTML("afterBegin", `<p>Stair Count: </p><p>All Users</p><p><span class="number">${this.activityRepo.getAllUsersAverageDataForDay(this.today, 'flightsOfStairs')}</span></p>`);

    let avgMinutesToday = document.getElementById('avgMinutesToday');
    avgMinutesToday.insertAdjacentHTML("afterBegin", `<p>Active Minutes:</p><p>All Users</p><p><span class="number">${this.activityRepo.getAllUsersAverageDataForDay(this.today, 'minutesActive')}</span></p>`);
  },

  displayWeeklyActivity() {
    let userStepsThisWeek = document.getElementById('userStepsThisWeek');
    userStepsThisWeek.insertAdjacentHTML("afterBegin", this.makeStepsHTML(this.activityRepo.getUserDataForWeek(this.user.id, this.today).map((data) => `${data.date}: ${data['numSteps']}`)));

    let userStairsThisWeek = document.getElementById('userStairsThisWeek');
    userStairsThisWeek.insertAdjacentHTML("afterBegin", this.makeStairsHTML(this.activityRepo.getUserDataForWeek(this.user.id, this.today).map((data) => `${data.date}: ${data['flightsOfStairs']}`)));

    let userMinutesThisWeek = document.getElementById('userMinutesThisWeek');
    userMinutesThisWeek.insertAdjacentHTML("afterBegin", this.makeMinutesHTML(this.activityRepo.getUserDataForWeek(this.user.id, this.today).map((data) => `${data.date}: ${data['minutesActive']}`)));

    let bestUserSteps = document.getElementById('bestUserSteps');
    let winnerId = this.activityRepo.getStepChallengeWinner(this.user, this.today, this.userRepo)[2];
    bestUserSteps.insertAdjacentHTML("afterBegin", this.makeStepsHTML(this.activityRepo.getUserDataForWeek(winnerId, this.today).map((data) => `${data.date}: ${data['numSteps']}`)));
  },

  makeStepsHTML(weekOfData) {
    return weekOfData.map(activityData => `<li class="historical-list-listItem">On ${activityData} steps</li>`).join('');
  },

  makeStairsHTML(weekOfData) {
    return weekOfData.map(data => `<li class="historical-list-listItem">On ${data} flights</li>`).join('');
  },

  makeMinutesHTML(weekOfData) {
    return weekOfData.map(data => `<li class="historical-list-listItem">On ${data} minutes</li>`).join('');
  },

  displayWinner() {
    let thisWeeksWinner = document.getElementById('bigWinner');
    let winnerData = this.activityRepo.getStepChallengeWinner(this.user, this.today, this.userRepo);
    thisWeeksWinner.insertAdjacentHTML('afterBegin', `THIS WEEK'S WINNER! ${winnerData[0]}, ${winnerData[1]} steps`);  
  },

  displayFriendChallenge() {
    let friendChallengeListToday = document.getElementById('friendChallengeListToday');
    let friendDataThisWeek = this.activityRepo.getFriendsActivityData(this.user, this.userRepo, this.today);
    friendChallengeListToday.insertAdjacentHTML("afterBegin", this.makeFriendChallengeHTML(friendDataThisWeek));

    let friendChallengeListHistory = document.getElementById('friendChallengeListHistory');
    let friendDataHistoricWeek = this.activityRepo.getFriendsActivityData(this.user, this.userRepo, this.randomHistory)
    friendChallengeListHistory.insertAdjacentHTML("afterBegin", this.makeFriendChallengeHTML(friendDataHistoricWeek));
  },

  makeFriendChallengeHTML(friendActivityData) {
    return friendActivityData.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData.name}, averaged ${friendChallengeData.userSum} steps.</li>`).join('');
  },

  createStepStreak(activeDates) {
    return activeDates.map(date => `<li class="historical-list-listItem">${date}</li>`).join('');
  },

  addIncreasinglyActiveInfo() {
    let increasedActivityStreak = document.getElementById('streakListMinutes')
    increasedActivityStreak.insertAdjacentHTML("afterBegin", this.createStepStreak(this.activityRepo.getIncreasinglyActiveDates(this.user.id, this.today)));

    let stepStreak = document.getElementById('streakList');
    stepStreak.insertAdjacentHTML("afterBegin", this.createStepStreak(this.activityRepo.getThreeDayStepStreaks(this.user.id, this.today)))
  } 
}

module.exports = domUpdates
