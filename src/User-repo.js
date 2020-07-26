import User from "./User";
import DataRepo from './Data-repo'

class UserRepo extends DataRepo {
  constructor(users) {
    super()
    if (!users) {
      this.users = []
    } else {
      this.users = users.map(user => new User(user));
    }
  }

  //Do not delete
  getUserFromId(id) {
    return this.users.find((user) => user.id === id);
  } 

  //NOT NEEDED: moved to parent repo
  //  getDataMatchingUserID(id, dataSet) {
  //    return dataSet.filter((data) => data.userID === id);
  // };

  calculateAverageStepGoal() {
    return this.calculateAverage(this.users, 'dailyStepGoal');
  }
}

export default UserRepo;

  //NOT NEEDED: moved to parent repo
  // sortDataByDate(id, dataSet) {
  //   let dataMatchingId = this.getDataMatchingUserID(id, dataSet)
  //   let sortedByDate = dataMatchingId.sort((a, b) => new Date(b.date) - new Date(a.date));
  //   return sortedByDate;
  // }

  //NOT NEEDED: hydrationRepo was using it but no longer is due to refactoring 
  // getLatestDateInData(id, dataSet) {
  //   return this.sortDataByDate(id, dataSet)[0].date;
  // }

// NO LONGER NEEDED: was previously used in hydration
  // getDataFromLatestWeek(id, dataSet) {
  //   return this.sortDataByDate(id, dataSet).slice(0, 7);
  // }

  //NO LONGER NEEDED: moved to parent repo
  // getSpecifiedWeekOfData(date, id, dataSet) {
  //   let dateIndex = this.sortDataByDate(id, dataSet).indexOf(this.sortDataByDate(id, dataSet).find((sortedItem) => (sortedItem.date === date)));
  //   return this.sortDataByDate(id, dataSet).slice(dateIndex, dateIndex + 7);
  // }

  //NO LONGER NEEDED: combo of other methods used instead
  // getAllUsersWeekOfData(dataSet, date) {
  //   let test = dataSet.filter(dataItem => {
  //     return (new Date(date)).setDate((new Date(date)).getDate() - 7) <= new Date(dataItem.date) && new Date(dataItem.date) <= new Date(date)
  //   })
  //   return test;
  // }

  //NO LONGER NEEDED; moved to parent repo
  // getAllUsersDayData(dataSet, date) {
  //   return dataSet.filter(dataItem => dataItem.date === date);
  // }

 //FOLLOWING 3 METHODS WERE USED TOGETHER; SHOULD NO LONGER BE NEEDED ONCE ACTIVITY FRIENDS LIST PORTION IS REFACTORED 
//   isolateUserIdAndPropertyData(dataKey, weekOfData) {
//     return weekOfData.reduce((IdsWithPropertyValues, dataItem) => {
//       if (!IdsWithPropertyValues[dataItem.userID]) {
//         IdsWithPropertyValues[dataItem.userID] = [dataItem[dataKey]]
//       } else {
//         IdsWithPropertyValues[dataItem.userID].push(dataItem[dataKey])
//       }
//       return IdsWithPropertyValues;
//     }, {});
//   }

//   rankUserIdsByPropertyValues(dataKey, weekOfData) {
//     let userIdsToProperty = this.isolateUserIdAndPropertyData(dataKey, weekOfData);
//     return Object.keys(userIdsToProperty).sort((b, a) => {
//       return (userIdsToProperty[a].reduce((sumSoFar, sleepQualityValue) => {
//         sumSoFar += sleepQualityValue
//         return sumSoFar;
//       }, 0) / userIdsToProperty[a].length) - (userIdsToProperty[b].reduce((sumSoFar, sleepQualityValue) => {
//         sumSoFar += sleepQualityValue
//         return sumSoFar;
//       }, 0) / userIdsToProperty[b].length)
//     });
//   }
//   getRankedUserIDsWithDataAverages(dataKey, weekOfData) {
//     let userIdsToProperty = this.isolateUserIdAndPropertyData(dataKey, weekOfData);
//     let rankedUsersAndAverages = this.rankUserIdsByPropertyValues(dataKey, weekOfData);
//     return rankedUsersAndAverages.map(rankedUser => {
//       rankedUser = {
//         [rankedUser]: Math.round(userIdsToProperty[rankedUser].reduce((sumSoFar, sleepQualityValue) =>  {
//           sumSoFar += sleepQualityValue
//           return sumSoFar;
//         }, 0) / userIdsToProperty[rankedUser].length)
//       };
//       return rankedUser;
//     });
//   }
// }
