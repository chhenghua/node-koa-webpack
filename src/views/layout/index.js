/**
 * 登录、注册、忘记密码
 * 控制器
 */
//声明应用
var ydmApp = angular.module('ydmApp', ['ngCookies', 'ydm.common']);

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
ydmApp.controller('loginPwdCtrl', function ($scope, $state, $cookieStore) {
    var opt = {
        submit: function () {
            /* 手机号*/
            if ($scope.account.length != 11) {
                if (!(zz_account612.test($scope.account))) {
                    massage.error('账号格式不正确，6~12位字符，可包含英文字母、数字或下划线，首位必须是字母.');
                    $scope.accounted = false;
                    return false;
                } else {
                    $scope.accounted = true;
                }
            } else if ($scope.account.length === 11 && !isNaN($scope.account)) {
                if (!(zz_phone.test($scope.account))) {
                    massage.error('请输入正确的手机号.');
                    $scope.accounted = false;
                    return false;
                } else {
                    $scope.accounted = true;
                }
            }
            /* 密码 */
            if (!(zz_pwd616.test($scope.password))) {
                massage.error('密码长度在6~16位字符之间.');
                $scope.passworded = false;
                return false;
            } else {
                $scope.passworded = true;
            }
            var params = {
                account: $scope.account,
                pwd: md5.hex($scope.password)
            };
            opt.login(params);
        },
        login: function(params){
            ydm.jQajax(params, 'admin/ManagerStorePWDLogin', function (data) {
                $cookieStore.put('userID', data.userID);
                massage.success('登录成功.');
                setTimeout(function() {
                    console.log('safdklsdjf')
                    $state.go('main.home');
                }, 2000);
            });
        },
    };
    $scope.chkRemember = true;
    $scope.submit = opt.submit;
});

//短信登录
ydmApp.controller('loginMessageCtrl', function ($scope) {
    var opt = {

    };
    $scope.url = 'admin/ManagerStoreLoginCode';
});


