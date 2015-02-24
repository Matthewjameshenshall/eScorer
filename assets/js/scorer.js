/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
angular.module('Scorer', ['ngRoute'])
  .config(function ($routeProvider) {
    'use strict';

    var routeConfig = {
      controller: 'ScorerCtrl',
      templateUrl: 'main.html'
    };

    $routeProvider
      .when('/', routeConfig)
      // .when('/:match', routeConfig)
      .otherwise({
        redirectTo: '/'
      });
  });
