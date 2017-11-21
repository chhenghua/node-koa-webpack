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

//验证码倒计时
directiveApp.directive('countDown', function () {
    return {
        restrict: 'AE',
        template: '<button type="button" class="btn btn-code" ' +
        'ng-click="cont()"' +
        'ng-disabled="paraevent" ' +
        'ng-bind="paracont"' +
        '></button>',
        scope: {
            url: '@',
            account: '=',
            cont: '&',
        },
        controller: function ($scope, $interval, $element) {
            $scope.paracont = '获取验证码';
            var second = 60;
            $scope.cont = function () {
                if (!(zz_phone.test($scope.account))) {
                    massage.error('请输入正确的手机号.');
                    $scope.accounted = false;
                    return false;
                } else {
                    $scope.accounted = true;
                }
                ydm.jQajax({account: $scope.account}, $scope.url, function(data) {
                    massage.success('发送成功，请注意查收验证码！');
                    var timePromise = $interval(function() {
                        if(second <= 0) {
                            $interval.cancel(timePromise);
                            timePromise = undefined;
                            second = 60;
                            $scope.paracont = "重发验证码";
                            $scope.paraevent = false;
                        } else {
                            $scope.paracont = second + "秒后重发";
                            second--;
                            $scope.paraevent = true;
                        }
                    }, 1000);
                });
            }
        }
    }
});

