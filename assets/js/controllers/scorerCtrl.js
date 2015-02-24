/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('Scorer')
	.controller('ScorerCtrl', function TodoCtrl($scope, $routeParams, $filter) {
		'use strict';

		// Global variables
		$scope.runs = [1, 2, 3, 4, 5, 6];
		$scope.wicketTypes = ["Bowled", "Caught", "LBW", "Run-out", "Stumped", "Handled Ball", "Hit Twice", "Timed Out"];

		// Batting team
		$scope.total = 0;
		$scope.wickets = 0;

		// Bowling Team
		$scope.overs = 0;

		$scope.battingTeam = [
			"Player 1",
			"Player 2",
			"Player 3",
			"Player 4",
			"Player 5",
			"Player 6",
			"Player 7",
			"Player 8",
			"Player 9",
			"Player 10",
			"Player 11"
			];

		$scope.bowlingTeam = [
			{firstname: "Player 1"},
			{firstname: "Player 2"},
			{firstname: "Player 3"},
			{firstname: "Player 4"},
			{firstname: "Player 5"},
			{firstname: "Player 6"},
			{firstname: "Player 7"},
			{firstname: "Player 8"},
			{firstname: "Player 9"},
			{firstname: "Player 10"},
			{firstname: "Player 11"}
			];

		// Batsman Service
		$scope.batsman = [
			{name: 'Dumminy', runs: 0, balls: 0, strike:''},
			{name: 'De Villiers', runs: 0, balls: 0, strike:'*'}
		];

		// Bowler Service
		$scope.bowler = [
			{name: 'Kholi', overs: 0, balls: 0, wickets: 0, maidens:0, runs:0},
			{name: 'Other', overs: 0, balls: 0, wickets: 0, maidens:0, runs:0}
		];

		/**
		 * EVENT functions
		 *
		 *
		 */

		$scope.normalEvent = function(runs){
			$scope.total += runs;

			$scope.bowler[0].runs += runs;
			$scope.bowler[0].balls++;

			addBatsmanBall();
			addBatsmanRuns(runs);
			checkOddRunsSwap(runs);

		};

		$scope.wideEvent = function(runs){
			$scope.total += runs+1;

			$scope.bowler[0].runs += runs+1;

			checkOddRunsSwap(runs);
		};

		$scope.noBallEvent = function(runs, offbat){
			$scope.total += runs+1;

			$scope.bowler[0].runs += runs+1;

			if(offbat){
				addBatsmanRuns(runs);
			}
			addBatsmanBall();
			checkOddRunsSwap(runs);

		};

		$scope.wicketEvent = function(type){
			$scope.wicket++;
		};


		$scope.endOver = function(answer){
			$scope.bowler[0].overs++;
			$scope.bowler[0].balls = 0;

			$scope.overs++;
			$('#pickBowlerModal').modal('show');

		};

		$scope.newOver = function(bowler){
			$('#pickBowlerModal').modal('hide');
			$scope.bowler[1] = $scope.bowler[0];
			$scope.bowler[0] = {
					name: bowler.firstname,
					overs: 0,
					balls: 0,
					wickets: 0,
					maidens:0,
					runs:0
				};

			swap($scope.batsman[0], $scope.batsman[1]);
		};

		/**
		 * STATS functions
		 *
		 *
		 */
		$scope.bowlerStats = function(bowler){
			return bowler.name + ' : ' +
				bowler.overs + '.' + bowler.balls + ' ' +
				bowler.maidens + ' ' + bowler.wickets + ' ' + bowler.runs;
		};

		$scope.batsmanStats = function(batsman){
			return batsman.name + ' : ' +
			batsman.runs + '(' + batsman.balls + ')' + batsman.strike;
		};

		/**
		 * Misc Helpers
		 *
		 */
		var swap = function(a,b){
			var temp = a;
			a = b;
			b = temp;
		};

		var addBatsmanBall = function(runs){
			if($scope.batsman[0].strike === '*'){
				$scope.batsman[0].balls++;
			} else {
				$scope.batsman[1].balls++;
			}
		};

		var addBatsmanRuns = function(runs){
			if($scope.batsman[0].strike === '*'){
				$scope.batsman[0].runs += runs;
			} else {
				$scope.batsman[1].runs += runs;
			}
		};

		var checkOddRunsSwap = function(runs){
			if(runs % 2 === 1){
				swap($scope.batsman[0].strike, $scope.batsman[1].strike);
			}
		};
	});
