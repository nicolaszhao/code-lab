/*!
 *
 * @author: lh_wang@ctrip.com
 * @time: 2015-10-01
 * @module: 工具类模块
 *
 */

var React = require('react-native');
var Dimensions = require('Dimensions');
var request_data = '{"request_body":"","access_token":"8631a092aec2004a818973aa80aea3fd"}';
//var request_data = '{"request_body":"","access_token":"8bc30122309086edd4c45e45fef75f54"}';

var CAT_HEADER = 'cat_app_ios_react_native';

var {
    PixelRatio,
    AlertIOS
    } = React;

var Util = {

  pixel: 1 / PixelRatio.get(), /*单位像素*/

  size: { /*屏幕尺寸*/
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
};



/**
 * XMLHttpRequest POST
 * @method fetch
 * @param {string} url 请求的URL
 * @param {function} callback 请求完成的callback
 * @return {null} 没有返回值
 */

Util.fetch = function(url, callback){
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open('POST', url);
  xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xmlHttp.setRequestHeader('CatAppHeader', CAT_HEADER);
  xmlHttp.send(request_data);

  xmlHttp.onreadystatechange = function(){
    if (xmlHttp.readyState === 4){
      if (xmlHttp.status === 200) {
        var text = xmlHttp.responseText;
        callback(JSON.parse(text));
      } else {
        alert('请重试');
      }
    }else{
      alert('服务异常');
    }
  };

};


/**
 * 基于fetch的POST方法
 * @method post
 * @param {string} url 基于global.CAT_APP.globalurl的参数串
 * @param {function} successCallback 成功的回调
 * @param {function} errCallback 失败的回调
 * @return {null} 没有返回值
 */

Util.post = function (url, successCallback, errCallback) {
  var data = request_data;

  var fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'CatAppHeader': CAT_HEADER,
      'Content-length': data.length
    },
      body: data
  };

  //TODO: 获取token后才能发送请求，否则告知用户“未登录” 或者 “跳转到登录页面“
  var wholeURL = global.CAT_APP.globalurl + url;
  fetch(wholeURL, fetchOptions)
      .then(
      (response) => response.text()
  )
      .then((responseText) => {
        successCallback(JSON.parse(responseText));
      })
      .catch(function(err){
        alert('服务无数据或者服务出错');
        errCallback(err);
      });
};




/**
 * 基于fetch的POST方法多个参数
 * @method post
 * @param {string} url 基于global.CAT_APP.globalurl的参数串
 * @param {Object} header 头部对象
 * @param {string} data post的json字符串
 * @param {function} successCallback 成功的回调
 * @param {function} errCallback 失败的回调
 * @return {null} 没有返回值
 */
Util.newPost = function (url, header ,data,successCallback, errCallback) {

  var fetchOptions = {
    method: 'POST',
    headers: header,
    body: data
  };

  var wholeURL = url;
  fetch(wholeURL, fetchOptions)
      .then((response) => response.text())
      .then((responseText) => {
        successCallback(JSON.parse(responseText));
      })
      .catch(function(err){
        //alert('服务无数据或者服务出错');
        alert(err);
        errCallback(err);
      });
};


/**
 * 基于fetch的POST方法核对Token
 * @method post
 * @param {string} token token参数串
 * @param {function} successCallback 成功的回调
 * @param {function} errCallback 失败的回调
 * @return {null} 没有返回值
 */
Util.checkToken = function (token,successCallback, errCallback) {

  var fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'CatAppHeader': CAT_HEADER
    },
    body: ""
  };

  var checkurl = global.CAT_APP.globalurl+"/checktoken?token="+token;
  fetch(checkurl, fetchOptions)
      .then((response) => response.text())
      .then((responseText) => {
        successCallback(responseText);
      })
      .catch(function(err){
        errCallback(err);
      });
};

Util.IsEmptyObj = function (obj) {
        for(var n in obj){
            return false;
        }
        return true;
};

module.exports = Util;