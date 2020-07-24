class DataRepo {
  // constructor(data) {
  //   this.data = data;
  // };
 
  calculateAverage(dataSet, dataKey) {
    let sum = dataSet.reduce((sum, data) => sum + data[dataKey], 0);
    return sum / dataSet.length;
  };

  getDataMatchingUserID(id, dataSet) {
    return dataSet.filter((data) => data.userID === id);
  };

  sortDataByDate(dataSet) {
    return dataSet.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  getDataInDateSpan(numOfDays, dataSet) {
    return dataSet.splice(0, numOfDays);
  };

  getDataByDate(date, dataSet) {
    return dataSet.find(data => data.date === date);
  };

};















export default DataRepo;
