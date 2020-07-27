const domUpdates = {
  user: null,
  userRepo: null,
  today: null,
  randomHistory: null, 
  hydrationRepo: null, 

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



}

module.exports = domUpdates
