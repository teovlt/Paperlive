const assert = require('assert');
const Team = require('../src/models/teamModel');

describe('Team', function () {
  describe('#comparePassword()', function () {
    it('should return true with correct password', async function () {
      const team = new Team({
        name: 'My Team',
        password: 'password',
      });
      await team.save();
      const isMatch = await team.comparePassword('password');
      assert.equal(isMatch, true);
    });

    it('should return false with incorrect password', async function () {
      const team = new Team({
        name: 'My Team',
        password: 'password',
      });
      await team.save();
      const isMatch = await team.comparePassword('wrongpassword');
      assert.equal(isMatch, false);
    });
  });
});
