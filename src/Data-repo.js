class DataRepo {

  calculateAverage(dataSet, dataKey) {
    let sum = dataSet.reduce((sum, data) => sum + data[dataKey], 0);
    return sum / dataSet.length;
  }

  getDataMatchingUserID(id, dataSet) {
    return dataSet.filter((data) => data.userID === id);
  }

  sortDataByDate(dataSet) {
    return dataSet.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  getDataInDateSpan(index, numOfDays, dataSet) {
    return dataSet.slice(index, (index + numOfDays));
  }

  getDataByDate(date, dataSet) {
    return dataSet.find(data => data.date === date);
  }

  getDataMatchingDate(date, dataSet) {
    return dataSet.filter((data) => data.date === date);
  }

  makeRandomDate(dataSet) {
    let sortedArray = this.sortDataByDate(dataSet);
    return sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date
  }

  getIndexOfDate(date, dataSet) {
    return dataSet.findIndex(data => data.date === date)
  }

}















export default DataRepo;
