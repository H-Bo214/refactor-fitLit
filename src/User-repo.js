import User from "./User";

class UserRepo {
  constructor(users) {
    if (!users) {
      this.users = []
    } else {
      this.users = users.map(user => new User(user));
    }
  }

  getUserFromId(id) {
    return this.users.find((user) => user.id === id);
  };
// From spec: it should have a method to determine a user's data given their ID. I believe I'd switch around user.id === id (though not sure if this matters or is more dev empathy?)

  getDataMatchingUserID(id, dataSet) {
    return dataSet.filter((data) => data.userID === id);
  };
//Rachel note: This method doesn't actually make use of anything in the User repo class, so doesn't really belong here
//This code seems extraneous- the idea of this class is that all f the userData is put in as an argument to the UserRepo class. The method above is doing the exact same thing, except with its own `this.users` list.

  calculateAverageStepGoal() {
    var totalStepGoal = this.users.reduce((summedStepGoals, user) => {
      return summedStepGoals + user.dailyStepGoal;
    }, 0);
    return totalStepGoal / this.users.length;
  };
//From spec: it should have a method to determine the average step goal amongst all users. It appears that this reduce is working correctly & that we are returning the average step goal of all users.

  sortDataByDate(id, dataSet) {
    let dataMatchingId = this.getDataMatchingUserID(id, dataSet)
    let sortedByDate = dataMatchingId.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedByDate;
  }
//This method selects a specific user (using the previously created getDataMatchingUserID method) & then sorts the data by date.

  getLatestDateInData(id, dataSet) {
    return this.sortDataByDate(id, dataSet)[0].date;
  };
// This method uses the sorted data from above to get the data for a users day- "today" (most recent day in the data set). Used in getDataFromLatestWeek and getSpecifiedWeekOfData, which are both used within Hydration/

  getDataFromLatestWeek(id, dataSet) {
    return this.sortDataByDate(id, dataSet).slice(0, 7);
  };
// This method uses the sortDataByDate() above & then slices the past weeks worth of data for the user. Used in Hydration,

  getSpecifiedWeekOfData(date, id, dataSet) {
    let dateIndex = this.sortDataByDate(id, dataSet).indexOf(this.sortDataByDate(id, dataSet).find((sortedItem) => (sortedItem.date === date)));
    return this.sortDataByDate(id, dataSet).slice(dateIndex, dateIndex + 7);
  };
// This method is not used in scripts.js, or elsewhere in this file. It is tested for (like 491-493 of test userrepo-test)

  getAllUsersWeekOfData(dataSet, date) {
    let test = dataSet.filter(dataItem => {
      return (new Date(date)).setDate((new Date(date)).getDate() - 7) <= new Date(dataItem.date) && new Date(dataItem.date) <= new Date(date)
    })
    return test;
  }

  getAllUsersDayData(dataSet, date) {
    return dataSet.filter(dataItem => dataItem.date === date);
  }

  isolateUserIdAndPropertyData(dataKey, weekOfData) {
    return weekOfData.reduce((IdsWithPropertyValues, dataItem) => {
      if (!IdsWithPropertyValues[dataItem.userID]) {
        IdsWithPropertyValues[dataItem.userID] = [dataItem[dataKey]]
      } else {
        IdsWithPropertyValues[dataItem.userID].push(dataItem[dataKey])
      }
      return IdsWithPropertyValues;
    }, {});
  }

  rankUserIdsByPropertyValues(dataKey, weekOfData) {
    let userIdsToProperty = this.isolateUserIdAndPropertyData(dataKey, weekOfData);
    return Object.keys(userIdsToProperty).sort((b, a) => {
      return (userIdsToProperty[a].reduce((sumSoFar, sleepQualityValue) => {
        sumSoFar += sleepQualityValue
        return sumSoFar;
      }, 0) / userIdsToProperty[a].length) - (userIdsToProperty[b].reduce((sumSoFar, sleepQualityValue) => {
        sumSoFar += sleepQualityValue
        return sumSoFar;
      }, 0) / userIdsToProperty[b].length)
    });
  }
  getRankedUserIDsWithDataAverages(dataKey, weekOfData) {
    let userIdsToProperty = this.isolateUserIdAndPropertyData(dataKey, weekOfData);
    let rankedUsersAndAverages = this.rankUserIdsByPropertyValues(dataKey, weekOfData);
    return rankedUsersAndAverages.map(rankedUser => {
      rankedUser = {
        [rankedUser]: Math.round(userIdsToProperty[rankedUser].reduce((sumSoFar, sleepQualityValue) =>  {
          sumSoFar += sleepQualityValue
          return sumSoFar;
        }, 0) / userIdsToProperty[rankedUser].length)
      };
      return rankedUser;
    });
  }
}

export default UserRepo;
