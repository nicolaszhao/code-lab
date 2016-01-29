
/**
 * Created by zhangyu on 15/6/21.
 */

var file = require('./file');

var fs = require('fs');

function toBase64(sSrc) {

    if(!file.exist(sSrc)){
        return '';
    }

    var sData = fs.readFileSync(sSrc).toString('base64');
    var sType = sSrc.match(/[^.]+$/);
    return 'data:image/' + sType + ';base64,' + sData;
};


function toAscii(str, identifier) {
    return str.replace(/[\u0080-\uffff]/g, function(ch) {
        var code = ch.charCodeAt(0).toString(16);
        if (code.length <= 2 && !identifier) {
            while (code.length < 2) code = "0" + code;
            return "\\x" + code;
        } else {
            while (code.length < 4) code = "0" + code;
            return "\\u" + code;
        }
    });
};

var QUOTE = '"';

//todo 没有处理字符串内的，这里处理方式比较简略，凑合用就得
function inline(sCode, sPathPrefix){
    sCode = sCode.replace(/\b__inline\((?:"([^"]+)"|'([^']+)')\)/g,function($match, $1, $2){
        var sSrc = $1 || $2;
        var sRet = $match;
        var sRealPath = sPathPrefix + sSrc;
        if(sSrc){
            if(file.exist(sRealPath)){
                if(/\.(?:png|jpe?g|gif|bmp)$/.test(sRealPath)){
                    sRet = QUOTE+ toBase64(sRealPath) + QUOTE;
                }else{
                    sRet = QUOTE+ file.read(sRealPath).replace(/(\r)?\n/g,'$1\\n') + QUOTE;
                }
            }
        }
        return sRet;
    });
    return sCode;
}


module.exports = {
    toBase64:toBase64,
    toAscii : toAscii,
    inline : inline
}
