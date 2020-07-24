// For a user (identified by their userID - this is the same for all methods requiring a specific user’s data), the average fluid ounces consumed per day for all time
// For a user, how many fluid ounces they consumed for a specific day (identified by a date)
// For a user, how many fluid ounces of water consumed each day over the course of a week (7 days) - return the amount for each day
import DataRepo from './Data-repo'
import Hydration from './Hydration'

class HydrationRepo extends DataRepo {
  constructor(hydrationData) {
    super()
    if (!hydrationData) {
      this.hydrationData = []
    } else {
      this.hydrationData = hydrationData.map(data => new Hydration(data));
    }
  }



  calcAvgOuncesConsumedByDay(id) {
    let perDayUserHydration = this.getDataMatchingUserID(id, this.hydrationData)
    return this.calculateAverage(perDayUserHydration, 'numOunces');
  }

  calcOuncesConsumedByDay(id, date) {
    let matchingData = this.getDataMatchingUserID(id, this.hydrationData)
    return this.getDataByDate(date, matchingData).numOunces
  }


//Method calcRecentWeekOunces uses the additional methods below that currently live in the User Repo. Lots going on, we'll have to discuss if
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
  calcRecentWeekOunces(id) {
    let userData = this.getDataMatchingUserID(id, this.hydrationData);
    let sortedData = this.sortDataByDate(userData);
    let weekOfData = this.getDataInDateSpan(0, 7, sortedData);
    return weekOfData;
  };

// takes date & id, 
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
  calcAdditionalWeekOunces(date, id) {
    let userData = this.getDataMatchingUserID(id, this.hydrationData)
    let sortedData = this.sortDataByDate(userData);
    let randomIndex = this.generateRandomIndex(sortedData);
    let weekOfData = this.getDataInDateSpan(randomIndex, 7, sortedData);

    return weekOfData;
  }
}


export default HydrationRepo;
