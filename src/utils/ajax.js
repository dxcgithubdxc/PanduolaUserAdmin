export var APIhost='https://www.baizhaowangluo.com/longkai';
//export var APIhost=  'http://192.168.1.61:9090';
export var QiniuAPIhost="http://papgbo0u0.bkt.clouddn.com";
export function ajax(options) {
	
                    options = options || {};
                    options.type = (options.type || "GET").toUpperCase();
                    options.dataType = options.dataType || "jsonp";
                    var params = formatParams(options.data);
                    var xhr;


                    //创建 - 第一步
                    if (window.XMLHttpRequest) {
                      xhr = new XMLHttpRequest();
                    } 


                    //连接 和 发送 - 第二步
                    if (options.type == "GET") {
                      xhr.open("GET", options.url + "?" + params, true);
                      xhr.send(null);
                    } else if (options.type == "POST") {
                      xhr.open("POST", options.url, true);
                      //设置表单提交时的内容类型
                      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                      xhr.send(params);
                    }


                     //接收 - 第三步
                    xhr.onreadystatechange = function () {
                      if (xhr.readyState == 4) {
                        var status = xhr.status;
                        if (status >= 200 && status < 300 || status == 304) {
                          options.success && options.success(xhr.responseText, xhr.responseXML);
                        } else {
                          options.error && options.error(status);
                        }
                      }
                    }
                  }


                  //格式化参数
 export function  formatParams(data) {
                    var arr = [];
                    for (var name in data) {
                      arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
                    }
                    arr.push(("v=" + Math.random()).replace("."));
                    return arr.join("&");
                  }