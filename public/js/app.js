/**
* todo Module
*
* The main module for this TODO app
*/
angular.module('todoApp', ['ngCookies']).
    controller('todoMainCtrl',['$cookieStore','$scope', function($cookieStore, $scope) {
      var today = '2014-03-10';
      // todoList array
      $scope.todoList = [
        {cat:'workplace', task:'Buy an SSD', due: '2014-01-01', status: 'unplanned'},
        {cat:'workplace', task:'Partition the drive', due: '2014-01-04', status: 'unplanned'},
        {cat:'workplace', task:'Install Ubuntu and Windows', due: '2014-02-09', status: 'unplanned'},
        {cat:'workplace', task:'Install optional packages', due: '2014-03-10', status: 'unplanned'},
        {cat:'workplace', task:'Install PyCharm', due: '2014-02-03', status: 'unplanned'},
        {cat:'homeplace', task:'Clean the floor', due: '2014-03-06', status: 'unplanned'},
        {cat:'homeplace', task:'Cook dinner', due: '2014-03-10', status: 'unplanned'},
        {cat:'homeplace', task:'Make the bed', due: '2014-03-30', status: 'unplanned'}
      ];

      // Category
      $scope.categoryList = [
        {id:'workplace', name: 'Workplace'},
        {id:'homeplace', name: 'Homeplace'}
      ];

      $scope.todoVisibleFilterFunction = function(item) {
        // Feature: Update status of listed items using the checkbox
        // Post-conditions:
        // - Tasks due today and later must always be visible regardless of its status
        // - Overdue tasks which are done must not be visible
        return item.cat == $scope.selectedCategory 
            && (item.due >= today || item.status !== 'done');
      };

      $scope.selectedCategory = 'workplace';
      $scope.selectCategory = function(categoryId) {
        $scope.selectedCategory = categoryId;
      };

      $scope.done = function(todoItem) {
      // prev_status helps revert todoItem status
      // TODO: update the requirement!
        if (todoItem.status !== 'done') {
          todoItem.prev_status = todoItem.status;
          todoItem.status = 'done';
        }
        else if (todoItem.prev_status)
          todoItem.status = todoItem.prev_status;
      };

      $scope.newItem = {};
      $scope.addItem = function(){
        // TODO: newItem validations
        $scope.todoList.push($scope.newItem);
        // Fix Error: [ngRepeat:dupes] error
        $scope.newItem = {};
        // Add new task dialog must be closed
        angular.element('#modalNewTask').modal('hide');
        // Task list items must retain the correct order of increasing due date
        $scope.todoList.sort(function(a,b) {
          return a.due > b.due;
        });
      };

      $scope.username = 'Guest';
      $scope.signIn = function() {
        // Sign In: simplest authentication
        if ($scope.credential.name === $scope.credential.password) {
          // Username and Gravatar are displayed in place of "Guest"
          $scope.username = $scope.credential.name;
          // User is logged in: A cookie is created to keep track of user
          $cookieStore.put('username', $scope.credential.name);
          if ($scope.credential.remember) {
            $cookieStore.put('remember', $scope.credential.name + ':TOKEN');
          }
          // Sign-in dialog must be closed
          angular.element('#modalSignIn').modal('hide');
        }
      };

      $scope.todoList.sort(function(a,b) {
          return a.due > b.due;
      });
    }])