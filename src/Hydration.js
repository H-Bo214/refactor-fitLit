class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }



  calculateAverageOunces(id) {
    // method locates all user objects that match a user ID and displays the average oz for a specific user.
    // I don't believe this needs a refactor at this time. 
    let perDayUserHydration = this.hydrationData.filter((data) => id === data.userID);
    return perDayUserHydration.reduce((sumSoFar, data) => {
      return sumSoFar += data.numOunces;
    }, 0) / perDayUserHydration.length;
  }

    // method iterates through hydration data matches a user id with a hydration user ID, accepts a date and returns the number of oz for that specific date.
    // I don't believe this needs a refactor at this time. 
  calculateDailyOunces(id, date) {
    let findOuncesByDate = this.hydrationData.find((data) => id === data.userID && date === data.date);
    return findOuncesByDate.numOunces;
  }


//Method calculateFirstWeekOunces uses the additional methods below that currently live in the User Repo. Lots going on, we'll have to discuss if 
// we can refactor. 
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //  getDataFromLatestWeek(id, dataSet) {
    //return this.sortDataByDate(id, dataSet).slice(0, 7);
  //};

  // sortDataByDate(id, dataSet) {
  //   let selectedID = this.getDataMatchingUserID(id, dataSet)
  //   let sortedByDate = selectedID.sort((a, b) => new Date(b.date) - new Date(a.date));
  //   return sortedByDate;
  // }

  // getDataMatchingUserID(id, dataSet) {
  //   return dataSet.filter((userData) => id === userData.userID);
  // };
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  calculateFirstWeekOunces(userRepo, id) {
    return userRepo.getDataFromLatestWeek(id, this.hydrationData).map((data) => `${data.date}: ${data.numOunces}`);
  }


  ////Method calculateRandomWeekOunces uses the additional methods below that currently live in the User Repo. Lots going on, we'll have to discuss if 
// we can refactor. 
//
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // getSpecifiedWeekOfData(date, id, dataSet) {
  //   let dateIndex = this.sortDataByDate(id, dataSet).indexOf(this.sortDataByDate(id, dataSet).find((sortedItem) => (sortedItem.date === date)));
  //   return this.sortDataByDate(id, dataSet).slice(dateIndex, dateIndex + 7);
  // };

   // sortDataByDate(id, dataSet) {
  //   let selectedID = this.getDataMatchingUserID(id, dataSet)
  //   let sortedByDate = selectedID.sort((a, b) => new Date(b.date) - new Date(a.date));
  //   return sortedByDate;
  // }
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  calculateRandomWeekOunces(date, id, userRepo) {
    return userRepo.getSpecifiedWeekOfData(date, id, this.hydrationData).map((data) => `${data.date}: ${data.numOunces}`);
  }
}


export default Hydration;
