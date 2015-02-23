/**
* Cricketer.js
*
* @description :: This model stores Cricketer information.
*/

module.exports = {

  attributes: {
    firstname: {
      type: 'string'
    },
    lastname: {
      type: 'string'
    },
    username: {
      type: 'string'
    },
    email: {
      type: 'email'
    },

    teams: {
      collection: 'team',
      via: 'players'
    }
  }
};

