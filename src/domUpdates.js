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
    let hydrationThisWeek = document.getElementById('hydrationThisWeek');
    let weeklyData = this.hydrationRepo.calcWeekOunces(this.today, this.user.id);
    hydrationThisWeek.insertAdjacentHTML('afterBegin', this.makeHydrationHTML(weeklyData));

    let hydrationRandomHeader = document.querySelectorAll('.historicalWeek');
    let historicWeekHeaderText = `Week of ${this.randomHistory}`;
    hydrationRandomHeader.forEach(instance => instance.insertAdjacentHTML('afterBegin', historicWeekHeaderText));

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
    let userStepCount = this.activityRepo.getUserDataByDate(this.user.id, this.today, 'numSteps');
    let userStepCountMiles = this.activityRepo.getMilesByStepsForDate(this.user.id, this.today, this.userRepo);
    userStepsToday.insertAdjacentHTML("afterBegin", `${userStepCount} <br> (${userStepCountMiles} miles)`);

    let userStairsToday = document.getElementById('userStairsToday');
    let userStairCount = this.activityRepo.getUserDataByDate(this.user.id, this.today, 'flightsOfStairs');
    userStairsToday.insertAdjacentHTML("afterBegin", userStairCount);

    let userMinutesToday = document.getElementById('userMinutesToday');
    let userActiveMinutes = this.activityRepo.getUserDataByDate(this.user.id, this.today, 'minutesActive')
    userMinutesToday.insertAdjacentHTML("afterBegin", userActiveMinutes);
  },

  displayAverageDailyActivity() {
    let avgStepsToday = document.getElementById('avgStepsToday');
    let allUserStepCount = this.activityRepo.getAllUsersAverageDataForDay(this.today, 'numSteps');
    avgStepsToday.insertAdjacentHTML("afterBegin", allUserStepCount);

    let avgStairsToday = document.getElementById('avgStairsToday');
    let allUserStairCount = this.activityRepo.getAllUsersAverageDataForDay(this.today, 'flightsOfStairs');
    avgStairsToday.insertAdjacentHTML("afterBegin", allUserStairCount);

    let avgMinutesToday = document.getElementById('avgMinutesToday');
    let allUserActiveMinutes = this.activityRepo.getAllUsersAverageDataForDay(this.today, 'minutesActive');
    avgMinutesToday.insertAdjacentHTML("afterBegin", allUserActiveMinutes);
  },

  displayWeeklyActivity() {
    let userStepsThisWeek = document.getElementById('userStepsThisWeek');
    let userStepCountWeek = this.activityRepo.getUserDataForWeek(this.user.id, this.today);
    userStepsThisWeek.insertAdjacentHTML("afterBegin", this.makeStepsHTML(userStepCountWeek.map((data) => `${data.date}: ${data['numSteps']}`)));

    let userStairsThisWeek = document.getElementById('userStairsThisWeek');
    let userStairCountWeek = this.activityRepo.getUserDataForWeek(this.user.id, this.today);
    userStairsThisWeek.insertAdjacentHTML("afterBegin", this.makeStairsHTML(userStairCountWeek.map((data) => `${data.date}: ${data['flightsOfStairs']}`)));

    let userMinutesThisWeek = document.getElementById('userMinutesThisWeek');
    let userMinutesActiveWeek = this.activityRepo.getUserDataForWeek(this.user.id, this.today);
    userMinutesThisWeek.insertAdjacentHTML("afterBegin", this.makeMinutesHTML(userMinutesActiveWeek.map((data) => `${data.date}: ${data['minutesActive']}`)));

    let bestUserSteps = document.getElementById('bestUserSteps');
    let winnerId = this.activityRepo.getStepChallengeWinner(this.user, this.today, this.userRepo)[2];
    let winnerStepCountWeek = this.activityRepo.getUserDataForWeek(winnerId, this.today);
    bestUserSteps.insertAdjacentHTML("afterBegin", this.makeStepsHTML(winnerStepCountWeek.map((data) => `${data.date}: ${data['numSteps']}`)));
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

  createStepStreak(activeDates) {
    return activeDates.map(date => `<li class="historical-list-listItem">${date}</li>`).join('');
  },

  addIncreasinglyActiveInfo() {
    let increasedActivityStreak = document.getElementById('streakListMinutes')
    increasedActivityStreak.insertAdjacentHTML("afterBegin", this.createStepStreak(this.activityRepo.getIncreasinglyActiveDates(this.user.id, this.today)));

    let stepStreak = document.getElementById('streakList');
    stepStreak.insertAdjacentHTML("afterBegin", this.createStepStreak(this.activityRepo.getThreeDayStepStreaks(this.user.id, this.today)))
  },

  /*---------Sleep Dashboard Methods---------*/
  displayDailySleep() {
    let sleepToday = document.getElementById('sleepToday');
    let userSleepToday = this.sleepRepo.calcDailySleep(this.user.id, this.today, 'hoursSlept');
    sleepToday.insertAdjacentHTML("afterBegin", userSleepToday);

    let sleepQualityToday = document.getElementById('sleepQualityToday');
    let userSleepQuality = this.sleepRepo.calcDailySleep(this.user.id, this.today, 'sleepQuality');
    sleepQualityToday.insertAdjacentHTML("afterBegin", userSleepQuality);
  },

  displayAverageDailySleep() {
    let userAvgSleepQuality = document.getElementById('userAvgSleepQuality');
    let avgSleepQuality = Math.round(this.sleepRepo.calcAverageUserSleep(this.user.id, 'sleepQuality') * 100) / 100;
    userAvgSleepQuality.insertAdjacentHTML("afterBegin", avgSleepQuality);

    let userAvgSleepQuantity = document.getElementById('userAvgSleepQuantity');
    let avgSleepQuantity = Math.round(this.sleepRepo.calcAverageUserSleep(this.user.id, 'hoursSlept') * 100) / 100;
    userAvgSleepQuantity.insertAdjacentHTML("afterBegin", avgSleepQuantity)
  },

  displayWeeklySleep() {
    let sleepThisWeek = document.getElementById('sleepThisWeek');
    let userHoursSleepWeek = this.sleepRepo.getWeekOfSleep(this.today, this.user.id);
    sleepThisWeek.insertAdjacentHTML('afterBegin', this.makeSleepHTML(userHoursSleepWeek.map(data => `${data.date}: ${data.hoursSlept}`)));

    let sleepQualityWeek = document.getElementById('sleepQualityWeek');
    let userSleepQualityWeek = this.sleepRepo.getWeekOfSleep(this.today, this.user.id);
    sleepQualityWeek.insertAdjacentHTML('afterBegin', this.makeSleepQualityHTML(userSleepQualityWeek.map(data => `${data.date}: ${data.sleepQuality}`)));
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
    return friendActivityData.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData.name}, walked ${friendChallengeData.userSum} steps.</li>`).join('');
  },
}

module.exports = domUpdates
