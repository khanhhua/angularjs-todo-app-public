/**
* todo Module
*
* The main module for this TODO app
*/
angular.module('todoApp', ['ngCookies']).
    controller('todoMainCtrl',['$cookieStore','$filter','$scope', function($cookieStore,$filter, $scope) {
      var today = '2014-03-10';

      // todoList array
      var active = {
        'task-108': {id: 'task-108', cat:'workplace', task:'Buy an SSD', due: '2014-01-01', status: 'unplanned'},
        'task-107': {id: 'task-107', cat:'workplace', task:'Partition the drive', due: '2014-01-04', status: 'unplanned'},
        'task-106': {id: 'task-106', cat:'workplace', task:'Install Ubuntu and Windows', due: '2014-02-09', status: 'unplanned'},
        'task-105': {id: 'task-105', cat:'workplace', task:'Install optional packages', due: '2014-03-10', status: 'unplanned'},
        'task-104': {id: 'task-104', cat:'workplace', task:'Install PyCharm', due: '2014-02-03', status: 'unplanned'},
        'task-103': {id: 'task-103', cat:'homeplace', task:'Clean the floor', due: '2014-03-06', status: 'unplanned'},
        'task-102': {id: 'task-102', cat:'homeplace', task:'Cook dinner', due: '2014-03-10', status: 'unplanned'},
        'task-101': {id: 'task-101', cat:'homeplace', task:'Make the bed', due: '2014-03-30', status: 'unplanned'}
      };

      $scope.todoList = active;

      // archive array
      $scope.archive = {
          '2013': {
            12:{
                'task-098':{id: 'task-098', cat:'workplace', task:'Buy an SSD', due: '2014-12-01', status: 'unplanned'},
                'task-097':{id: 'task-097', cat:'workplace', task:'Partition the drive', due: '2014-12-04', status: 'unplanned'},
                'task-096':{id: 'task-096', cat:'workplace', task:'Install Ubuntu and Windows', due: '2014-12-09', status: 'unplanned'}
            },
            11:{
                'task-095':{id: 'task-095', cat:'workplace', task:'Install PyCharm', due: '2014-11-03', status: 'unplanned'},
                'task-094':{id: 'task-094', cat:'homeplace', task:'Clean the floor', due: '2014-11-06', status: 'unplanned'},
                'task-093':{id: 'task-093', cat:'homeplace', task:'Cook dinner', due: '2014-11-10', status: 'unplanned'}
            },
            10: {
                'task-092':{id: 'task-092', cat:'homeplace', task:'Clean the floor', due: '2014-10-06', status: 'unplanned'},
                'task-091':{id: 'task-091', cat:'homeplace', task:'Cook dinner', due: '2014-10-10', status: 'unplanned'},
                'task-090':{id: 'task-090', cat:'homeplace', task:'Make the bed', due: '2014-10-30', status: 'unplanned'}
            }
          },
          '2012': {
            12:{
                'task-088':{id: 'task-088', cat:'workplace', task:'Buy an SSD', due: '2012-12-01', status: 'unplanned'},
                'task-087':{id: 'task-087', cat:'workplace', task:'Partition the drive', due: '2012-12-04', status: 'unplanned'},
                'task-086':{id: 'task-086', cat:'workplace', task:'Install Ubuntu and Windows', due: '2013-12-09', status: 'unplanned'}
            },
            10:{
                'task-085':{id: 'task-085', cat:'workplace', task:'Install PyCharm', due: '2012-10-03', status: 'unplanned'},
                'task-084':{id: 'task-084', cat:'homeplace', task:'Clean the floor', due: '2012-10-06', status: 'unplanned'},
                'task-083':{id: 'task-083', cat:'homeplace', task:'Cook dinner', due: '2012-10-10', status: 'unplanned'}
            },
            9: {
                'task-082':{id: 'task-082', cat:'homeplace', task:'Clean the floor', due: '2012-09-06', status: 'unplanned'},
                'task-081':{id: 'task-081', cat:'homeplace', task:'Cook dinner', due: '2012-09-10', status: 'unplanned'},
                'task-080':{id: 'task-080', cat:'homeplace', task:'Make the bed', due: '2012-09-30', status: 'unplanned'}
            }
          }
      }

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

      $scope.selectArchive = function(year, month) {
        $scope.todoList = $scope.archive[year][month];
      };

      $scope.done = function(todoItem) {
      // prev_status helps revert todoItem status
      // TODO: update the requirement!
        var prev_month_last_day = new Date(today);
        prev_month_last_day.setMonth(prev_month_last_day.getMonth()==0?11:prev_month_last_day.getMonth()-1);
        if (prev_month_last_day.getMonth()!==1) // Not February
          prev_month_last_day.setDate(30);
        else
          prev_month_last_day.setDate(28);

        if (todoItem.status !== 'done') {
          todoItem.prev_status = todoItem.status;
          todoItem.status = 'done';
          // Move item to archive
          var date = new Date(todoItem.due);
          if (date <= prev_month_last_day) {
            delete active[todoItem.id]; // Remove from active list

            var month = date.getMonth() + 1;
            var year = date.getUTCFullYear();
            if (!(year in $scope.archive))
              $scope.archive[year] = {};
            if (!(month in $scope.archive[year]))
              $scope.archive[year][month] = {};
            $scope.archive[year][month][todoItem.id] = todoItem;
          }
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

      // SCHED HEALTH
      // Keep Sched Metrics updated
      $scope.sched_heath = {
        done: function() {
          var active_array = $filter('array')(active);
          // DONE: Any done tasks are classified into this group (whether they are overdue or on time)
          return ($filter('filter')(active_array,
            function(item) { 
                return item.status==='done';
            }).length / active_array.length) * 100;
        },
        deadline: function () {
          var active_array = $filter('array')(active);
          // Deadline: Tasks whose deadlines are coming within the next 7 days. 
          // These tasks are not done.

          var today_stamp = Date.parse(today);
          var seven_days_millis = 7 * 24 * 3600 * 1000;
          return ($filter('filter')(active_array,
            function(item) {
                var due_stamp = Date.parse(item.due);
                return item.status!=='done' && today_stamp - due_stamp  < seven_days_millis;
            }).length / active_array.length) * 100;
        },
        overdue: function () {
          var active_array = $filter('array')(active);
          // Overdue: Undone tasks whose deadlines are already in the past.

          return ($filter('filter')(active_array,
            function(item) { 
                return item.status!=='done' && item.due < today;
            }).length / active_array.length) * 100;
        }
      };
    }])
    .filter('stringify', function(){
      // Transform numeric MONTH to textual MONTH
        var month_names = [
          null, 'January', 'February', 'March', 'April', 
                'May', 'June', 'July', 'August', 
                'September', 'October', 'November', 'December'];
        return function(input) {
          try {
            return month_names[parseInt(input)];            
          } catch(e) {
            return input;
          }
        };
    })
    .filter('array', function(){
      return function(obj) {
          var ret = [];
          for(key in obj)
            ret.push(obj[key]);

          return ret;
      };
    });
