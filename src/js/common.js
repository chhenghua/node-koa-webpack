/* 常量 */
const constant =  {
    ggb_v: 'v1.3.8',    //版本号
    maxSize: 500 * 1024,//图片最大上传大小
    isDebug: true,      //调试打印，true为打开，false为关闭
    mtPath: '/api/',
};

const ydm = {
    /* 调试打印 */
    debug: function(key, obj) {
        if (constant.isDebug) {
            if (obj) {
                console.group(key + "  -  日志");
                console.log(obj);
                console.groupEnd();
            } else {
                console.info(key + "  -  日志");
            }
        }
    },
    /**
     * [jQajax]
     * @param  {[type]} data    [传递参数]
     * @param  {[type]} url     [请求地址]
     * @param  {[type]} success [成功的回调]
     * @param  {[type]} async   [同步或者异步，true:异步，false:同步;默认true,]
     * @param  {[type]} error   [错误的回调用]
     * @param  {[type]} type    [POST OR GET;默认POST]
     * @param  {[type]} flage   [true:原样传递参数,false: json-->string,other-->原样传递]
     */
    jQajax: function (data, url, success, async, error, type, flage) {
        var urlPath = '';
        if (!url) {
            massage.error("ajax请求未发现请求地址.");
            if (error) {
                error();
            }
        } else {
            if(url.indexOf("http://") == -1){
                urlPath = constant.mtPath + url;
            } else {
                urlPath = url;
            }
            if(url === 'ydmUploadImg'){
                urlPath = severParms.img_server_url + url;
            }

            var obj = {
                type: (type || 'POST'),
                url: urlPath,
                dataType: 'json',
                async: (async || 'true'),
                timeout: 0,
                beforeSend: function() {
                    layer.load(0);
                },
                complete: function() {
                    layer.load(0, { time: 1 });
                },
                success: function(json) {
                	if (!json) {
						massage.error('api接口无返回.');
					} else {
						if (json.status) {
							if(100 === json.status){
								if (success) {
									ydm.debug("ajax[" + url + "] response result:", {
										request: {
											url: url,
											data: data,
											type: (type || 'POST'),
											flage: (flage || false)
										},
										response: {
											res: json
										}
									});
									success(json);
								}
							} else if(3 === json.status) {
								massage.info('登录超时请重新登录.');
								window.location.href = "index.html";
								return false;
							} else {
								massage.error(json.status+json.msg);
								return false;
							}
						} else {
							var fieldError = json && json.fieldError || json.msg.fieldError;
							var globalError = json && json.globalError || json && json.msg && json.msg.globalError;
							var msg = [];
							if (fieldError || globalError) {
								if (globalError && globalError.length > 0) {
									msg.push(globalError.join('<br/>'));
								}
								if (fieldError && fieldError.length > 0) {
									msg.push(fieldError.join('<br/>'));
								}
							} else {
								msg[0] = json.msg;
							}
							massage.error(msg.join(''));
							error && error(json);
						}
					}
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    if (error) {
                        error(jqXHR);
                    }
                    try {
                        var sessionStatus = jqXHR.getResponseHeader('_xcrm_session_status');
                        if ('_timeout' == sessionStatus) {
                            window.location.href = mtLoginPath + 'index.html';
                        }
                        if (jqXHR.status == 401) {
                            massage.error(jqXHR.status+"无权限执行此操作.");
                        } else {
                            var xhr = jqXHR;
                            if (xhr && xhr.responseText) {
                                var _json = JSON.parse(xhr.responseText);
                                if (!_json.res) {
                                    massage.error(jqXHR.status+_json.msg);
                                } else {
                                    massage.error(jqXHR.status+xhr.responseText);
                                }
                            } else {
                                massage.error(jqXHR.status+"后端错误.");
                            }
                        }
                    } catch (ex) {
                        massage.error(jqXHR.status+"后端错误.");
                    }
                }
            };
            if (flage) {
                if (data) {
                    obj.data = data;
                }
            } else {
                if ((typeof data) == 'object') {
                    obj.contentType = "application/json;charset=utf-8";
                    if (data) {
                        obj.data = JSON.stringify(data);
                    }
                } else if ((typeof data) == 'string') {
                    if (data) {
                        obj.data = data;
                    }
                }
            }
            $.ajax(obj);
        }
    }
};

