/**
* todo Module
*
* The main module for this TODO app
*/
angular.module('todoApp', []).
    controller('todoMainCtrl',['$scope', function($scope) {
      // todoList array
      $scope.todoList = [
        {task:'Buy an SSD', due: 'Jan 1'},
        {task:'Partition the drive', due: 'Jan 4'},
        {task:'Install Ubuntu and Windows', due: 'Jan 9'},
        {task:'Install optional packages', due: 'Jan 10'},
        {task:'Install PyCharm', due: 'Jan 13'},
      ];

      $scope.todoList.sort(function(a,b) {
          return a.due > b.due;
      });
    }])