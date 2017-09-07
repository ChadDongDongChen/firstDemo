(function() {
	$(function() {
		/**
		 * 解析url获取code,发送请求获取openid
		 */
		var code = resolveUrl();
		/**
		 * 获取openID
		 */
		getopenid();
		function resolveUrl() {
			var parg = getUrlParams();
			return parg[0]['code'];
		};
		// 获取地址栏的参数数组
		function getUrlParams() {
			var search = window.location.search;
			// 写入数据字典
			var tmparray = search.substr(1, search.length).split("&");
			var paramsArray = new Array;
			if(tmparray != null) {
				for(var i = 0; i < tmparray.length; i++) {
					var reg = /[=|^==]/; // 用=进行拆分，但不包括== 
					var set1 = tmparray[i].replace(reg, '&');
					var tmpStr2 = set1.split('&');
					var array = new Array;
					array[tmpStr2[0]] = tmpStr2[1];
					paramsArray.push(array);
				};
			};
			// 将参数数组进行返回
			return paramsArray;
		};
		function getopenid() {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', config.Rurl + 'api/v1/weiXin/getOpenId/' + code, true);
			xhr.send();
			xhr.onreadystatechange = function() {
				if(xhr.status == 200 && xhr.readyState == 4) {
					var openid = JSON.parse(xhr.responseText).results.openid;
					location.href ="http://wx.daoyitong.com/payment.html?openid="+openid;
				}else{
					promptTips("请稍等...");
				}
			};
		};
	});
})();