/* 正则 */
const zz_phone 		= /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;				//手机号
const zz_email 		= /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;//邮箱
const zz_user_id 	= /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;//身份证号
const zz_account612 = /^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){5,11}$/;	//账号：	6~12位字符，可包含英文字母、数字或下划线，首位必须是字母；
const zz_pwd616		= /^.{6,16}$/;								//密码：	6-16位字符，无格式要求，字母区分大小写；
const zz_code		= /^\d{4}$/;								//验证码：4位数字
const zz_name		= /^[a-zA-Z0-9\u4E00-\u9FFF\s]{2,8}$/;		//姓名：	2-8个字符，支持汉字、大小写英文或者数字组合
const zz_decimal_1	= /^(\d{1,2}(\.\d{1,1})?|100)$/;			//0-100之内的数，保留1位小数
const zz_decimal_2	= /^[0-9]+(.[0-9]{0,2})?$/  				//限制两位小数
const zz_decimal_2_3= /^[0-9]+(.[0-9]{0,2})?$/  				//0.00-999.99
const zz_number_6	= /^\d{6}$/;								//1-6位数字
const zz_char_2_4	= /^.{2,4}$/;								//2-4个字符
const zz_char_2_6	= /^.{2,6}$/;								//2-6个字符
const zz_char_10	= /^.{1,10}$/;								//1-10个字符
const zz_char_12	= /^.{1,12}$/;								//1-12个字符
const zz_char_15	= /^.{1,15}$/;								//1-15个字符
const zz_char_18	= /^.{1,18}$/;								//1-18个字符
const zz_char_20	= /^.{1,20}$/;								//1-20个字符
const zz_char_30	= /^.{1,30}$/;								//1-30个字符
const zz_char_60	= /^.{1,60}$/;								//1-60个字符
const zz_char_100	= /^.{1,100}$/;								//1-100个字符
const zz_number_2	= /^(?!0)\d{1,2}$/;							//1-99之内的正整数
const zz_number_3	= /^(?!0)\d{1,3}$/;							//1-999之内的正整数
const zz_number_4	= /^(?!0)\d{1,4}$/;							//1-9999之内的正整数




/** 时间戳
 * [getDayStamp]
 * @param  {[type]} day    [-30三十天前、-7七天前、-2前天、-1昨天、0今天、1明天、2后天]
 * @param  {[type]} type    [1是00:00:00， 2是23:59:59]
 */
function getDayStamp (day, type) {
	var timestamp ;
	var today = new Date();
	if (type === 1) {
		today = today.setHours(0,0,0,0);
		timestamp = today + 1000*60*60*24*day;
	} else if (type === 2) {
		today = today.setHours(23,59,59,0);
		timestamp = today + 1000*60*60*24*day;
	} else {
		today = new Date();
		timestamp = today.getTime() + 1000*60*60*24*day;
	}
	return timestamp;
}

/** 格式化日期
 * [toDecimal]
 * @param  {[type]} day    [-30三十天前、-7七天前、-2前天、-1昨天、0今天、1明天、2后天]
 */
function getDay (param) {
	var today = new Date();
	var dateStr = '';
	var timestamp =  today.getTime() + 1000*60*60*24*param,
		d = new Date(timestamp),
		yyyy = d.getFullYear(),
		month = d.getMonth() + 1,
		MM = month < 10 ? "0" + month : month,
		day = d.getDate(),
		dd = day < 10 ? "0" + day : day,
		dateStr = yyyy + '-' + MM + '-' + dd;
	return dateStr;
}

/** 保留小数
 * [toDecimal]
 * @param  {[type]} x    [值]
 * @param  {[type]} u    [10保留一位，100保留两位， 1000保留三位]
 */
function toDecimal(x, y) {
	var f = parseFloat(x);
	if(isNaN(f)) {
		return;
	}
	f = Math.round(x * y) / y;
	return f;
}

