describe("Controller: todoMainCtrl", function() {
  var $scope;

  beforeEach(module('todoApp'));
  beforeEach(inject(function($rootScope, $controller){
    $scope = $rootScope.$new();
    ctrl = $controller('todoMainCtrl', {
        $scope: $scope
    });
  }));


  it("One plus One must be TWO", function() {
    expect(1 + 1).toBe(2);
  });

  it("There should be five items in $scope.todoList", function() {
    expect($scope.todoList.length).toBe(5);
  });
});