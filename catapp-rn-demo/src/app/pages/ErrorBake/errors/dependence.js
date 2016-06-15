/**
 * Created by mikejay on 15/9/17.
 */
var React = require('react-native');
var actualdata = require('./actualdata');
var Loading = require('./../../util/loading');
var Util =require('./../../util/util');
import Header from '../../../components/Header';

var {
    StyleSheet,
    Text,
    AppRegistry,
    View,
    WebView,
    PickerIOS,
    ScrollView,
    StatusBar,
    NavigatorIOS,
    PixelRatio,
    Dimensions,
    TouchableHighlight,
    ListView,
    Animated,
    AnimatedValue,
    LayoutAnimation,
    TouchableOpacity
    } = React;
var pt = Util.pixel;

var SCREE_WIDTH = Util.size.width;
var SCREE_HEIGHT = Util.size.height;
var rowheight = SCREE_HEIGHT / 18;
var foldheight = 20;
var headerheight = 40;
var lineheight = 1;
var xqheight = (SCREE_HEIGHT / 18) * 4;
var marginheight = 16;
var xqheadheight = 35;
var scrollviewheight = SCREE_HEIGHT - headerheight - rowheight * 2;

//var baseurl = "http://cat.fws.qa.nt.ctripcorp.com/cat/m?";
//var baseurl = "http://cat.fws.qa.nt.ctripcorp.com/cat/m?";
//var baseurl = "";
//var yilaiheight =(SCREE_HEIGHT -1-  SCREE_HEIGHT/11-(SCREE_HEIGHT/18)*4-63)/2;