/** 转换格式化时间
 * [getNowFormatDate]
 * @param  {[type]} nS    [时间戳 13位]
 */
function getNowFormatDate(nS) {
	if(!nS) return;
	var now = new Date(nS);
	var yyyy = now.getFullYear();
	var mm = now.getMonth() + 1;
	var dd = now.getDate();
	var hh = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
	var mi = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
	var ss = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds()
	return yyyy + "-" + mm + "-" + dd + " " + hh + ":" + mi + ":" + ss;
}

/** 转化时间戳
 * [getNowFormatDate]
 * @param  {[type]} Mydate    [格式化的时间]
 */
function DateTOtimestamp(Mydate) {
	if(!Mydate) return 0;
	var arr = Mydate.split(/[- : \/]/);
	var timestamp;
	if(arr.length>5){
		timestamp = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]).getTime();
	}else{
		timestamp = new Date(arr[0], arr[1]-1, arr[2]).getTime();
	}
	
	/*var timestamp = new Date(Mydate).getTime();*/
	return timestamp;
}

/** 图片上传
 * [img_upload]
 * @param  {[type]} files    [图片对象]
 * @param  {[type]} imgType  [图片格式]
 * @param  {[type]} cb       [回调]
 */
function img_upload(files, imgType, cb) {
	var imgUrlArr = [];
	if(files == undefined) {
		massage.error('未选中图片！');
		return false;
	}
	var filesize = files.size;
	var reader = new FileReader();
	reader.onloadend = function() {
		var url = img_server_url + 'ydmUploadImg';
		var pic = reader.result;
		var dataPic = pic.split(",");
		var dataImg = dataPic[1];
		var GetJsonData = {
			dataImg: dataImg,
			imgType: imgType
		};
		if(filesize > maxSize) {
			massage.error('商品主图大小不能超过500kb!');
			GetJsonData = {};
			return false;
		}
		jQajax(GetJsonData, url, function(data) {
			imgUrlArr.push(data.pathImg);
			cb(imgUrlArr);
		},false);
	}
	if(files) {
		reader.readAsDataURL(files);
	} else {
		massage.error('上传失败');
	}
}

/** 编辑器图片上传
 * [getNowFormatDate]
 * @param  {[type]} files    	[图片对象]
 * @param  {[type]} cb  		[回调]
 */
function uploadEditorImage(files, cb) {
	if (files != null) {
		var reader = new FileReader();
		if(files) {
			reader.readAsDataURL(files);
		} else {
			massage.error('上传失败');
		}
		var filesize = files.size;
		reader.onloadend = function(jqXHR, textStatus, errorThrown) {
			var imgUrl = img_server_url + 'ydmUploadImg';
			var pic = reader.result;
			var dataPic = pic.split(",");
			var dataImg = dataPic[1];
			var imgType = pic.split('image/')[1].split(';base64,')[0];
			var imgdata = {};
			if(filesize <= maxSize) {
				imgdata = {	
					dataImg: dataImg,
					imgType: imgType
				};
			} else {
				massage.error('图片大小不能超过500kb！');
				imgdata = {};
				return false;
			}
			jQajax(imgdata, imgUrl, function(data){
				cb(data)
			},false);
		}
	}
}

/** 
 * [jQajax]
 * @param  {[type]} data    	[请求对象]
 * @param  {[type]} url  		[请求接口]
 * @param  {[type]} success  	[成功回调]
 * @param  {[type]} async  		[同步异步]
 */
