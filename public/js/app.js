/**
* todo Module
*
* The main module for this TODO app
*/
angular.module('todoApp', []).
    controller('todoMainCtrl',['$scope', function($scope) {
      // todoList array
      $scope.todoList = [
        {cat:'workplace', task:'Buy an SSD', due: '2014-01-01'},
        {cat:'workplace', task:'Partition the drive', due: '2014-01-04'},
        {cat:'workplace', task:'Install Ubuntu and Windows', due: '2014-01-09'},
        {cat:'workplace', task:'Install optional packages', due: '2014-01-10'},
        {cat:'workplace', task:'Install PyCharm', due: '2014-01-03'},
        {cat:'homeplace', task:'Clean the floor', due: '2014-01-06'},
        {cat:'homeplace', task:'Cook dinner', due: '2014-01-10'},
        {cat:'homeplace', task:'Make the bed', due: '2014-01-14'}
      ];

      // Category
      $scope.categoryList = [
        {id:'workplace', name: 'Workplace'},
        {id:'homeplace', name: 'Homeplace'}
      ];

      $scope.selectedCategory = 'workplace';
      $scope.selectCategory = function(categoryId) {
        $scope.selectedCategory = categoryId;
      };

      $scope.todoList.sort(function(a,b) {
          return a.due > b.due;
      });
    }])