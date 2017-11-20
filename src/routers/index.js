'use strict';

var routerApp = angular.module('ydmApp', ['ui.router', 'oc.lazyLoad']);

/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}
 */
routerApp.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

/**
 * 配置路由。
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */
routerApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login/pwd');
    $stateProvider
        // 模板
        .state('login', {
            url: '/login',
            views: {
                '': {
                    templateUrl: 'views/layout/index.html',
                    controller: 'loginCtrl as ctrl',
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'views/layout/index.js'
                    ]);
                }]
            }
        })
        // 密码登录
        .state('login.pwd', {
            url: '/pwd',
            views: {
                'main@login': {
                    templateUrl: 'views/layout/login_pwd.html',
                    controller: 'loginPwdCtrl as ctrl',
                }
            }
        })
        // 短信登录
        .state('login.message', {
            url: '/message',
            views: {
                'main@login': {
                    templateUrl: 'views/layout/login_message.html',
                    controller: 'loginMessageCtrl as ctrl',
                }
            }
        })
        // 注册
        .state('login.reg', {
            url: '/reg',
            views: {
                'main@login': {
                    templateUrl: 'views/layout/reg.html',
                    controller: 'loginRegCtrl as ctrl',
                }
            }
        })
        // 注册2
        .state('login.reg2', {
            url: '/reg2',
            views: {
                'main@login': {
                    templateUrl: 'views/layout/reg2.html',
                    controller: 'loginReg2Ctrl as ctrl',
                }
            }
        })
        // 忘记密码
        .state('login.forgetPwd', {
            url: '/forgetPwd',
            views: {
                'main@login': {
                    templateUrl: 'views/layout/forget_pwd.html',
                    controller: 'loginForgetPwdCtrl as ctrl',
                }
            }
        })
});