function jQajax(data, url, success, async) {
	$.ajax({
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		type: 'post',
		url: url,
		async: async,
		beforeSend: function() {
			layer.load(0);
		},
		timeout: 0,
		success: function(res) {
			if (!res) {
				massage.error('后端错误.');
			} else {
				if(100 == res.status) {
					success(res);
				} else if(3 == res.status) {
					window.location.href = '#/loginAgain';
				} else {
					massage.error(res.msg);
				}
			}
		},
		complete: function() {
			layer.load(0, { time: 1});
		},
		error: function(jqXHR, textStatus, errorThrown) {
			try {
                var sessionStatus = jqXHR.getResponseHeader('_xcrm_session_status');
                if ('_timeout' == sessionStatus) {
                    window.location.href = 'index.html';
                }
                if (jqXHR.status == 401) {
                	massage.error(jqXHR.status+'无权限执行此操作.');
                } else if (jqXHR.status == 404) {
                	window.location.href = '#/error404';
                } else {
                    var xhr = jqXHR;
                    if (xhr && xhr.responseText) {
                        var _json = JSON.parse(xhr.responseText);
                        if (!_json.res) {
                        	massage.error(jqXHR.status+_json.msg);
                        } else {
                        	massage.error(jqXHR.status+xhr.responseText);
                        }
                    } else {
                    	massage.error(jqXHR.status+'后端错误.');
                    }
                }
            } catch (ex) {
            	massage.error(jqXHR.status+'后端错误.');
            }
		}
	})
}

/** 
 * [noDatajQajax]
 * @param  {[type]} url  		[请求接口]
 * @param  {[type]} success  	[成功回调]
 */
function noDatajQajax(url, success) {
	$.ajax({
		contentType: "application/json; charset=utf-8",
		type: 'post',
		url: url,
		async: true,
		beforeSend: function() {
			layer.load(0);
		},
		timeout: 0,
		success: function(res) {
			if(100 == res.status) {
				success(res);
			} else if(3 == res.status) {
				window.location.href = '#/loginAgain';
			} else {
				massage.error(res.msg);
			}
		},
		complete: function() {
			layer.load(0, { time: 1 });
		},
		error: function(jqXHR, textStatus, errorThrown) {
			try {
                var sessionStatus = jqXHR.getResponseHeader('_xcrm_session_status');
                if ('_timeout' == sessionStatus) {
                    window.location.href = 'index.html';
                }
                if (jqXHR.status == 401) {
                	massage.error(jqXHR.status+'无权限执行此操作.');
                } else if (jqXHR.status == 404) {
                	window.location.href = '#/error404';
                } else {
                    var xhr = jqXHR;
                    if (xhr && xhr.responseText) {
                        var _json = JSON.parse(xhr.responseText);
                        if (!_json.res) {
                        	massage.error(jqXHR.status+_json.msg);
                        } else {
                        	massage.error(jqXHR.status+xhr.responseText);
                        }
                    } else {
                    	massage.error(jqXHR.status+'后端错误.');
                    }
                }
            } catch (ex) {
            	massage.error(jqXHR.status+'后端错误.');
            }
		}
	})
}

/*上传图片插件
 
 * 依赖服务：uploadPictureService
 * HTML部分：<div id=""></div><img src="../images/upload_img.png" ng-click="ctrl.uploadPicture($event.target)">
 * 弹出上传：uploadPictureService.layer
 * 渲染获取图片：uploadPictureService.getImg(id, src) id是DOM节点，src是图片路径
 * 提交获取图片：uploadPictureService.postImg(id) id是DOM节点
 * */

