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

    it('should be a function', function() {
      expect(Hydration).to.be.a('function');
    });

    it('should be an instance of Sleep', function() {
      expect(hydration1).to.be.an.instanceof(Hydration);
    });

    it('should have an id', function() {
      expect(hydration1.userID).to.equal(1);
    })

    it('should have a date', function() {
      expect(hydration1.date).to.equal("2019/06/15");
    })

    it('should have a number of ounces consumed', function () {
      expect(hydration1.numOunces).to.equal(37);
    })
})
