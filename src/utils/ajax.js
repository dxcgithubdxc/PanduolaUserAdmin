
var AES = require("crypto-js/aes");
var HmacMD5 = require("crypto-js/hmac-md5");
var store = require('store');
export var APIhost='http://www.pdlwan.com:5000';
//export var APIhost=  'http://47.100.161.199:5000';
export function getAuth(url,username,password){
  if(!password&&!store.get("storeuser")){return null}
  var pass =  AES.encrypt(url+":"+new Date().getTime(), password? HmacMD5(password,password).toString() : store.get("storeuser").password);
  return "bearer "+(username? username : store.get("storeuser").username)+":"+pass+":admin";
}
export function cryptoPassword(pswd){
  return HmacMD5(pswd,pswd).toString();
}

//GET请求
// const userName=store.get("storeuser");
//         if(userName){
//             const content =this;
//             //联网获取userinfo
//             return fetch(`${programHost.APIhost}/user/info`, {
//             method: 'GET',
//             mode: 'cors',
//             credentials: 'include',
//             headers: new Headers({
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json;charset=UTF-8',
//                 'Authorization':programHost.getAuth('/user/info'),// 除登录之外，获取登录的token都不需要username和password
//             }),
//             }).then((response) => {
//             console.log(response);
//             response.json().then((res) => {
//                 console.log(res);
//                 if(res.statusCode===107){
//                     content.setState({userInfo:res.resource});
//                 }
//                 },(data) => {
//                 console.log(data)
//             });
//             });
//         }

//带加密的POST请求
// const{username,password}=this.state;
// const content =this;
// //联网
// return fetch(`${programHost.APIhost}/user/login`, {
//   method: 'GET',
//   // dataType: 'json',
//   mode: 'cors',
//   credentials: 'include',
//   headers: new Headers({
//       Accept: 'application/json',
//       'Content-Type': 'application/json;charset=UTF-8',
//       'Authorization':programHost.getAuth('/user/login',username,password),// 获取登录的token
//   }),
// }).then((response) => {
//   console.log(response);
//   response.json().then((res) => {
//       console.log(res);
//       if(res.statusCode===101){
//         store.set("storeuser",{username:username,password:programHost.cryptoPassword(password)});// 本地存username和加密后的password
//         content.emptyState();
//         message.success(res.message);
//       }else{
//         message.warn(res.message);
//       }
//     },(data) => {
//     console.log(data)
//   });
// });
//不带加密的POST请求
// const sbdata={};
// const content =this;
// //联网
// return fetch(`${programHost.APIhost}/xx/xx`, {
//   method: 'POST',
//   dataType: 'json',
//   body:SON.stringify(sbdata),
//   mode: 'cors',
//   credentials: 'include',
//   headers: new Headers({
//       Accept: 'application/json',
//       'Content-Type': 'application/json;charset=UTF-8',
//       'Authorization':programHost.getAuth('/xx/xx'),// 获取token
//   }),
// }).then((response) => {
//   console.log(response);
//   response.json().then((res) => {
//       console.log(res);
//     },(data) => {
//     console.log(data)
//   });
// });
// export function ajax(options) {
//                     options = options || {};
//                     options.type = (options.type || "GET").toUpperCase();
//                     options.dataType = options.dataType || "jsonp";
//                     var params = formatParams(options.data);
//                     var xhr;
//                     //创建 - 第一步
//                     if (window.XMLHttpRequest) {
//                       xhr = new XMLHttpRequest();
//                     } 
//                     //连接 和 发送 - 第二步
//                     if (options.type == "GET") {
//                       xhr.open("GET", options.url + "?" + params, true);
//                       xhr.send(null);
//                     } else if (options.type == "POST") {
//                       xhr.open("POST", options.url, true);
//                       //设置表单提交时的内容类型
//                       xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//                       xhr.send(params);
//                     }
//                      //接收 - 第三步
//                     xhr.onreadystatechange = function () {
//                       if (xhr.readyState == 4) {
//                         var status = xhr.status;
//                         if (status >= 200 && status < 300 || status == 304) {
//                           options.success && options.success(xhr.responseText, xhr.responseXML);
//                         } else {
//                           options.error && options.error(status);
//                         }
//                       }
//                     }
//                   }
//                   //格式化参数
//  export function  formatParams(data) {
//                     var arr = [];
//                     for (var name in data) {
//                       arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
//                     }
//                     arr.push(("v=" + Math.random()).replace("."));
//                     return arr.join("&");
//                   }


                  //模板调用函数
  // Ceshi22(){
  //   const content=this;
  //     reajax.ajax({
  //     url: "http://192.168.1.61:8080/phone/back",       //请求地址
  //     type: "POST",                            //请求方式
  //     data: {
  //     openid:"web" ,
  //     phoneType:content.state.phoneType,
  //     name:content.state.name,
  //     phone:content.state.mobile,
  //     remark:content.state.address,
  //      },    //请求参数
  //     // dataType: "json",
  //     dataType: 'jsonp',
  //      // jsonp:"callback",
  //     // jsonpCallback:"jsonpCallback_webOrderAdd",
  //     success: function (resStr) {        // 此处放成功后执行的代码
  //       var res=JSON.parse(resStr);
  //       console.log(res);
  //     },
  //     error: function (res) { // 此处放失败后执行的代码
  //       console.log(res);
  //     }
  //   });
  // }

    //fetch GTE请求
//   fetch(`${programHost.APIHost}`, {
//     method: 'GET',
//     dataType: 'json',
//     headers: new Headers({
//         Accept: 'application/json',
//         'Content-Type': 'text/plain;charset=UTF-8',
//     }),
// }).then((res) => {
//     res.json().then((data) => {
//        console.log(data)
//     });
// });

  //fetch POST请求
//   fetch(`${programHost.APIHost}`, {
//     method: 'POST',
//     dataType: 'json',
//     body: {},
//     headers: new Headers({
//         Accept: 'application/json',
//         'Content-Type': 'text/plain;charset=UTF-8',
//     }),
// }).then((res) => {
//     res.json().then((data) => {
//        console.log(data)
//     });
// });