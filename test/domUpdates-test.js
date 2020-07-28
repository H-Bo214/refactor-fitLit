const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
import domUpdates from '../src/domUpdates';
chai.use(spies);

describe.only('domUpdates', function() {
  beforeEach(() => {
    global.document = {
      getElementById: () => {
        innerText: () => {}
      }
    };
    chai.spy.on(document, ['getElementById', 'querySelector']);
  });

  it('should spy on displayHeader', function() {
    domUpdates.displayHeader();

    expect(document.getElementById).to.have.been.called(1)
    expect(document.getElementById).to.have.been.called.with('headerText')
  });
})
