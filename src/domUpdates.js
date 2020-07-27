const domUpdates = {
  user: null,
  userRepo: null,

  defineUser(user) {
    this.user = user;
  },

  defineUserRepo(userRepo) {
    this.userRepo = userRepo; 
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
    friendList.insertAdjacentHTML('afterBegin', makeFriendHTML(this.user, this.userRepo));  
  },

  displayUserGoals() {
    let userStrideLength = document.getElementById('userStridelength');
    userStrideLength.innerText = `Your stride length is ${this.user.strideLength} meters.`;

    let userStepGoal = document.querySelector('.step-goal-card');
    userStepGoal.innerText = `Your daily step goal is ${this.user.dailyStepGoal}.`

    let avgStepGoalCard = document.querySelector('.avg-step-goal-card')
    avgStepGoalCard.innerText = `The average daily step goal is ${this.userRepo.calculateAverageStepGoal()}`;
  }


}

module.exports = domUpdates
