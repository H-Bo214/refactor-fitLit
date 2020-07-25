class Activity {
  constructor(activityDetails) {
    this.userID = activityDetails.userID;
    this.date = activityDetails.date;
    this.numSteps = activityDetails.numSteps;
    this.minutesActive = activityDetails.minutesActive;
    this.flightsOfStairs = activityDetails.flightsOfStairs;
  }
}

export default Activity;
