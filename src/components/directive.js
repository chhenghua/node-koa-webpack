/**
 * 自定义指令
 */
var directiveApp = angular.module('ydm.common', []);

//单个时间组件
directiveApp.directive('singlePicker', function () {
    return {
        restrict: 'AE',
        template:   '<input class="form-control" type="text" ' +
        'placeholder="{{ placeholder }}" ' +
        'ng-model="ydmModel" >',
        require: "ngModel",
        scope: {
            ydmModel: '=',
            placeholder: '@',
        },
        replace: true,
        link: function(scope, element, attr, ngModel) {
            element.val(ngModel.$viewValue);
            function onpicking(dp) {
                var date = dp.cal.getNewDateStr();
                scope.$apply(function() {
                    ngModel.$setViewValue(date);
                });
            }
            element.bind('click', function() {
                window.WdatePicker({
                    onpicking: onpicking,
                    dateFmt: 'yyyy-MM-dd'
                });
            });
        }
    }
});
