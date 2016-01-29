/**
 * Created by zhangyu on 15/11/17.
 */

var program = require('commander');
var util = require('util');
var helper = require('./libs/utils');
var uglifyjs = require('uglify-js');
var dateFormat = require('./libs/dateFormat');
var file = require('./libs/file');
var path = require('path');
var sDefaultXmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n<Rules Version="1.0"></Rules>';

(function () {

    program
        .usage('[options] -f <file ...>')
        .description('generate inject config xml files for BaiduBrowser6.5/BaiduBrowser7.x/BaiduBrowser8.1+/BaiduClient')
        .version('2.0.0')
        .option('-o, --optimize', 'optimize javascript')
        .option('-r, --root <path>', 'config file root directory', '')
        .option('-f, --config <path>', 'config file')
        .option('-v, --verbose', 'output progress verboses')
        .option('-i, --init', 'generate default config file')
        .parse(process.argv)

    if (!process.argv.slice(2).length) {
        program.outputHelp();
        return;
    }

    var verbose = program.verbose ? function(){
        console.log.apply(this,arguments);
    } : function(){ };

    var replacer = function (sStr, oData) {
        return sStr.replace(/\{@(\w+)\}/g, function ($all, $1) {
            return oData[$1] === 0 ? 0 : (oData[$1] || '');
        });
    };

    var gdetFormatTime = function(oTime){
        if(oTime != '0' && typeof oTime === 'date'){
            return dateFormat(oTime, 'yyyymmddHHMMss');
        }
        return oTime || '';
    };

    var sRoot = path.resolve(process.cwd(), program.root);

    verbose('Root path: ', sRoot);

    if(program.init){
        file.cp(path.resolve(__dirname, './default-conf.js'), path.resolve(sRoot, './fml-conf.js'));
        console.log('Generate fml-conf.js success.');
        return;
    }

    var sConfigPath = path.resolve(sRoot, program.config || './fml-conf.js');

    verbose('Config path: ', sRoot);

    var oConfig = require(sConfigPath);

    var files = oConfig.files || [];

    var fBuildCode = function(oPaths){
        var sRet = '';
        if(typeof oPaths === 'string'){
            sRet = oPaths;
        }else{
            oPaths.forEach(function(sPath, nIndex){
                sRet += file.read(path.resolve(sRoot, sPath));
            });
        }
        sRet = helper.inline(sRet, sRoot);
        sRet = helper.toAscii(sRet);

        if(program.optimize){
            sRet = uglifyjs.minify(sRet, {
                mangle: true,
                fromString : true,
                output: {
                    ascii_only: true
                }
            }).code;
        }
        return sRet;
    };

    files.forEach(function(oItem, nIndex){

        var sCode = fBuildCode(oItem.scripts);

        var plugins = oItem.plugins || {};
        var oRules = Object.create(oItem.rules);

        oRules.StartTime = getFormatTime(oRules.StartTime);
        oRules.EndTime = getFormatTime(oRules.EndTime);

        if(plugins.beforeBuild){
            sCode = plugins.beforeBuild(oRules, sCode);
        }

        var sSection = '';
        var sFlag = [];
        var sTemplatePath = '';

        if(oItem.template){
            oRules.Code = sCode;
            sTemplatePath = path.resolve(sRoot,oItem.template);

            verbose('Template path: ', sTemplatePath);

            sSection = file.read(sTemplatePath);
            sSection = replacer(sSection,oRules);

        }else{
            verbose('No template, use rules');
            sFlag.push('<Rule ');
            for(var p in oRules){
                sFlag.push(
                    p + '="' + oRules[p] + '" '
                );
            }
            sFlag.push('>\n');
            sFlag.push('<![CDATA[\n');
            sFlag.push(sCode);
            sFlag.push('\n]]>\n');
            sFlag.push('</Rule>');
            sSection = sFlag.join('');
        }

        var sXmlContent = sDefaultXmlContent;

        var sOriginXmlPath = '';
        if(oItem.originXml){
            sOriginXmlPath = path.resolve(sRoot, oItem.originXml);
            verbose('Origin xml path: ', sOriginXmlPath);
            sXmlContent = file.read(sOriginXmlPath);
        }
        sXmlContent = sXmlContent.replace(/<\/Rules>/, sSection + '\r\n$&');

        var sOutputFile;

        if(oItem.output){
            sOutputFile = path.resolve(sRoot, oItem.output);
            verbose('Output path: ', sOutputFile);
            file.write(sOutputFile, sXmlContent);
            console.log('Build complete: ', sOutputFile);
            if(plugins.afterBuild){
                plugins.afterBuild(sOutputFile, sXmlContent);
            }
        }else{
            console.log('Build complete, but no output');
        }
    });

}());
