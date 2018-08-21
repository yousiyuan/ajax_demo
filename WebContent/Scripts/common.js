;
(function() {
	if (!String.prototype.trim) {
		//清除字符串两端空格
		String.prototype.trim = function() {
			return this.replace(/(^[\s]+|[\s]+$)/g, "");
		}
	}
	if (!String.prototype.trimln) {
		//清除字符串两端空格，包含换行符、制表符
		String.prototype.trimln = function() {
			return this.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "");
		}
	}
	if (!String.prototype.getBytesLength) {
		// 获取字节长度
		String.prototype.getBytesLength = function() {
			var totalLength = 0;
			var charCode;
			for (var i = 0; i < this.length; i++) {
				charCode = this.charCodeAt(i);
				if (charCode < 0x007f) {
					totalLength++;
				} else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
					totalLength += 2;
				} else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
					totalLength += 3;
				} else {
					totalLength += 4;
				}
			}
			return totalLength;
		}
	}
})();

// 是否为空
function isEmptyOrWhiteSpace(val) {
	if (val == null || val == undefined || val.trim() == "") {
		return true;
	}
	return false;
}

// 获取表单值
function getInputValue(name) {
	var elements = document.getElementsByName(name);
	var value = "";
	for (var i = 0; i < elements.length; i++) {
		var node = elements[i];
		if ((node.type == "radio" || node.type == "checkbox") && !node.checked) {
			continue;
		}
		if (i == elements.length - 1) {
			value += node.value;
			break;
		} else {
			value += node.value + ",";
		}
	}
	return value;
}

// jQuery的Ajax请求
ajaxRequest = function(_httpUrl, _params, _callback) {
	$.ajax({
		cache : false,
		async : false,
		type : "GET",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		url : _httpUrl,
		data : _params,
		dataType : "json",
		beforeSend : function(xhr) {
			// 在发送请求之前，执行这里的代码
		},
		success : _callback, // function (result, status, xhr) { },
		complete : function(xhr, status) {
			// 请求完成时运行的函数
			// 在请求成功或失败之后均调用，即在 success 和 error 函数之后
		},
		error : function(xhr, status, error) {
			// 如果请求失败要运行的函数。
			if (typeof (xhr.responseText) != "undefined")
				alert(xhr.status + ":" + xhr.statusText);
			else
				alert(error.message);
		}
	});
};

/*
 * 原生js的ajax请求
 * 
 * 1.创建XMLHTTPRequest对象 
 * 2.使用open方法设置和服务器的交互信息
 * 3.设置发送的数据，开始和服务器端交互
 * 4.注册事件
 * 5.更新界面
 * 
 */

function createxmlHttpRequest() {
	var xhr = null;
	if (window.ActiveXObject) {
		var arrXHR = [ 'Microsoft.XMLHTTP', 'MSXML2.XMLHTTP.6.0',
				'MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0',
				'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP' ];
		var temp = arrXHR.length;
		for (var i = 0; i < temp; i++) {
			try {
				xhr = new ActiveXObject(arrXHR[i]);
				break;
			} catch (ex) {
			}
		}
	} else if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	}
	return xhr;
}

function convertData(data) {
	if (typeof data === 'object') {
		var convertResult = "";
		for ( var c in data) {
			convertResult += c + "=" + data[c] + "&";
		}
		convertResult = convertResult.substring(0, convertResult.length - 1)
		return convertResult;
	} else {
		return data;
	}
}

function ajax() {
	var ajaxData = {
		type : arguments[0].type,
		url : arguments[0].url,
		async : arguments[0].async,
		data : arguments[0].data,
		dataType : arguments[0].dataType,
		contentType : arguments[0].contentType,
		beforeSend : arguments[0].beforeSend || function() {
		},
		success : arguments[0].success || function() {
		},
		error : arguments[0].error || function() {
		}
	}
	ajaxData.beforeSend();
	// 步骤一:创建异步对象
	var xhr = createxmlHttpRequest();
	if (ajaxData.type == "GET") {
		// 步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,传递参数到服务端
		if (ajaxData.data) {
			xhr.open(ajaxData.type, ajaxData.url + "?"
					+ convertData(ajaxData.data) + "&t=" + Math.random(),
					ajaxData.async);
		} else {
			xhr.open(ajaxData.type, ajaxData.url + "?t=" + Math.random(),
					ajaxData.async);
		}
		xhr.responseType = ajaxData.dataType;
		// 步骤三:发送请求
		xhr.send();
	} else if (ajaxData.type == "POST") {
		// 步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,传递参数到服务端
		xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
		xhr.responseType = ajaxData.dataType;
		xhr.setRequestHeader("Content-Type", ajaxData.contentType);
		// 步骤三:发送请求
		xhr.send(convertData(ajaxData.data));
	}
	// 步骤四:注册事件 onreadystatechange 状态改变就会调用
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200 || xhr.status == 0) {
				ajaxData.success(xhr.response, xhr.status, xhr);
			} else {
				ajaxData.error(xhr, xhr.status);
			}
		}
	}
}
