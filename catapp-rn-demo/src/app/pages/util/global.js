
/*!
 *
 * @author: lh_wang@ctrip.com
 * @time: 2015-10-22
 * @module: 全局变量挂载模块
 *
 */

(function(global){
if(!global.CAT_APP) {
    global.CAT_APP = {
        server_url_setting: 'prd',
        server_token: "111111abcdef",
        isAdmin: true,
        user_name:"",
        //globalurl:"http://localhost:5006/catapp"
        //globalurl:"http://10.8.85.26:8080/catapp"
        //globalurl:"https://osg.ops.ctripcorp.com/api/17000/catapp"
        globalurl:"https://opsgateway.ctrip.com/api/13000/catapp"
    };
}
})(global);

