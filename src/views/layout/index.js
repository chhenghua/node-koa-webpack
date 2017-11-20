/**
 * 登录、注册、忘记密码
 * 控制器
 */
//声明应用
var ydmApp = angular.module('ydmApp', []);

//父控制器
ydmApp.controller('loginCtrl', function ($scope) {
    $scope.alink = [
        {
            name: "登录",
            link: "login.pwd"
        },
        {
            name: "注册",
            link: "login.reg"
        },
        {
            name: "忘记密码",
            link: "login.forgetPwd"
        }
    ];
    $scope.tel = "客服电话：400-000-0910";
    $scope.ggb_v = "Beauty Guide v1.3.8";
    $scope.pwdMessage = [
        {
            name: "密码登录",
            link: "login.pwd"
        },
        {
            name: "短信登录",
            link: "login.message"
        }
    ];
});

//密码登录
ydmApp.controller('loginPwdCtrl', function ($scope) {

});

//短信登录
ydmApp.controller('loginMessageCtrl', function ($scope) {

});
