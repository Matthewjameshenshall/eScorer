/**
* MatchEvent.js
*
* @description :: This model stores the data for each event in the match
*/

module.exports = {

  attributes: {
    // Most Events
    innings: {
      model: 'innings'
    },
    batsman: {
      model: 'cricketer'
    },
    bowler: {
      model: 'cricketer'
    },
    runs: {
      type: 'integer'
    },

    // Wicket Event
    wicketType: {
      type: 'string',
      enum: ['bowled', 'lbw', 'caught', 'cab', 'runout', 'stumped', 'handledball', 'hittwice', 'timedout']
    },
    whoOut: {
      model: 'cricketer'
    },

    // Pause Event
    pauseType: {
      type: 'string',
      enum: ['endofinn', 'tea', 'lunch', 'rain', 'injury', 'resume']
    }
  }
};

