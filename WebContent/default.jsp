<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="refresh" content="1" />
<title>原生js实现ajax请求</title>
<script type="text/javascript" src="/ajax_demo/Scripts/common.js"></script>
<script type="text/javascript">
	window.onload = function() {
		var method = (new Date()).getSeconds() % 2 == 0 ? "GET" : "POST";
		ajax({
			async : true,
			contentType : "application/x-www-form-urlencoded",
			dataType : "text",
			type : method,
			url : "/ajax_demo/servlet/TestServlet",
			data : {
				"k" : "method",
				"v" : method
			},
			success : function(resp, status, xhr) {
				document.getElementById("result").innerHTML = resp;
				console.log(status);
				console.log(xhr.responseText);
			},
			error : function(xhr, status) {
				console.log(status);
				console.log(xhr.responseText);
			}
		});
	}
</script>
</head>
<body>
	<p>吹起我的芦笙，妹妹你唱一首，等到太阳落山，你就跟我走</p>
	<div id="result"></div>
</body>
</html>