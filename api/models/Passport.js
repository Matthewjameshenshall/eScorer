var bcrypt = require('bcryptjs');

/**
 * Hash a passport password.
 *
 * @param {Object}   password
 * @param {Function} next
 */
function hashPassword (passport, next) {
  if (passport.password) {
    bcrypt.hash(passport.password, 10, function (err, hash) {
      passport.password = hash;
      next(err, passport);
    });
  } else {
    next(null, passport);
  }
}

var Passport = {
  attributes: {
    protocol: {
      type: 'alphanumeric',
      required: true
    },

    password: {
      type: 'string'
      //minLength: 8
    },

    // Provider fields
    provider: {
      type: 'alphanumericdashed'
    },
    identifier: {
      type: 'string'
    },
    tokens: {
      type: 'json'
    },

    // Associations
    user: {
      model: 'User',
      required: true
    },

    /**
     * Validate password used by the local strategy.
     *
     * @param {string}   password The password to validate
     * @param {Function} next
     */
    validatePassword: function (password, next) {
      bcrypt.compare(password, this.password, next);
    }

  },

  /**
   * Callback to be run before creating a Passport.
   *
   * @param {Object}   passport The soon-to-be-created Passport
   * @param {Function} next
   */
  beforeCreate: function (passport, next) {
    hashPassword(passport, next);
  },

  /**
   * Callback to be run before updating a Passport.
   *
   * @param {Object}   passport Values to be updated
   * @param {Function} next
   */
  beforeUpdate: function (passport, next) {
    hashPassword(passport, next);
  }
};

module.exports = Passport;
