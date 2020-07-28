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

/*---------Header/Sidebar Methods---------*/
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
    userStepGoal.innerText = `Your daily step goal is ${this.user.dailyStepGoal}.`;

    let avgStepGoalCard = document.querySelector('.avg-step-goal-card');
    let userAvg = this.userRepo.calculateAverageStepGoal();
    avgStepGoalCard.innerText = `The average daily step goal is ${this.userRepo.calculateAverageStepGoal()}`;
  },

  makeFriendHTML() {
    let friendsNames = this.user.getFriendsNames(this.userRepo)
    return friendsNames.map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
  },

/*---------Hydration Dashboard Methods---------*/
  displayDailyHydration() {
    let hydrationToday = document.getElementById('hydrationToday');
    let ozToday = this.hydrationRepo.calcOuncesConsumedByDay(this.user.id, this.today)
    hydrationToday.insertAdjacentHTML('afterBegin', ozToday);

    let hydrationAverage = document.getElementById('hydrationAverage');
    let averageOz = this.hydrationRepo.calcAvgOuncesConsumedByDay(this.user.id).toFixed(2);
    hydrationAverage.insertAdjacentHTML('afterBegin', averageOz)
  },

  displayWeeklyHydration() {
    //Have not been able to get weeklyData to refactor- as far as I can tell, when I try to assign this.hydrationRepo.calcWeekOunces(this.today, this.user.id).map((data) => `${data.date}: ${data.numOunces}`)) to a variable and then map that new variable, it won't let me because I'm returning an HTML collection rather than an array. -JKW 7/28/2020 @ 2:30 PM
    let hydrationThisWeek = document.getElementById('hydrationThisWeek');
    let weeklyData = this.hydrationRepo.calcWeekOunces(this.today, this.user.id);
    hydrationThisWeek.insertAdjacentHTML('afterBegin', this.makeHydrationHTML(weeklyData));

    let hydrationRandomHeader = document.querySelectorAll('.historicalWeek');
    let historicWeekHeaderText = `Week of ${this.randomHistory}`;
    hydrationRandomHeader.forEach(instance => instance.insertAdjacentHTML('afterBegin', historicWeekHeaderText));

    //Have not been able to get this method to refactor- as far as I can tell, when I try to assign this.hydrationRepo.calcWeekOunces(this.today, this.user.id).map((data) => `${data.date}: ${data.numOunces}`)) to a variable and then map that new variable, it won't let me because I'm returning an HTML collection rather than an array. -JKW 7/28/2020 @ 2:30 PM
    let hydrationRandomWeek = document.getElementById('hydrationEarlierWeek');
    let randomWeeklyData = this.hydrationRepo.calcWeekOunces(this.randomHistory, this.user.id);
    hydrationRandomWeek.insertAdjacentHTML('afterBegin', this.makeHydrationHTML(randomWeeklyData));
  },

  makeHydrationHTML(weekOfData) {
    let formattedData = weekOfData.map((data) => `${data.date}: ${data.numOunces}`);
    return formattedData.map(drinkData => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join('');
  },

/*---------Activity Dashboard Methods---------*/
  displayDailyActivity() {
    let userStepsToday = document.getElementById('userStepsToday');
    userStepsToday.insertAdjacentHTML("afterBegin", `${this.activityRepo.getUserDataByDate(this.user.id, this.today, 'numSteps')} <br> (${this.activityRepo.getMilesByStepsForDate(this.user.id, this.today, this.userRepo)} miles)`);

    let userStairsToday = document.getElementById('userStairsToday');
    userStairsToday.insertAdjacentHTML("afterBegin", this.activityRepo.getUserDataByDate(this.user.id, this.today, 'flightsOfStairs'));

    let userMinutesToday = document.getElementById('userMinutesToday');
    userMinutesToday.insertAdjacentHTML("afterBegin", this.activityRepo.getUserDataByDate(this.user.id, this.today, 'minutesActive'));
  },

  displayAverageDailyActivity() {
    let avgStepsToday = document.getElementById('avgStepsToday');
    avgStepsToday.insertAdjacentHTML("afterBegin", this.activityRepo.getAllUsersAverageDataForDay(this.today, 'numSteps'));

    let avgStairsToday = document.getElementById('avgStairsToday');
    avgStairsToday.insertAdjacentHTML("afterBegin", this.activityRepo.getAllUsersAverageDataForDay(this.today, 'flightsOfStairs'));

    let avgMinutesToday = document.getElementById('avgMinutesToday');
    avgMinutesToday.insertAdjacentHTML("afterBegin", this.activityRepo.getAllUsersAverageDataForDay(this.today, 'minutesActive'));
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

/*---------Sleep Dashboard Methods---------*/
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

/*---------Step Challenge Methods---------*/
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
  }
}

module.exports = domUpdates
