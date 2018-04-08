const assert = require('assert');
const sum = require('../sum-async');

describe('#sum-async.js', () => {
  describe('#sum()', () => {
    it('sum(1, 2, 3) should return 6', async () => {
      const ret = await sum(1, 2, 3);

      assert.strictEqual(ret, 6);
    });
  });
});