var uploadPictureService = function() {};
uploadPictureService.prototype = {
	layer: function(target, num, info) {
		var len = parseInt($(target).prev().children('.main-img').length);
		if(len > num - 1) {
			massage.error(info);
			return false;
		}
		layer.open({
			type: 1,
			title: '上传图片',
			area: ['440px', '300px'],
			btn: ['确定上传', '取消'],
			yes: function(index) {
				var flieStr = $('#filePicURL').val();
				var filesData = $('#filePicURL').prop('files')[0];
				var imgType = flieStr.split('.')[1];
				img_upload(filesData, imgType, function(arr) {
					var result = '<div class="main-img">' + '<div class="img"><img src="' + arr[0] + '" class="pic"></div>' + '<span></span>' + '</div>';
					$(target).prev().append(result);
					//删除主图
					$('.main-img span').each(function() {
						$(this).on('click', function() {
							$(this).parent().remove();
						});
					});
				});
				layer.close(index);
			},
			shadeClose: false,
			content: '<div ng-include="\'Templates/public/picture_layer.html\'"></div>'
		});	
	},
	getImg: function(target, src){
		if(!src){
			return false;
		}
		//预览图片
		var result = '<div class="main-img"><div class="img"><img src="' + src + '" class="pic"></div><span></span></div>';
		$(target).append(result);
		//删除主图
		$('.main-img span').each(function() {
			$(this).on('click', function() {
				$(this).parent().remove();
			});
		});
	},
	postImg: function(target){
		var picArr = new Array();
		var picVlaue = '';
		var picObj = $(target).children().children().children();
		for(var i=0; i<picObj.length; i++){
			picVlaue = picObj[i].src;
			picArr.push(picVlaue);
		}
		return picArr;
	},
	cutlayer: function(cb){
		layer.open({
			type: 1,
			title: '裁剪图片',
			area: ['780px', '80%'],
			resize: false,
			success: cb,
			content: '<div ng-include="\'Templates/public/cut_img.html\'"></div>'
		});
	},
	getCutImg: function(target, src){
		if(!src){
			return false;
		}
		var result = '';
		if(!src.split('_')[1]){
			result = '<div class="main-img"><div class="img"><img src="' + src + '" class="pic"></div><span></span></div>';
		}else{
			var size = src.split('_')[1].split('.')[0];
			var width = size.split('x')[0];
			var height = size.split('x')[1];
			var imgWidth = 0;
			var imgheight = 0;
			var imgStyle = '';
			if(width >= height){
				imgWidth = 80;
				imgheight = imgWidth-(height*imgWidth/width);
				imgStyle = 'margin-top:' + imgheight/2 + 'px';
			}else{
				imgStyle = 'text-align: center;';
			}
			//预览图片
			result = '<div class="main-img cut-img"><div class="img" style="'+ imgStyle +'" onclick="preview1(' + width + ',' + height + ',\'' + src +'\')"><img src="' + src + '" class="pic" title="点击预览"></div><div class="size-bg"></div><div class="size">'+ size +'px</div>' + '<span></span>' + '</div>';
		}
		$(target).append(result);
		//删除主图
		$('.main-img span').each(function() {
			$(this).on('click', function() {
				$(this).parent().remove();
			});
		});
	},
	
}

/* 预览图片 */
function preview1(width, height, src){
	layer.open({
	  type: 1,
	  title: false,
	  closeBtn: 0,
	  area: width+'px',
	  skin: 'layui-layer-nobg', //没有背景色
	  shadeClose: true,
	  content: '<img src='+ src +'>'
	});
}

/* 列表组件封装
 
 * 依赖服务：getList
 * 提交数据获取列表：getList.list(data, url, cb) data是提交数据对象，url是接口， cb是回调函数
 * 无提交数据获取列表：getList.noDatalist(data, url, cb) data是提交数据对象，url是接口， cb是回调函数
 * */
var getList = function(){};
getList.prototype = {
	list: function(data, url, cb){
		return  jQajax(data, url, cb);
	},
	noDatalist: function(url, cb){
		return  noDatajQajax(url, cb);
	}
}

/* 传参容器封装
 
 * 依赖服务：instance
 * */
function instance(){
	return {};
}

/* 弹窗的封装
 
 * layerService.getLayer(title, width, height, html, cb)  	打开弹窗,title是标题，width是宽度，height是高度，html是包含文件，cb是回调函数
 * layerService.close(layero) 		关闭弹窗，layero是弹窗的序号
 * */
var layerService = function(){};
layerService.prototype = {
	getLayer: function(title, width, height, html, cb, cb2){
		layer.open({
			type: 1,
			title: title,
			area: [width,height],
			resize: false,
			success: cb,
			end: cb2,
			content: '<div ng-include="'+ html +'"></div>'
		});
	},
	getLayerContent: function(title, width, height, html, cb){
		layer.open({
			type: 1,
			title: title,
			area: [width,height],
			resize: false,
			success: cb,
			content: html
		});
	},
	close: function(layero){
		$('#layui-layer-shade' + layero).remove();
		$('#layui-layer' + layero).remove();
	}
}

/* 分店组件
 
 * 多选: branchStore.multiselect($scope) 获取分店，全选、反选、单选，$scope是angular的内置对象
 * 获取提交数据：branchStore.getStore(obj) obj是数据节点
 * */

