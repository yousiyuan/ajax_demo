(function() {
	// ...
})();

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
	var xhr = createxmlHttpRequest();
	xhr.responseType = ajaxData.dataType;
	if (ajaxData.type == "GET") {
		if (ajaxData.data) {
			xhr.open(ajaxData.type, ajaxData.url + "?"
					+ convertData(ajaxData.data), ajaxData.async);
		} else {
			xhr.open(ajaxData.type, ajaxData.url + "?t=" + Math.random(),
					ajaxData.async);
		}
		xhr.send();
	} else if (ajaxData.type == "POST") {
		xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
		xhr.setRequestHeader("Content-Type", ajaxData.contentType);
		xhr.send(convertData(ajaxData.data));
	}
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