require('fetch-ie8');
var AES = require("crypto-js/aes");
var HmacMD5 = require("crypto-js/hmac-md5");
var store = require('store');
//export const APIHost ='http://192.168.2.183:1261';//毛二哥
//export const APIHost ='http://47.92.145.141:2810';//测试服务器
//export const APIHost ='http://43.242.33.247:8001';//测式2地址
export const APIHost ='http://43.242.33.239:8001';//正式服务器

export var defaultParams = {
  mode: 'cors',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
}


/**
 * HTTP GET
 * @param  {string} url
 * @return {Promise}
 */
export function read(url) {//不需要token的Get
  return fetch(url, {
    ...defaultParams,
    method: 'get'
  });
}

/**
 * HTTP POST
 * @param  {string} url
 * @param  {object} body
 * @return {Promise}
 */
export function create(url, body = {}) {//不需要token的Post
  return fetch(url, {
    ...defaultParams,
    method: 'post',
    body: JSON.stringify(body)
  });
}

/**
 * HTTP PUT
 * @param  {string} url
 * @param  {object} body
 * @return {Promise}
 */
export function update(url, body = {}) {
  return fetch(url, {
    ...defaultParams,
    method: 'put',
    body: JSON.stringify(body)
  });
}


/**
 * HTTP DELETE
 * @param  {string} url
 * @return {Promise}
 */
export function destroy(url) {
  return fetch(url, {
    ...defaultParams,
    method: 'delete'
  });
}

/************************************* token **********************************/
/**
 * HTTP GET
 * @param  {string} url
 * @param  {string} token
 * @return {Promise}
 */
export function read_Token(url,token) {//需要token的get请求
  defaultParams.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'authToken':token
  };
  return fetch(url, {
    ...defaultParams,
    method: 'get'
  });
}

export function create_Token(url,token,body={}){//需要token的post请求
  defaultParams.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'authToken':token
  };
  return fetch(url, {
    ...defaultParams,
    method: 'post',
    body: body 
  });
}

export function delete_Token(url,token) {//需要token的delete请求
  defaultParams.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'authToken':token
  };
  return fetch(url, {
    ...defaultParams,
    method: 'delete'
  });
}

export function update_Token(url,token,body={}) {//需要token的put请求
  defaultParams.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'authToken':token
  };
  return fetch(url, {
    ...defaultParams,
    method: 'put',
    body: body
  });
}


export function uploadImg_Token(url,body) {//上传图片资源
	defaultParams.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
 };
   return fetch(url, {
   	 ...defaultParams,
    method: 'post',
    body: body
  });

}


export function getAuth(url,username,password){//token加密
  var CryptoJs = require("crypto-js");
  if(!password&&!store.get("username")){return null}
  var iv = CryptoJs.enc.Latin1.parse('yuewan@2018');
  var key = CryptoJs.enc.Latin1.parse(password? HmacMD5(password,password).toString() : store.get("username").password);
  var pass = AES.encrypt(url+":"+new Date().getTime(),key,{iv:iv,mode:CryptoJs.mode.CBC,padding:CryptoJs.pad.ZeroPadding}).toString();
  return (username? username : store.get("username").username)+":"+pass;
}
