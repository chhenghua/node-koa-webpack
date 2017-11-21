/**
 * 主控制器
 */
//声明应用
var ydmApp = angular.module('ydmApp', ['ngCookies']);

//头部控制器
ydmApp.controller('ydmController', function ($scope, $location, $cookieStore, $state) {
    var opt = {
        /* 提示音 */
        music: function (obj) {
            var auto = document.getElementById(obj);
            auto.play();
        },
        /* websockit */
        websockit: function () {
            var socket = io.connect(socketUrl,{'transports': ['websocket', 'polling']});
            socket.emit('hiho', $cookieStore.get('userID'), function(data){
            });
            socket.on('update', function(msg){
                opt.music('orderMusic');
                opt.getMsg({pageNumber: 1,pageData: 10});
            });
        },
        /* 回到首页 */
        home: function(){
            $scope.subs = [];
            $state.go('index');
        },
        /* 退出登录 */
        out: function(){
            layer.confirm(
                '确定要退出登录？',
                { btn: ['确定', '取消'] },
                function() {
                    noDatajQajax(apiUrl + 'admin/ManagerStoreSignOut', function(data){
                        window.location.href = 'index.html';
                    });
                }
            );
        },
        /* 10条消息通知  */
        getMsg: function(param){
            jQajax(param, apiUrl+ 'admin/msgGetMsgList', function(data){
                $scope.list = data.data;
                angular.forEach($scope.list, function(item){
                    if (item.messageType === 2) {
                        item.messageContentShot = item.messageContent.split('<br/>')[0];
                    } else {
                        item.messageContentShot = item.messageContent;
                    }
                });
                $scope.total = data.total;
                $scope.unReadNum = data.unReadNum;
            });
        },
        /* 获取导航 */
        getNav: function(){
            ydm.jQajax({},'admin/getNav', function(data){
                /* funID异常处理 */
                if (data.isBoss !== true) {
                    if (data.funID.length === 0) {
                        massage.error('服务器连接异常，请稍后再试');
                        return false;
                    }
                }

                /* 存储的公共变量 */
                instance.funID = data.funID;
                instance.isBoss = data.isBoss;
                instance.branchID = data.branchID;
                instance.userID = data.userID;

                /* 获取用户和头像 */
                $scope.userName = data.userName;
                if(!data.HeadPortrait){
                    $scope.userImg = 'images/default_head.png';
                }else{
                    $scope.userImg = data.HeadPortrait;
                }

                if(data.isBoss === true){
                    $scope.menu=data.data;
                    angular.forEach(data.data, function(item){
                        item.subs1 = item.subs
                    });
                }else if(data.isBoss === null){
                    angular.forEach(data.data, function(item){
                        if(data.funID.indexOf(item.funid) !== -1){
                            $scope.menu.push(item);
                            item.subs1 = [];
                            angular.forEach(item.subs, function(_item){
                                if (data.funID.indexOf(_item.funid) !== -1) {
                                    item.subs1.push(_item);
                                }
                            });
                            item.router = item.subs1[0].router
                        }
                    });
                }
                opt.defaultMenu();
                $scope.$apply();
            });
        },
        defaultMenu: function () {
            var apiName = $location.$$url.split('/')[1];
            angular.forEach($scope.menu, function(item){
                if (apiName == item.router) {
                    $scope.funId = item.funid;
                    $scope.subs = item.subs1;
                } else{
                    angular.forEach(item.subs, function(_item){
                        if (apiName == _item.router) {
                            $scope.funId = item.funid;
                            $scope.subs = item.subs1;
                        }
                    });
                }
            });
        },
        /* 主导航  */
        menuSub: function(item){
            $scope.funId = item.funid;
            $scope.subs = item.subs1;
            $state.go(item.router);
        },
        /* 全部标记为已读，支付类除外 */
        readAll: function(){
            jQajax({}, apiUrl + 'admin/msgSetReadAll', function(data){
                massage.success('通知类消息已全部设为已读，支付类消息除外！');
            });
        },
        /* 标记已读 */
        read: function(param){
            jQajax({messageId: param}, apiUrl + 'admin/msgSetRead', function(){});
        },
        /* 消息详情

         * item.messageType == 1	系统消息
         * item.messageType == 2	通知消息
         * item.messageType == 3	项目订单
         * item.messageType == 4	美丽金订单
         * item.messageType == 5	商品订单
         * */
        readMsg: function(item){
            var title = '';
            if (item.messageType == 3 || item.messageType == 4 || item.messageType == 5) {
                if (item.messageType == 3) {
                    title = '项目订单支付详情';
                }
                if (item.messageType == 4) {
                    title = '美丽金订单支付详情';
                }
                if (item.messageType == 5) {
                    title = '商品订单支付详情';
                }
                layerService.getLayer(title, '960px', '80%', '\'include/order_detail.html\'', function(index, layero){
                    instance.layero = layero;
                });
                instance.messageType = item.messageType;
            }else if (item.messageType == 2 || item.messageType == 1) {
                if (item.messageType==2) {
                    title='通知消息';
                }else if(item.messageType==1){
                    title='系统消息';
                }
                layerService.getLayer(title, '400px', '300px', '\'include/message_detail.html\'', function(index, layero){
                    instance.layero = layero;
                    opt.read(item.messageId);
                });
            } else {
                massage.error('item.messageType类型错误');
            }
            instance.item = item;
        },
        readMore: function (){
            layerService.getLayer('消息列表', '780px', '80%', '\'include/allMessage.html\'', function(index, layero){
                instance.layero = layero;
            });
        }
    };
    $scope.menu = [];
    $scope.subs = [];
    $scope.subs1 = [];
    $scope.ggb_v = constant.ggb_v;
    opt.getNav();
});