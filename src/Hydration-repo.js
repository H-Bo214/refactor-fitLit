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

  calcWeekOunces(date, id) {
    let userData = this.getDataMatchingUserID(id, this.hydrationData);
    let sortedData = this.sortDataByDate(userData);
    let indexOfDate = this.getIndexOfDate(date, sortedData)
    let weekOfData = this.getDataInDateSpan(indexOfDate, 7, sortedData);

    return weekOfData;
  }

}

export default HydrationRepo;
