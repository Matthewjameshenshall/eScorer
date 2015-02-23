/**
* Match.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    hometeam: {
      model: 'team'
    },
    awayteam: {
      model: 'team'
    },
    date: {
      type: 'date'
    },
    venue: {
      type: 'string'
    },

    matchtype: {
      type: 'string',
      enum: ['limitedovers', 'innings']
    }
  }
};

