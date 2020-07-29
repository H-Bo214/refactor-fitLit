import { expect } from 'chai';
import DataRepo from '../src/Data-repo';
import SleepRepo from '../src/Sleep-repo';

describe('Data Repo', function() {
  let userSleepData, dataRepo, sleepData, sleepRepo;

  beforeEach(function() {

    sleepData = [
      {
        "userID": 1,
        "date": "2019/08/22",
        "hoursSlept": 10.1,
        "sleepQuality": 1.8
      },
      {
        "userID": 2,
        "date": "2019/08/22",
        "hoursSlept": 6.9,
        "sleepQuality": 1.2
      },
      {
        "userID": 3,
        "date": "2019/08/22",
        "hoursSlept": 4,
        "sleepQuality": 4
      },
      {
        "userID": 4,
        "date": "2019/06/21",
        "hoursSlept": 6.1,
        "sleepQuality": 3.5
      },
      {
        "userID": 4,
        "date": "2019/06/20",
        "hoursSlept": 4.7,
        "sleepQuality": 4
      },
      {
        "userID": 4,
        "date": "2019/06/19",
        "hoursSlept": 10.1,
        "sleepQuality": 1.3
      },
    ];
    userSleepData = [
      {
        "userID": 4,
        "date": "2019/06/21",
        "hoursSlept": 6.1,
        "sleepQuality": 3.5
      },
      {
        "userID": 4,
        "date": "2019/06/20",
        "hoursSlept": 4.7,
        "sleepQuality": 4
      },
      {
        "userID": 4,
        "date": "2019/06/19",
        "hoursSlept": 10.1,
        "sleepQuality": 1.3
      },
    ];
    dataRepo = new DataRepo()
    sleepRepo = new SleepRepo(sleepData)
  });

  it('should be a function', function() {
    expect(DataRepo).to.be.a('function');
  });

  it('should be an instance of DataRepo', function() {
    expect(dataRepo).to.be.an.instanceof(DataRepo);
  });

  it('should calculate an average', function() {
    expect(Math.round(dataRepo.calculateAverage(sleepData, 'sleepQuality') * 10) / 10).to.equal(2.6)
  });

  it('should return a specific users data', function() {
    expect(dataRepo.getDataMatchingUserID(4, sleepData)).to.deep.equal(userSleepData)
  });

  it('should sort a users data by date', function() {
    expect(dataRepo.sortDataByDate(sleepData)).to.equal(sleepData)
  });

  it('should get a users data for a specific date span', function() {
    expect(dataRepo.getDataInDateSpan(1, 2, sleepData)).to.deep.equal([sleepData[1], sleepData[2]])
  });

  it('should get data for a specific date', function() {
    expect(dataRepo.getDataByDate('2019/06/21', sleepData)).to.equal(sleepData[3])
  });

  it('should get all data for a specific date', function() {
    expect(dataRepo.getDataMatchingDate('2019/08/22', sleepData)).to.deep.equal([sleepData[0], sleepData[1], sleepData[2]])
  });

  it('should get the index specified by date', function() {
    expect(dataRepo.getIndexOfDate('2019/06/19', sleepData)).to.equal(5);
  });








});
