/**
 * Created by zhangyu on 15/6/21.
 */
var fs = require('fs');
var file = {

    cp: function (sSrcPath, sDistPath) {
        // 创建读取流
        var readable = fs.createReadStream(sSrcPath);
        // 创建写入流
        var writable = fs.createWriteStream(sDistPath);
        // 通过管道来传输流
        readable.pipe(writable);
    },

    readJSON: function (sPath) {
        var bExist = file.exist(sPath);
        var oRet = null;
        if (bExist) {
            oRet = JSON.parse(file.read(sPath));
        }
        return oRet;
    },

    writeJSON: function (sPath, oContent) {
        file.write(sPath, JSON.stringify(oContent));
    },

    read: function (sPath) {
        return fs.readFileSync(sPath, 'utf-8');
    },

    write: function (sPath, sContent) {
        var aPath = sPath.replace(/\/?[^\/]+$/, '').split(/\//);
        var sLastDir = '';
        aPath.forEach(function (sItem) {
            if (!sLastDir) {
                sLastDir = sItem || '/';
            } else {
                sLastDir += '/' + sItem;
            }
            if (sLastDir && !fs.existsSync(sLastDir)) {
                fs.mkdirSync(sLastDir);
            }
        });
        fs.writeFileSync(sPath, sContent);
    },

    exist: function (sPath) {
        return fs.existsSync(sPath);
    }
};

module.exports = file;
