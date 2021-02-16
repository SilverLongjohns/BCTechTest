const { TestScheduler } = require("jest");
const index = require('../index');

describe('Testing framework', function() {
  
  it('should work', function() {
    expect(2 + 2).toEqual(4)
  });

});

describe('Index', function() {

  it('should exist', function() {
    expect(index).toBeDefined();
  })

})