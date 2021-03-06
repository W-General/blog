	'use strict';

angular.module('blog', ['blog.controllers', 'blog.filters']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
    	when('/', {templateUrl: 'partials/index', controller: 'IndexCtrl'}).
//      when('/login', {templateUrl: 'partials/login', controller: 'LoginCtrl'}).
      when('/signup', {templateUrl: 'partials/signup', controller: 'SignupCtrl'}).
    	when('/blog/empty', {templateUrl: 'partials/empty', controller: 'EmptyCtrl'}).
    	when('/blog/add', {templateUrl: 'partials/add', controller: 'AddCtrl'}).
    	when('/blog/:year/:month/:day/:title/edit', {templateUrl: 'partials/edit', controller: 'EditCtrl'}).
      when('/blog/:year/:month/:day/:title/delete', {templateUrl: 'partials/delete', controller: 'DeleteCtrl'}).
    	otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);