'use strict';

var app = angular.module('exampleApp', ['JSONedit']);

var data;

function MainViewCtrl($scope, $filter) {


    $.ajax({
        async: false, type: 'POST', url: "reload-gloable-variable", timeout: 5000,
        data: JSON.stringify(
            {func: 'load-json-file', json_file: "mw"}),
        success: function (data) {
            $scope.jsonData = data;
        }, error: function (data) {
        }
    });

    $(document).on('click', '[id^="json-file-"]', function (e) {
        console.log($(this)[0].attributes[3].textContent);
        $.ajax({
            async: false, type: 'POST', url: "reload-gloable-variable", timeout: 5000,
            data: JSON.stringify(
                {func: 'load-json-file', json_file: $(this)[0].attributes[3].textContent}),
            success: function (data) {
                $scope.jsonString = $scope.jsonData = data;
                $scope.$apply();
            }, error: function (data) {
            }
        });
    });

    
    

    $scope.$watch('jsonData', function (json) {
        $scope.jsonString = $filter('json')(json);
    }, true);
    $scope.$watch('jsonString', function (json) {
        try {
            $scope.jsonData = JSON.parse(json);
            $scope.wellFormed = true;
        } catch (e) {
            $scope.wellFormed = false;
        }
    }, true);

    
}