var Dependence = React.createClass({
    xiangqingisfold: false,
    yilaifold: false,
    beiyilaifold: false,
    xqcontentmerge: {},
    yilaicontentmerge: {},
    beiyilaicontentmerge: {},
    errorstyle: [],
    ratestyle: [],
    pagedata: {},
    animations: {
        layout: {
            spring: {
                duration: 750,
                create: {
                    duration: 300,
                    type: LayoutAnimation.Types.easeInEaseOut,
                    property: LayoutAnimation.Properties.opacity,
                },
                update: {
                    type: LayoutAnimation.Types.spring,
                    springDamping: 400
                }
            },
            easeInEaseOut: {
                duration: 300,
                create: {
                    type: LayoutAnimation.Types.easeInEaseOut,
                    property: LayoutAnimation.Properties.scaleXY,
                },
                update: {
                    delay: 100,
                    type: LayoutAnimation.Types.easeInEaseOut,
                }
            }
        }
    },
    changeStyle: function (errnum, rate) {
        this.errorstyle = [];

        if (parseInt(errnum) >= 500 && parseInt(errnum) < 1000) {
            this.errorstyle = [styles.yellow];
        } else if (parseInt(errnum) >= 1000) {
            this.errorstyle = [styles.red];
        }

        if (rate < 0) {
            this.ratestyle = [styles.green];
        } else if (rate > 0) {
            this.ratestyle = [styles.red];
        } else if (rate == 0) {
            this.ratestyle = [];
        }
    },
    parseHtml: function (html) {
        var styleM1 = "", allcontent = "", colorset = "", tpcn = [], frontstring = "", afterstring = "", tpstrunct = "";
        var content = "";
        var sexp = /([\w\W]*)(<span ([\w\W]*)color:([\w\W]*)\'([\w\W]*)>([\w\W]*)<\/span>)([\w\W]*)/;
        if (sexp.test(html)) {
            frontstring = RegExp.$1;
            afterstring = RegExp.$7;
            allcontent = RegExp.$2;
            colorset = RegExp.$4;
            content = RegExp.$6;
            if (sexp.test(frontstring)) {
                tpstrunct = this.parseHtml(frontstring);
            } else {
                tpstrunct = frontstring;
            }
            tpcn.push(<Text>{tpstrunct}
                <Text style={{color: colorset}}>{content}</Text>{afterstring}</Text>);
        }
        else {
            tpcn.push(<Text>{html}</Text>);
        }
        return tpcn;
    },
    contentparse: function (jsonobj) {
        var tpcont = [], tpbylcont = [], tpcount = 0, tpbylcount = 0, isfold = false, isbylfold = false;
        if(jsonobj.dependence) {
            for (var i in jsonobj.dependence) {
                if (jsonobj.dependence[i].edgeOpposite == false) {
                    if (isfold == true) {
                        continue;
                    }
                    tpcont.push(<Text numberOfLines={1} onPress={this.getLinkResult.bind(this, i)}  style={styles.gxtitle}> {jsonobj.dependence[i].des.details.title}</Text>);
                    tpcount++;
                    for (var j = 0; j < jsonobj.dependence[i].des.details.details.length; j++) {
                        tpcont.push(<Text numberOfLines={2} style={styles.gxdesc}>
                            <Text style={{letterSpacing: 5}} >●</Text>{this.parseHtml(jsonobj.dependence[i].des.details.details[j])}</Text>);
                        tpcount++;
                        if (tpcount > 8) {
                            break;
                        }
                    }
                    if (tpcount > 8) {
                        isfold = true;
                        tpcont.push(
                            <View style={{flex: 1, marginTop: 5}}>
                                <TouchableOpacity onPress={this.ylchanged.bind(this, "expand")} style={styles.morestyle}>
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={styles.moretext} >查看更多</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    }
                } else {

                    if (isbylfold == true) {
                        continue;
                    }
                    tpbylcont.push(<Text numberOfLines={1} onPress={this.getLinkResult.bind(this, i)}  style={styles.gxtitle}> {jsonobj.dependence[i].des.details.title}</Text>);
                    tpbylcount++;
                    for (var j = 0; j < jsonobj.dependence[i].des.details.details.length; j++) {
                        tpbylcont.push(<Text numberOfLines={2} style={styles.gxdesc}>
                            <Text style={{letterSpacing: 5}} >●</Text>{this.parseHtml(jsonobj.dependence[i].des.details.details[j])}</Text>);
                        tpbylcount++;
                        if (tpbylcount > 8) {
                            break;
                        }
                    }
                    if (tpbylcount > 8) {
                        isbylfold = true;
                        tpbylcont.push(
                            <View style={{flex: 1, marginTop: 5}}>
                                <TouchableOpacity onPress={this.bylchanged.bind(this, "expand")} style={styles.morestyle}>
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={styles.moretext} >查看更多</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    }

                }
            }
        }
        if (tpcount == 0) {
            tpcont.push(<View style={{alignItems: "center", justifyContent: "center"}}>
                <Text style={styles.nonetext}>{"无依赖服务"}</Text>
            </View>);
        }
        if (tpbylcount == 0) {
            tpbylcont.push(<View style={{alignItems: "center", justifyContent: "center"}}>
                <Text style={styles.nonetext}>{"无被依赖服务"}</Text>
            </View>);
        }
        return [<View style={{flex: 1}}>
            <View style={{height: 10, flex: 1, backgroundColor: "#EBEBEB"}}></View>
            <View style={{flex: 1, overflow: 'hidden', backgroundColor: "#FFF"}}>
                <TouchableHighlight style={{
                    flex: 1,
                    borderBottomWidth: pt,
                    borderBottomColor: "#ddd"
                }}  onPress={this.changetab.bind(this, {action: 'fold', name: "yl"})} underlayColor={"#ddd"} >
                    <View style={{flexDirection: "row", height: xqheadheight, flex: 1}} >
                        <View style ={{
                            flex: 14,
                            flexDirection: "row",
                            alignItems: "center",
                            alignContent: "center",
                            marginLeft: 8
                        }}>
                            <View style={styles.titleicon}></View>
                            <Text style={{
                                color: "#000",
                                fontSize: 18,
                                fontWeight: "800",
                                alignContent: "center",
                                justifyContent: 'center'
                            }}>依赖服务</Text>
                        </View>
                        <View style ={{flex: 1}}>
                            <Text style={{
                                color: "#000",
                                lineHeight: 26,
                                fontSize: 18,
                                fontWeight: "400",
                                alignContent: "center",
                                justifyContent: 'center'
                            }}>-</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={{flex: 8}}>
                {tpcont}
                {isfold ? null : <View style={{height: 10}}></View>}
                </View>
            </View>
        </View>,
            <View style={{flex: 1}}>
                <View style={{height: 10, flex: 1, backgroundColor: "#EBEBEB"}}></View>
                <View style={{flex: 1, overflow: 'hidden', backgroundColor: "#FFF"}}>
                    <TouchableHighlight style={{
                        flex: 1,
                        borderBottomWidth: pt,
                        borderBottomColor: "#ddd"
                    }}  onPress={this.changetab.bind(this, {action: 'fold', name: "byl"})} underlayColor={"#ddd"} >
                        <View style={{flexDirection: "row", height: xqheadheight, flex: 1}} >
                            <View style ={{
                                flex: 14,
                                flexDirection: "row",
                                alignItems: "center",
                                alignContent: "center",
                                marginLeft: 8
                            }}>
                                <View style={styles.titleicon}></View>
                                <Text style={{
                                    color: "#000",
                                    fontSize: 18,
                                    fontWeight: "800",
                                    alignContent: "center",
                                    justifyContent: 'center'
                                }}>被依赖服务</Text>
                            </View>
                            <View style ={{flex: 1}}>
                                <Text style={{
                                    color: "#000",
                                    lineHeight: 26,
                                    fontSize: 18,
                                    fontWeight: "400",
                                    alignContent: "center",
                                    justifyContent: 'center'
                                }}>-</Text>
                            </View>
                        </View>

                    </TouchableHighlight>
                    <View style={{flex: 8}}>
                {tpbylcont}
                {isbylfold ? null : <View style={{height: 10}}></View>}
                    </View>
                </View>
            </View>
        ];
    },
    xqcontentparse: function (jsonobj) {
        var tpcount = 0, tpcont = [], isxqfold = false;
        if(jsonobj&&jsonobj.des&&jsonobj.des.errors&&jsonobj.des.errors.errors){
            for (var j = 0; j < jsonobj.des.errors.errors.length; j++) {
                tpcont.push(<Text numberOfLines={2} style={styles.gxdesc}>
                    <Text style={{letterSpacing: 5}} >●</Text>
                    <Text >{  jsonobj.des.errors.errors[j]}</Text>
                </Text>);
                tpcount++;
                if (tpcount > 2) {
                    isxqfold = true;
                    tpcont.push(<View style={{flex: 1, marginTop: 5}}>
                        <TouchableOpacity onPress={this.xqchanged.bind(this, "expand")} style={styles.morestyle}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={styles.moretext} >查看更多</Text>
                            </View>
                        </TouchableOpacity>
                    </View>);
                    break;
                }
            }
        }
        if (tpcount == 0) {
            tpcont.push(<View style={{alignItems: "center", justifyContent: "center"}}>
                <Text style={styles.nonetext}>{"无错误汇总"}</Text>
            </View>);
        }

        return <View style={{flex: 1, borderWidth: pt, borderColor: '#EBEBEB'}}>
            <View style={{height: 10, flex: 1, backgroundColor: "#EBEBEB"}}></View>
            <View style={{overflow: 'hidden', backgroundColor: "#FFF"}}>
                <TouchableHighlight style={{
                    borderBottomWidth: pt,
                    borderBottomColor: "#ddd"
                }}  onPress={this.changetab.bind(this, {action: 'fold', name: "xq"})} underlayColor={"#ddd"} >
                    <View style={{flexDirection: "row", height: xqheadheight, flex: 1}} >
                        <View style ={{
                            flex: 14,
                            flexDirection: "row",
                            alignItems: "center",
                            alignContent: "center",
                            marginLeft: 8
                        }}>
                            <View style={styles.titleicon}></View>
                            <Text style={{
                                color: "#000",
                                fontSize: 18,
                                fontWeight: "800",
                                alignContent: "center",
                                justifyContent: 'center'
                            }}>错误汇总</Text>
                        </View>
                        <View style ={{flex: 1}}>
                            <Text style={{
                                color: "#000",
                                lineHeight: 26,
                                fontSize: 18,
                                fontWeight: "400",
                                alignContent: "center",
                                justifyContent: 'center'
                            }}>-</Text>
                        </View>
                    </View>

                </TouchableHighlight>
                <View style={[{}]}>
                    <Text style={styles.title}>{jsonobj.domainName}</Text>

                    <View >

            {tpcont}
            {isxqfold ? null : <View style={{height: 10}}></View>}
                    </View>
                </View>
            </View>
        </View>
    },

    componentDidMount: function () {
        //op=dependency&domain=100001744&date=2015092310&minute=6
        var tpdate = this.state.Date.replace(/-/g, "") + this.state.Time.substring(0, this.state.Time.indexOf(":"));
        var tpmin = this.state.Time.substring(this.state.Time.indexOf(":") + 1);
        var url =  "/getDependency?op=dependency&domain=" + this.state.AppID + "&env=" + global.CAT_APP.server_url_setting+"&date=" + tpdate + "&minute=" + tpmin+"&token="+global.CAT_APP.server_token;
        var self=this;
        Util.post(url,function(responseText){
            self.pagedata = responseText;
            var tpobj=responseText;
            var tpcontent = self.contentparse(tpobj);
            var tpxqcontent = self.xqcontentparse(tpobj);
            self.yilaicontentmerge = tpcontent[0];
            self.beiyilaicontentmerge = tpcontent[1];
            self.xqcontentmerge = tpxqcontent;
            self.setState({
                isLoading: false,
                yilaicontent: [tpcontent[0]],
                beiyilaicontent: [tpcontent[1]],
                xqcontent: [tpxqcontent],
                errNumStyle: [self.errorstyle],
                rateStyle: [self.ratestyle]
            });
        },function(error){
            console.log('request failed', error);
            self.setState({
                isLoading: false,
                yilaicontent: [<View>
                    <Text>{"网络错误" + error.message}</Text>
                </View>]
            });
        });
    },

    getInitialState: function () {
        this.props.data = actualdata;
        //domain=730304&date=2015092314&minute=14
        var rate = "";
        if(this.props.RoundRate!="--"){

            var tpratepercent = Math.round( this.props.RoundRate * 10000)/100;
            if (tpratepercent > 0) {
                tpratepercent+="";
                rate = "+" + tpratepercent.substring(0,tpratepercent.indexOf(".")+3) ;
            } else {
                tpratepercent+="";
                rate =  tpratepercent.substring(0,tpratepercent.indexOf(".")+3);
            }

        } else {rate="--"}
        var tpid = this.props.AppID || '730304';
        var tperrnum = this.props.ErrCount || '706';
        var tprate = rate ;
        var tpdate = this.props.date || "2015-09-23";
        var tptime = this.props.time || "15:25";
        this.changeStyle(tperrnum, tprate);

        return {
            isLoading: true,
            xiangqingheight: xqheight,
            xqcontent: [],
            yilaicontent: [],
            beiyilaicontent: [],
            Date: tpdate,
            Time: tptime,
            AppID: tpid,
            ErrCount: tperrnum,
            RoundRate: tprate,
            errNumStyle: [],
            rateStyle: [],
            marginylTop: 0,
            marginylBottom: 0,
            marginbylTop: 0,
            marginbylBottom: 0
        }
    },
    getLinkResult: function (id) {
        //http://cat.fws.qa.nt.ctripcorp.com/cat/m?domain=140417&date=2015092315&minute=25&hourMinute=15:25
        this.setState({
            isLoading: true
        });
        var isdone = false;
        var tpdate = this.state.Date.replace(/-/g, "") + this.state.Time.substring(0, this.state.Time.indexOf(":"));
        var tpmin = this.state.Time.substring(this.state.Time.indexOf(":") + 1);
        var url =  "/getErrorsByDomain?domain=" + id + "&env=" + global.CAT_APP.server_url_setting+"&date=" + tpdate + "&minute=" + tpmin + "&hourMinute=" + this.state.Time+"&token="+global.CAT_APP.server_token;
        console.log(url);
        var self =this;
        Util.post(url, function (responseText) {
            var tpobj = responseText;
            //if(tpobj&&tpobj.status&&tpobj.status=="3"){
            //    self.setState({isLoading:false});
            //    self.props.navigator.immediatelyResetRouteStack([]);
            //    self.props.homenav.immediatelyResetRouteStack([{ id: 'login' }]);
            //    return;
            //}
            self.changeStyle(tpobj.errNum, tpobj.sequential);
            var rate = "";
            var tpratepercent = tpobj.sequential * 100;
            if (tpratepercent > 0) {
                rate = "+" + tpratepercent;
            } else {
                rate = tpratepercent;
            }
            //{"errNum":0,"sequential":"0.00","time":"15:21","domain":"150123","domainName":"Restful机票无线服务"}
            self.setState({
                isLoading: isdone ? false : true,
                AppID: tpobj.domain,
                ErrCount: tpobj.errNum,
                RoundRate: rate,
                errNumStyle: [self.errorstyle],
                rateStyle: [self.ratestyle]
            });
            isdone = true;
        },function(error){
            console.log('request failed', error);
            isdone = true;
        });

        var infourl =   "/getDependency?op=dependency&domain=" + id + "&env=" + global.CAT_APP.server_url_setting+"&date=" + tpdate + "&minute=" + tpmin+"&token="+global.CAT_APP.server_token;

        Util.post(infourl, function (responseText) {
            var tpobj = responseText;
            //if(tpobj&&tpobj.status&&tpobj.status=="3"){
            //    self.setState({isLoading:false});
            //    self.props.navigator.immediatelyResetRouteStack([]);
            //    self.props.homenav.immediatelyResetRouteStack([{ id: 'login' }]);
            //    return;
            //}
            self.pagedata = tpobj;
            var tpcontent = self.contentparse(tpobj);
            var tpxqcontent = self.xqcontentparse(tpobj);
            self.yilaicontentmerge = tpcontent[0];
            self.beiyilaicontentmerge = tpcontent[1];
            self.xqcontentmerge = tpxqcontent;
            self.setState({
                isLoading: isdone ? false : true,
                yilaicontent: [tpcontent[0]],
                beiyilaicontent: [tpcontent[1]],
                xqcontent: [tpxqcontent],
                errNumStyle: [self.errorstyle],
                rateStyle: [self.ratestyle]
            });
            isdone = true;
        },function(error){
            console.log('request failed', error);
            self.setState({
                isLoading: false,
                yilaicontent: [<View>
                    <Text>{"网络错误" + error.message}</Text>
                </View>]
            });
            isdone = true;
        });
        //
        //fetch(url)
        //    .then((response) => response.text())
        //    .then((responseText) => {
        //
        //        console.log(responseText);
        //        var tpobj = JSON.parse(responseText);
        //        this.changeStyle(tpobj.errNum, tpobj.sequential);
        //        var rate = "";
        //        var tpratepercent = tpobj.sequential * 100;
        //        if (tpratepercent > 0) {
        //            rate = "+" + tpratepercent;
        //        } else {
        //            rate = tpratepercent;
        //        }
        //        //{"errNum":0,"sequential":"0.00","time":"15:21","domain":"150123","domainName":"Restful机票无线服务"}
        //        this.setState({
        //            isLoading: isdone ? false : true,
        //            AppID: tpobj.domain,
        //            ErrCount: tpobj.errNum,
        //            RoundRate: rate,
        //            errNumStyle: [this.errorstyle],
        //            rateStyle: [this.ratestyle]
        //        });
        //        isdone = true;
        //    })
        //    .catch(function (error) {
        //        console.log('request failed', error);
        //        isdone = true;
        //    });
        //
        //var infourl = baseurl + "op=dependency&domain=" + id + "&date=" + tpdate + "&minute=" + tpmin;
        //fetch(infourl)
        //    .then((response) => response.text())
        //    .then((responseText) => {
        //        console.log(responseText);
        //        var tpobj = JSON.parse(responseText);
        //        this.pagedata = tpobj;
        //        var tpcontent = this.contentparse(tpobj);
        //        var tpxqcontent = this.xqcontentparse(tpobj);
        //        this.yilaicontentmerge = tpcontent[0];
        //        this.beiyilaicontentmerge = tpcontent[1];
        //        this.xqcontentmerge = tpxqcontent;
        //        this.setState({
        //            isLoading: isdone ? false : true,
        //            yilaicontent: [tpcontent[0]],
        //            beiyilaicontent: [tpcontent[1]],
        //            xqcontent: [tpxqcontent],
        //            errNumStyle: [this.errorstyle],
        //            rateStyle: [this.ratestyle]
        //        });
        //        isdone = true;
        //    })
        //    .catch(function (error) {
        //        console.log('request failed', error);
        //        this.setState({
        //            isLoading: false,
        //            yilaicontent: [<View>
        //                <Text>{"网络错误" + error.message}</Text>
        //            </View>]
        //        });
        //        isdone = true;
        //    });
    },
    xqexpandcontent: function () {
        var tpcount = 0, tpcont = [];
        for (var j = 0; j < this.pagedata.des.errors.errors.length; j++) {
            tpcont.push(<Text numberOfLines={2} style={styles.gxdesc}>
                <Text style={{letterSpacing: 5}} >●</Text>{  this.pagedata.des.errors.errors[j]}</Text>);
            tpcount++;
        }
        return <View style={{flex: 1, borderWidth: pt, borderColor: '#EBEBEB'}}>
            <View style={{height: 10, flex: 1, backgroundColor: "#EBEBEB"}}></View>
            <View style={{overflow: 'hidden', backgroundColor: "#FFF"}}>
                <TouchableHighlight style={{
                    borderBottomWidth: pt,
                    borderBottomColor: "#ddd"
                }}  onPress={this.changetab.bind(this, {action: 'fold', name: "xq"})} underlayColor={"#ddd"} >
                    <View style={{flexDirection: "row", height: xqheadheight, flex: 1}} >
                        <View style ={{
                            flex: 14,
                            flexDirection: "row",
                            alignItems: "center",
                            alignContent: "center",
                            marginLeft: 8
                        }}>
                            <View style={styles.titleicon}></View>
                            <Text style={{
                                color: "#000",
                                fontSize: 18,
                                fontWeight: "800",
                                alignContent: "center",
                                justifyContent: 'center'
                            }}>错误汇总</Text>
                        </View>
                        <View style ={{flex: 1}}>
                            <Text style={{
                                color: "#000",
                                lineHeight: 26,
                                fontSize: 18,
                                fontWeight: "400",
                                alignContent: "center",
                                justifyContent: 'center'
                            }}>-</Text>
                        </View>
                    </View>

                </TouchableHighlight>
                <View style={[{flex: 7}]}>
                    <Text style={styles.title}>{this.pagedata.domainName}</Text>

                    <View >

            {tpcont}
                        <View style={{height: 10}}></View>
                    </View>
                </View>
            </View>
        </View>;
    },
    xqchanged: function (action) {
        var tpxqcontent = this.xqexpandcontent();
        if (action = "expand") {
            this.setState({
                xqcontent: [
                    tpxqcontent
                ]
            });
        }
    },
    ylexpandcontent: function () {
        var tpcont = [];
        var tpindex = 0;
        for (var tpitemindex in this.pagedata.dependence) {
            tpindex++;
            if (this.pagedata.dependence[tpitemindex].edgeOpposite == false) {
                tpcont.push(<Text numberOfLines={1} onPress={this.getLinkResult.bind(this, tpitemindex)}  style={styles.gxtitle}> {this.pagedata.dependence[tpitemindex].des.details.title}</Text>);
                for (var j = 0; j < this.pagedata.dependence[tpitemindex].des.details.details.length; j++) {
                    tpcont.push(<Text numberOfLines={2} style={styles.gxdesc}>
                        <Text style={{letterSpacing: 5}} >●</Text>{this.parseHtml(this.pagedata.dependence[tpitemindex].des.details.details[j])}</Text>);
                }
            }
        }
        return <View style={{flex: 1, borderWidth: pt, borderColor: '#EBEBEB'}}>
            <View style={{height: 10, flex: 1, backgroundColor: "#EBEBEB"}}></View>
            <View style={{overflow: 'hidden', backgroundColor: "#FFF"}}>
                <TouchableHighlight style={{
                    borderBottomWidth: pt,
                    borderBottomColor: "#ddd"
                }}  onPress={this.changetab.bind(this, {action: 'fold', name: "yl"})} underlayColor={"#ddd"} >
                    <View style={{flexDirection: "row", height: xqheadheight, flex: 1}} >
                        <View style ={{
                            flex: 14,
                            flexDirection: "row",
                            alignItems: "center",
                            alignContent: "center",
                            marginLeft: 8
                        }}>
                            <View style={styles.titleicon}></View>
                            <Text style={{
                                color: "#000",
                                fontSize: 18,
                                fontWeight: "800",
                                alignContent: "center",
                                justifyContent: 'center'
                            }}>依赖服务</Text>
                        </View>
                        <View style ={{flex: 1}}>
                            <Text style={{
                                color: "#000",
                                lineHeight: 26,
                                fontSize: 18,
                                fontWeight: "400",
                                alignContent: "center",
                                justifyContent: 'center'
                            }}>-</Text>
                        </View>
                    </View>

                </TouchableHighlight>
                <View style={[{flex: 7}]}>
                    {tpcont}
                    <View style={{height: 10}}></View>
                </View>
            </View>
        </View>;
    },

    ylchanged: function (action) {
        var tpylcontent = this.ylexpandcontent();
        if (action = "expand") {
            this.setState({
                yilaicontent: [
                    tpylcontent
                ]
            });
        }
    },

    bylexpandcontent: function () {
        var tpcont = [];
        for (var i in this.pagedata.dependence) {
            if (this.pagedata.dependence[i].edgeOpposite == true) {
                tpcont.push(<Text numberOfLines={1} onPress={this.getLinkResult.bind(this, i)}  style={styles.gxtitle}> {this.pagedata.dependence[i].des.details.title}</Text>);
                for (var j = 0; j < this.pagedata.dependence[i].des.details.details.length; j++) {
                    tpcont.push(<Text numberOfLines={2} style={styles.gxdesc}>
                        <Text style={{letterSpacing: 5}} >●</Text>{this.parseHtml(this.pagedata.dependence[i].des.details.details[j])}</Text>);

                }
            }
        }

        return <View style={{flex: 1, borderWidth: pt, borderColor: '#EBEBEB'}}>
            <View style={{height: 10, flex: 1, backgroundColor: "#EBEBEB"}}></View>
            <View style={{overflow: 'hidden', backgroundColor: "#FFF"}}>
                <TouchableHighlight style={{
                    borderBottomWidth: pt,
                    borderBottomColor: "#ddd"
                }}  onPress={this.changetab.bind(this, {action: 'fold', name: "byl"})} underlayColor={"#ddd"} >
                    <View style={{flexDirection: "row", height: xqheadheight, flex: 1}} >
                        <View style ={{
                            flex: 14,
                            flexDirection: "row",
                            alignItems: "center",
                            alignContent: "center",
                            marginLeft: 8
                        }}>
                            <View style={styles.titleicon}></View>
                            <Text style={{
                                color: "#000",
                                fontSize: 18,
                                fontWeight: "800",
                                alignContent: "center",
                                justifyContent: 'center'
                            }}>被依赖服务</Text>
                        </View>
                        <View style ={{flex: 1}}>
                            <Text style={{
                                color: "#000",
                                lineHeight: 26,
                                fontSize: 18,
                                fontWeight: "400",
                                alignContent: "center",
                                justifyContent: 'center'
                            }}>-</Text>
                        </View>
                    </View>

                </TouchableHighlight>
                <View style={[{flex: 7}]}>
                    {tpcont}
                    <View style={{height: 10}}></View>
                </View>
            </View>
        </View>;
    },

    bylchanged: function (action) {
        var tpbylcontent = this.bylexpandcontent();
        if (action = "expand") {
            this.setState({
                beiyilaicontent: [
                    tpbylcontent
                ]
            });
        }
    },


    componentWillMount: function () {
    },
    changetab: function (mobj) {
        if (mobj.name == "xq") {
            if (mobj.action == "fold") {

                this.xiangqingisfold = true;
                LayoutAnimation.configureNext(this.animations.layout.easeInEaseOut);

                this.setState({
                    xqcontent: [
                        <View style={{flex: 1, borderWidth: pt, borderColor: '#EBEBEB'}}>
                            <View style={{height: 10, flex: 1, backgroundColor: "#EBEBEB"}}></View>
                            <View style={{overflow: 'hidden', backgroundColor: "#FFF"}}>
                                <TouchableHighlight style={{
                                    borderBottomWidth: pt,
                                    borderBottomColor: "#ddd"
                                }}  onPress={this.changetab.bind(this, {
                                    action: 'expand',
                                    name: "xq"
                                })} underlayColor={"#ddd"} >
                                    <View style={{flexDirection: "row", height: xqheadheight, flex: 1}} >
                                        <View style ={{
                                            flex: 14,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            alignContent: "center",
                                            marginLeft: 8
                                        }}>
                                            <View style={styles.titleicon}></View>
                                            <Text style={{
                                                color: "#000",
                                                fontSize: 18,
                                                fontWeight: "800",
                                                alignContent: "center",
                                                justifyContent: 'center'
                                            }}>错误汇总</Text>
                                        </View>
                                        <View style ={{flex: 1}}>
                                            <Text style={{
                                                color: "#000",
                                                lineHeight: 26,
                                                fontSize: 18,
                                                fontWeight: "400",
                                                alignContent: "center",
                                                justifyContent: 'center'
                                            }}>+</Text>
                                        </View>
                                    </View>

                                </TouchableHighlight>
                            </View>
                        </View>]
                });
            } else {
                //var tpxqcontent =this.xqinitcontent();
                LayoutAnimation.configureNext(this.animations.layout.easeInEaseOut);
                this.xiangqingisfold = false;

                this.setState({
                    xqcontent: [this.xqcontentmerge]
                });
            }
        }

        if (mobj.name == "yl") {
            if (mobj.action == "fold") {
                LayoutAnimation.configureNext(this.animations.layout.easeInEaseOut);
                this.yilaifold = true;

                this.setState({
                    yilaicontent: [
                        <View style={{flex: 1}}>

                            <View style={{height: 10, flex: 1, backgroundColor: "#EBEBEB"}}></View>
                            <View style={{flex: 1, overflow: 'hidden', backgroundColor: "#FFF"}}>
                                <TouchableHighlight style={{
                                    flex: 1,
                                    borderBottomWidth: pt,
                                    borderBottomColor: "#ddd"
                                }}  onPress={this.changetab.bind(this, {
                                    action: 'expand',
                                    name: "yl"
                                })} underlayColor={"#ddd"} >
                                    <View style={{flexDirection: "row", height: xqheadheight, flex: 1}} >
                                        <View style ={{
                                            flex: 14,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            alignContent: "center",
                                            marginLeft: 8
                                        }}>
                                            <View style={styles.titleicon}></View>
                                            <Text style={{
                                                color: "#000",
                                                fontSize: 18,
                                                fontWeight: "800",
                                                alignContent: "center",
                                                justifyContent: 'center'
                                            }}>依赖服务</Text>
                                        </View>
                                        <View style ={{flex: 1}}>
                                            <Text style={{
                                                color: "#000",
                                                lineHeight: 26,
                                                fontSize: 18,
                                                fontWeight: "400",
                                                alignContent: "center",
                                                justifyContent: 'center'
                                            }}>+</Text>
                                        </View>
                                    </View>

                                </TouchableHighlight>
                            </View>
                        </View>
                    ],
                    marginylTop: 8,
                    marginylBottom: 8
                });
            } else {
                //var tpylcontent =this.ylinitcontent();
                LayoutAnimation.configureNext(this.animations.layout.easeInEaseOut);
                this.yilaifold = false;

                this.setState({
                    yilaicontent: [this.yilaicontentmerge],
                    marginylTop: 0,
                    marginylBottom: 0
                });
            }
        }

        if (mobj.name == "byl") {
            if (mobj.action == "fold") {
                LayoutAnimation.configureNext(this.animations.layout.easeInEaseOut);
                this.beiyilaifold = true;

                this.setState({
                    beiyilaicontent: [
                        <View style={{flex: 1}}>
                            <View style={{height: 10, flex: 1, backgroundColor: "#EBEBEB"}}></View>
                            <View style={{flex: 1, overflow: 'hidden', backgroundColor: "#FFF"}}>
                                <TouchableHighlight style={{
                                    flex: 1,
                                    borderBottomWidth: pt,
                                    borderBottomColor: "#ddd"
                                }}  onPress={this.changetab.bind(this, {
                                    action: 'expand',
                                    name: "byl"
                                })} underlayColor={"#ddd"} >
                                    <View style={{flexDirection: "row", height: xqheadheight, flex: 1}} >
                                        <View style ={{
                                            flex: 14,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            alignContent: "center",
                                            marginLeft: 8
                                        }}>
                                            <View style={styles.titleicon}></View>
                                            <Text style={{
                                                color: "#000",
                                                fontSize: 18,
                                                fontWeight: "800",
                                                alignContent: "center",
                                                justifyContent: 'center'
                                            }}>被依赖服务</Text>
                                        </View>
                                        <View style ={{flex: 1}}>
                                            <Text style={{
                                                color: "#000",
                                                lineHeight: 26,
                                                fontSize: 18,
                                                fontWeight: "400",
                                                alignContent: "center",
                                                justifyContent: 'center'
                                            }}>+</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>

                    ],
                    marginbylTop: 8,
                    marginbylBottom: 8
                });
            } else {
                //var tpbylcontent =this.bylinitcontent();
                LayoutAnimation.configureNext(this.animations.layout.easeInEaseOut);
                this.beiyilaifold = false;

                this.setState({
                    beiyilaicontent: [this.beiyilaicontentmerge],
                    marginbylTop: 0,
                    marginbylBottom: 0
                });
            }
        }
    },
    render: function () {
        var buttons = {
            left: true
        };
        return (

            <View style={{flex: 1, backgroundColor: "#EBEBEB"}}>
                <Header buttons={buttons} title="依赖关系" navigator={this.props.navigator} />
                <View style={{borderBottomWidth: pt, borderBottomColor: "#ddd", flexDirection: "row"}}>
                    <View style={{flex: 1, height: rowheight * 2, width: SCREE_WIDTH / 4, backgroundColor: "#FFF"}}>
                        <View style={{
                            height: rowheight * 6 / 4,
                            alignItems: "center",
                            justifyContent: "center",
                            alignContent: "center"
                        }}>
                            <Text style={{
                                color: "#38c",
                                fontSize: SCREE_HEIGHT / 23,
                                fontWeight: "400"
                            }}>{this.state.Time}</Text>
                        </View>
                        <View style={{
                            height: rowheight / 4,
                            alignItems: "center",
                            justifyContent: "center",
                            alignContent: "center"
                        }}>
                            <Text style={{
                                color: "#38c",
                                fontSize: SCREE_HEIGHT / 42,
                                fontWeight: "400"
                            }}>{this.state.Date}</Text>
                        </View>
                    </View>
                    <View style={{flex: 3}} >
                        <View style={[styles.row]}>
                            <View style={styles.item}>
                                <Text style={[styles.fontBold, {textAlign: 'center'}]}>App ID</Text>
                            </View>
                            <View style={styles.item }>
                                <Text style={[styles.fontBold, {textAlign: 'center'}]}>错误数</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={[styles.fontBold, {textAlign: 'center'}]}>环比</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.item }>
                                <Text style={[styles.fontitemBold, {textAlign: 'center'}]}>{this.state.AppID}</Text>
                            </View>
                            <View style={styles.item }>
                                <Text style={[this.state.errNumStyle, styles.fontitemBold, {textAlign: 'center'}]}>{this.state.ErrCount}</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={[this.state.rateStyle, styles.fontitemBold, {textAlign: 'center'}]}>{this.state.RoundRate == "" ? "--" : this.state.RoundRate + "%"}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{height: scrollviewheight}}>
                    <ScrollView style={{}}>
                        <View style={{flex: 1}}>
{ this.state.xqcontent}

{this.state.yilaicontent}


{this.state.beiyilaicontent}
                        </View>
                    </ScrollView>
                </View>
                <Loading display={this.state.isLoading}/>
            </View>
        );
    }
});

var styles = StyleSheet.create({

    nonetext: {color: "#D4D4D4", marginTop: 10},
    moretext: {fontSize: 15, fontWeight: "400"},
    morestyle: {
        flex: 1, height: 35, justifyContent: 'center',
        alignItems: 'center', borderTopColor: "#ddd", borderTopWidth: pt
    },
    titleicon: {
        width: 4, backgroundColor: "#43BEFA", height: 24, marginRight: 4
    },
    border: {
        borderBottomWidth: pt,
        borderColor: '#ddd'
    },
    bottomrow: {
        flexDirection: 'row',
        borderTopWidth: pt,
        borderColor: '#ddd',
        height: lineheight
    },
    row: {
        flexDirection: 'row',
        backgroundColor: "#FFF",
        height: rowheight,
        alignItems: 'center'
    },
    item: {
        width: SCREE_WIDTH / 4,
        borderTopWidth: pt,
        borderLeftWidth: pt,
        height: rowheight,
        borderColor: '#ddd',
        justifyContent: 'center'
    },
    fontBold: {
        fontWeight: '700',
    },
    fontitemBold: {
        fontWeight: '400',
    },
    title: {
        color: '#000',
        marginLeft: 8,
        marginTop: 5,
        fontSize: 18,
        fontWeight: '600'
    },
    gxtitle: {
        marginTop: 5,
        color: '#000',

        marginLeft: 0,
        fontSize: 18,
        fontWeight: '600'
    },
    gxdesc: {
        color: "#616161",
        marginLeft: 15,
        fontSize: 14,
        lineHeight: 20
    },
    desc: {
        color: "#616161",
        marginLeft: 15,
        marginRight: 5,
        fontSize: 14,
        lineHeight: 20
    },
    red: {
        color: '#ED4C50'
    },
    green: {
        color: '#186B18'
    },
    fontBig: {
        fontSize: 15
    },
    yellow: {
        color: '#FFE585'
    }
});

module.exports = Dependence;