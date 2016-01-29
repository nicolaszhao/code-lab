/**
 * Created by zhangyu on 15/11/17.
 */

function stat(sPath, sXmlContent) {
    var fs = require('fs');
    var crypto = require('crypto');
    var oMatches = sXmlContent.match(/<Rule[\S\s]*?<\/Rule>/g) || [];
    console.log('Rules: ', oMatches.length);
    console.log('Size : ', (fs.statSync(sPath).size / 1024).toFixed(2) + 'kb');
    console.log('MD5  : ', crypto.createHash('md5').update(sXmlContent).digest('hex'));
    console.log('---------------- ' + new Date() + ' -------------------');
}

module.exports = {

    files: [
        {
            rules: {
                /*
                 CoreType:(注入核的类型) 取值范围：
                 0:IE核和Chrome核都注入；
                 1:只注入Chrome核；
                 2:只注入IE核
                 */
                CoreType : '0',

                /*
                 0:DocumentComplete;
                 1:CreateScriptContext (Chrome Only)
                 2:LinkClick
                 3:NavigateComplete
                 */
                CoreEvent: '0',

                /*
                 0 一直有效
                 或者使用格式 yyyy/mm/dd HH:MM:ss
                 */
                EndTime  : '0',

                //注入的域名
                Domain   : '*',

                /*
                 规则同domain
                 */
                Referer  : '*',

                //CCType:(脚本类型) 取值范围： 0:有返回值上报；1:不上报返回值
                CCType   : '1'
            },

            //如果没有指定template，则使用rules里的字段拼合
            template: '',

            //可以指定数组(代码路径,多个会合并)以及代码片段
            scripts: '',

            //原始xml文件
            originXml : '',

            //输出文件
            output: '',

            plugins: {

                /*
                 oRules 传入的规则，在这里可以修改
                 sCode  编译后的代码
                 beforeBuild : function(oRules, sCode){

                 },

                 sPath 输出的文件地址
                 sXmlContent 输出的文件内容
                 afterBuild : function(sPath, sXmlContent){

                 },
                 */

                afterBuild: stat
            }
        }
    ]
};