import { expect } from 'chai';

import Hydration from '../src/Hydration'

describe.only('Hydration', function() {
  let hydration1;

  beforeEach(function() {
    hydration1 = new Hydration({
      "userID": 1,
      "date": "2019/06/15",
      "numOunces": 37
    });
  });

})