var branchStore = function(){};
branchStore.prototype = {
	//多选分店-所有分店
	multiselect: function($scope, arr, id){
		noDatajQajax(apiUrl+'team/ManagerStoreBranch', function(res){
			$scope.list = res.data;
			$scope.multiChecked = arr;
			if (arr.length == 0 && id) {
				$scope.multiChecked.push(id);
			}
			angular.forEach($scope.list, function (i) {
			    if(arr.indexOf(i.branchID) != -1){
					i.checked = true;
				}
			    if(id == i.branchID){
					i.disabled = true;
					i.checked = true;
				}
			});
			if($scope.list.length === $scope.multiChecked.length){
			    $scope.select_all = true;
			}else{
			    $scope.select_all = false;
			}
		    $scope.selectAll = function () {
		        if ($scope.select_all) {
		        	$scope.multiChecked = [];
		            angular.forEach($scope.list, function (i) {
		                i.checked = true;
		                $scope.multiChecked.push(i.branchID);
		            })
		        } else {
		        	$scope.multiChecked = [];
		            angular.forEach($scope.list, function (i) {
		                if(id == i.branchID){
		                	$scope.multiChecked.push(id);
							i.checked = true;
						}else{
							i.checked = false;
						}
		            })
		        }
		    };
		    $scope.selectOne = function () {
		        angular.forEach($scope.list , function (i) {
		            var index = $scope.multiChecked.indexOf(i.branchID);
		            if(i.checked && index === -1) {
		                $scope.multiChecked.push(i.branchID);
		            } else if (!i.checked && index != -1){
		                $scope.multiChecked.splice(index, 1);
		            };
		        })
		
		        if ($scope.list.length === $scope.multiChecked.length) {
		            $scope.select_all = true;
		        } else {
		            $scope.select_all = false;
		        }
		    }
		});
	},
	//获取店铺id数组
	getStore: function(obj){
		var branchIDArr = [];
		var branchID;
		var branchIDObj = $(obj);
		for(var i=0; i<branchIDObj.length; i++){
			branchID = branchIDObj[i].id;
			branchIDArr.push(branchID);
		}
		return branchIDArr;
	},
	//获取所有分店
	radioStoreAll: function($scope, id){
		noDatajQajax(apiUrl+'team/ManagerStoreBranchAll', function(res){
			$scope.branchID = id;
			$scope.storeList = res.data;
		});
	},
	//获取管理分店
	radioStore: function($scope, id){
		noDatajQajax(apiUrl+'team/ManagerStoreBranch', function(res){
			$scope.branchID = id;
			$scope.storeList = res.data;
		});
	},
	//获取职位
	radioRole: function($scope, id){
		noDatajQajax(apiUrl+'team/ManagerStorePosition', function(res){
			$scope.roleID = id;
			$scope.roleList = res.data;
		});
	},
	//获取省份
	province: function($scope, selfid){
		noDatajQajax(apiUrl+'order_manage/getProvince', function(res){
			$scope.provinceID = selfid;
			$scope.provinceList = res.data;
		});
	},
	//获取城市
	city: function($scope, selfid, pid){
		var postData = {id: pid}
		jQajax(postData, apiUrl+'order_manage/getCity', function(res){
			$scope.cityID = selfid;
			$scope.cityList = res.data;
		});
	},
	//获取县区
	county: function($scope, selfid, pid){
		var postData = {id: pid}
		jQajax(postData, apiUrl+'order_manage/getCounty', function(res){
			$scope.countyID = selfid;
			$scope.countyList = res.data;
		});
	},
	//获取部门
	department: function($scope, id){
		var postData = {state:1};
		jQajax(postData, apiUrl+'team/rightUserDepartment', function(res){
			$scope.department = id;
			$scope.departmentList = res.data;
			var postData = {departmentID: $scope.departmentId}
		});
	},
	//获取职位
	post: function($scope, selfid, pid){
		var postData = {departmentID: pid}
		jQajax(postData, apiUrl+'team/rightUserPost', function(res){
			if(res.data.length ===0){
				massage.error('该部门没有可选职位');
				$scope.postList = [];
				return false;
			}else{
				$scope.postId = res.data[0].id;
				$scope.post = selfid;
				$scope.postList = res.data;
			}
			
		});
	}
}


