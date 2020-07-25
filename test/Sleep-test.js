import { expect } from 'chai';

import Sleep from '../src/Sleep'

describe('Sleep', function() {
  let sleep1;

  beforeEach(function() {
    sleep1 = new Sleep({
      "userID": 1,
      "date": "2019/06/15",
      "hoursSlept": 6.1,
      "sleepQuality": 2.2
    });
  });
})