/* 时间插件自定义
 
 * 
 * */
var My97DatePicker = function(){};
My97DatePicker.prototype = {
	//精确到日
	wdatePicker: function(){
		return {
			restrict: "A",
			require: "ngModel",
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
						dateFmt: 'yyyy-MM-dd',
						maxDate:'%y-%M-%d'
					});
				});
	
			}
		}
	}
}

/* 权限控制

 * @param  {[type]} funid  		[某个用户所有的权限ID，数组]
 * @param  {[type]} isBoss  	[isBoss=true老板权限，isBoss=null普通权限]
 * @param  {[type]} id  		[权限ID]
 * */
function authority (funid, isBoss, id) {
	if (isBoss === true) {
		return true;
	}else{
		if (!funid) {
			return false;
		} else {
			if (funid.indexOf(id) !== -1) {
				return true;
			} else {
				return false;
			}
		}
	}
}

//权限控制
var jurService = function(){};
jurService.prototype = {
	//功能点屏蔽
	funShow: function($scope, funid, isBoss, id){
		if (isBoss === true) {
			$scope.funShow = true;
		}else{
			
			if (!funid) {
				return false;
			} else {
				if (funid.indexOf(id) != -1) {
					$scope.funShow = true;
				} else {
					$scope.funShow = false;
				}
			}
		}
	},
	//导航切换
	tab: function($scope, funid, isBoss, list){
		$scope.tabList1 = [];
		angular.forEach(list, function(data, index, array){
			if(isBoss == true){
				$scope.tabList1 = list;
				$scope.tab = array[0].tab;
			} else {
				if(funid.indexOf(data.funid) != -1){
					$scope.tabList1.push(data);
					angular.forEach($scope.tabList1, function(data, index, array){
						$scope.tab = array[0].tab;
					});
				}
			}
		});
		$scope.open = function(tab) {
			$scope.tab =  tab;
		};
	},
	//查看
	funShowCheck: function($scope, funid, isBoss, id){
		if(isBoss === true){
			$scope.funShowCheck = true;
		}else{
			if(funid.indexOf(id) != -1){
				$scope.funShowCheck = true;
			}else{
				$scope.funShowCheck = false;
			}
		}
	},
	//添加
	funShowAdd: function($scope, funid, isBoss, id){
		if(isBoss === true){
			$scope.funShowAdd = true;
		}else{
			if(funid.indexOf(id) != -1){
				$scope.funShowAdd = true;
			}else{
				$scope.funShowAdd = false;
			}
		}
	},
	//邀请
	funShowYq: function($scope, funid, isBoss, id){
		if(isBoss === true){
			$scope.funShowYq = true;
		}else{
			if(funid.indexOf(id) != -1){
				$scope.funShowYq = true;
			}else{
				$scope.funShowYq = false;
			}
		}
	},
	//编辑
	funShowEdit: function($scope, funid, isBoss, id){
		if(isBoss === true){
			$scope.funShowEdit = true;
		}else{
			if(funid.indexOf(id) != -1){
				$scope.funShowEdit = true;
			}else{
				$scope.funShowEdit = false;
			}
		}
	},
	//转移
	funShowZy: function($scope, funid, isBoss, id){
		if(isBoss === true){
			$scope.funShowZy = true;
		}else{
			if(funid.indexOf(id) != -1){
				$scope.funShowZy = true;
			}else{
				$scope.funShowZy = false;
			}
		}
	},
	//导出
	funShowDc: function($scope, funid, isBoss, id){
		if(isBoss === true){
			$scope.funShowDc = true;
		}else{
			if(funid.indexOf(id) != -1){
				$scope.funShowDc = true;
			}else{
				$scope.funShowDc = false;
			}
		}
	},
	//打款、退派工
	funShow1: function($scope, funid, isBoss, id){
		if(isBoss === true){
			$scope.funShow1 = true;
		}else{
			if(funid.indexOf(id) != -1){
				$scope.funShow1 = true;
			}else{
				$scope.funShow1 = false;
			}
		}
	}
}
