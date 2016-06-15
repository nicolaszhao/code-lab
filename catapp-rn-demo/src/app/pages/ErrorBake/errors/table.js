
/*!
 *
 * @author: lh_wang@ctrip.com
 * @time: 2015-10-22
 * @module: 报错大盘Slider功能组件
 *
 */
var React = require('react-native');
var Dimensions = require('Dimensions');
var Dependence = require('./dependence');
var Slider = require('./../../util/ctrip_slider');
var Util = require('./../../util/util');
var Loading = require('./../../util/loading');

var {
  Text,
  View,
  Image,
  WebView,
  AlertIOS,
  Animated,
  PickerIOS,
  PixelRatio,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  TouchableOpacity,
  ActivityIndicatorIOS
  } = React;


//一个像素
var px = Util.pixel;
//屏幕宽度
var SCREE_WIDTH = Util.size.width;
//行高
var ROW_HEIGHT = 40;

/****风险控制参数****/
//红色，大于0.5
var ERROR_RED = 0.005;
//绿色，小于0
var ERROR_GREEN = 0;
//灰色 0~0.5（包含0不包含0.005）

var ERROR_GRAY_MIN = 0;
var ERROR_GRAY_MAX = 0.005;

//控制显示隐藏的字段
var HIDE_STR = 'index';

//详情错误高度
var DETAIL_ERROR_HEIGHT = 20;

//详情错误标题高度
var DETAIL_ERROR_TITLE_HEIGHT = 40;


var Table = React.createClass({
  getInitialState: function(){
    var data = this.props.data;
    var title = this.props.dateText;

    data && data.length && (title = data[0].minute);
    var year = this.props.year;
    var month = this.props.month;
    var dayri = this.props.dayri;
    var hour = this.props.hour;

    return{
      title: title,
      heightAttach: 0,
      data: data,
      currentIndex:0,
      year: year,
      month: month,
      dayri: dayri,
      hour: hour,
      total: data.length,
      isLoadFrontData: false
    };
  },
  render: function(){
    var data = this.state.data;
    var blocks = [];

    for(var i in data){
      //整块区域
      var block = data[i];
      var domains = block["domains"];
      var rows = [];
      for(var j in domains){
        var obj = domains[j];
        var errors = obj['errors'];
        var exList = [];
        //错误、异常处理
        for(var k in errors){
          exList.push(<Text numberOfLines={1} style={styles.errorsItem}>
            [ <Text style={{color: '#ED4C50'}}>{errors[k]["num"]}</Text> ] {errors[k]["name"]}</Text>);
        }
        //单行颜色处理
        var styleError = [styles.row];
        var color = '#333';
        if(parseInt(obj["alert"]) === 2){
          styleError.push({backgroundColor:'#ED4C50'});
          color = '#fff';
        }
        if(parseInt(obj["alert"]) === 1){
          styleError.push({backgroundColor:'#FFE585'});
          color = '#fff';
        }
        rows.push(
          <View>
            <TouchableOpacity onPress={this.showDetail.bind(this, i , j)}>
              <View style={styleError}>
                <View style={{flex:1, alignItems:'center'}}>
                  <Text style={[styles.item, {textAlign:'left', width:80,color: color}]}>{obj.appId}</Text>
                </View>
                {this.formatErrorNumCell(obj["total"], color)}
                {this.formatRateCell(obj["sequential"], color)}
              </View>
            </TouchableOpacity>
            {
              this.state[HIDE_STR + '_' + i + '_' + j]?
              <View style={{padding:10, borderTopWidth:1, borderColor: "#EEEEEE", }}>
                <Text>
                  {obj["appName"]}
                </Text>
                <View style={{marginTop:5}}>
                  {exList}
                </View>
                <View style={[styles.row, {borderTopWidth:0, marginTop:10}]}>
                  <View style={{flex:1}}></View>
                  <TouchableOpacity onPress={this.addDeps.bind(this, obj.appId, obj["total"],
                  obj["sequential"], this.props.date)} style={styles.miniButton}>
                    <Image style={styles.miniButtonIcon} source={require('../../../images/arrow-r-black.png')} />
                    <Text style={styles.miniButtonText}>依赖关系</Text>
                  </TouchableOpacity>
                </View>
              </View>
              : null
            }
          </View>
        );
      }

      var height =  this.getBlockHeight() + this.state.heightAttach;
      blocks.push(
        <View style={{width:SCREE_WIDTH, height: height}}>
          <View style={[styles.row, {borderTopWidth: 0}]}>
            <View style={[styles.item]}>
              <Text style={[styles.fontBold, {color: '#333'}]}>App ID</Text>
            </View>
            <View style={styles.item}>
              <Text style={[styles.fontBold, {color: '#333'}]}>错误数</Text>
            </View>
            <View style={styles.item}>
              <Text style={[styles.fontBold, {color: '#333'}]}>环比</Text>
            </View>
          </View>
          {rows}
        </View>
      );
    }


    return(
      <View>
        <Text style={styles.title}>{this.state.title}</Text>
        {
          this.state.heightAttach?
          <Slider height={height}
                  loop={false}
                  showsButtons={false}
                  bounces={true}
                  onTouchStart={this.touchStart}
                  onTouchEnd={this.touchEnd}
                  showsPagination={false}
                  onScrollBeginDrag={this.scrollBeginDrag}
                  onMomentumScrollEnd={this.momentumScrollEnd}>
            {blocks}
          </Slider>
          :null
        }
        <TouchableOpacity style={styles.refresh} onPress={this.refresh}>
          <Image source={require('../../../images/refresh-white.png')} style={{width: 14, height: 14, marginRight: 8}} />
          <Text style={{color:'#fff'}}>刷新</Text>
        </TouchableOpacity>
        {
          !this.state.data?
            <ActivityIndicatorIOS color="#A6A6A6" size="large" animating={true} style={styles.loading}></ActivityIndicatorIOS>
            : null
        }
        {
          this.state.isLoadFrontData?
            <Loading display={true} top={100}/>
            : null
        }
      </View>
    );
  },


  touchStart: function(e){
    this.setState({
      touchStartLocX: e.nativeEvent.locationX,
      touchStartPagex: e.nativeEvent.pageX
    });
  },

  /*修改源码，早登极乐*/
  /*改源码未必不是一件坏事*/
  touchEnd: function(e, state){
    this.setState({
      touchEndLocX: e.nativeEvent.locationX,
      touchEndPagex: e.nativeEvent.pageX
    });

  },

  scrollBeginDrag: function(e, state){
    //主要是为了加载新数据
    if(state.index === 0 && state.offset.x === 0){
      this.setState({
        isLoadFront: true
      });
    }else{
      this.setState({
        isLoadFront: false
      });
    }
  },
  momentumScrollEnd: function(e, state){
    var data = this.state.data;
    var that = this;
    //当block无数据时禁止滚动
    if(!data){
      return 0;
    }

    var currentIndex = this.state.currentIndex;
    var index = parseInt(state.index);

    //设置所有状态
    this.setState({
      title: data[index]["minute"]
    });

    //格式化日期和小时
    var year = this.state.year;
    var month = this.state.month;
    var dayri = this.state.dayri;
    var hour = this.state.hour;

    //获取最后一栏的时间
    var lastBlock = data[parseInt(data.length -1)];
    var lastHour = parseInt(lastBlock.minute.split(':')[0]);
    var lastMin = parseInt(lastBlock.minute.split(':')[1]);

    //获取第一栏的时间
    var firstBlock = data[0];
    var firstHour = parseInt(firstBlock.minute.split(':')[0]);
    var firstMin = parseInt(firstBlock.minute.split(':')[1]);


    //（1）左移，手势<－
    //时间倒退，加载历史数据
    if(index % 3 === 0 && currentIndex < index){
      hour = lastHour;
      lastMin = lastMin - 1;
      var newDate = new Date(year, month, dayri, hour, lastMin);
      this.getNewData(newDate, newDate.getMinutes(),3, function(cbData){
        for(var i in cbData){
          data.push(cbData[i]);
        }
        that.setState({
          data: data
        });
      });
    }

    //(2)右移，手势－>
    //时间往前，加载未来数据
    //this.state.isLoadFront && state.offset.x === 0这块逻辑比较绕
    //同时监测移动的方向，采用touch事件
    //4个事件才能确保方向（touchStart、touchEnd、scrollBeginDrag、momentumScrollEnd
    //50为阈值控制
    var disLoc = parseFloat(this.state.touchEndLocX) - parseFloat(this.state.touchStartLocX);
    var disPage = parseFloat(this.state.touchEndPagex) - parseFloat(this.state.touchStartPagex);
    if(this.state.isLoadFront && state.offset.x === 0 && disLoc > 50 && disPage > 50){
      hour = firstHour;
      firstMin = firstMin + 1;
      var newDate = new Date(year, month, dayri, hour, firstMin);
      if(newDate < new Date()){
        this.setState({
          isLoadFrontData: true
        });
        this.getNewData(newDate, newDate.getMinutes(), 1, function(cbData){
          for(var j = cbData.length - 1; j >= 0; j--){
            data.unshift(cbData[j]);
          }
          that.setState({
            data: data,
            title: data[0]['minute']
          });
          that.setState({
            isLoadFrontData: false
          });
        });
      }else{
        alert('当前数据为最新数据，暂不用更新');
      }
    }

    this.setState({
      currentIndex: index
    });
  },

  getBlockHeight: function(){
    var data = this.state.data;
    return (data[parseInt(data.length) - 1]['domains'].length) * ROW_HEIGHT;
  },

  formatRateCell: function(rate, color){
    var str = rate;
    if(isNaN( parseFloat(rate))){
      str = '无数据';
    }else {
      str = (parseFloat(rate) * 100).toFixed(2) + '%';
    }

    return (
      <View style={{flex:1, alignItems:'center'}}>
        <Text style={[{textAlign:'right', width: 70, color: color}]}>{str}</Text>
      </View>
    );
  },

  formatErrorNumCell: function(errorNum, color){
    return(
      <View style={{flex:1, alignItems:'center'}}>
        <Text style={[{textAlign:'right',width:40, color: color}]}>{errorNum}</Text>
      </View>
    );
  },

  showDetail: function(i, j){
    //LayoutAnimation.configureNext(animations.layout.easeInEaseOut);
    var data = this.state.data;
    //更新高度
    var errors = data[i]['domains'][j]['errors'];
    this.appendHeight(errors.length);
    this.indexShow(i, j);
  },

  indexShow: function(blockIndex, rowIndex){
    var obj = {};
    //关闭其他，显示一个
    var data = this.state.data;
    for(var i in data){
      var block = data[i];
      for(var j in block["domains"]){
        obj[HIDE_STR + '_' + i + '_' + j] = false;
      }
    }

    obj[HIDE_STR + '_' + blockIndex + '_' + rowIndex] = true;
    this.setState(obj);
  },

  addDeps: function(appID, num, rate, date){
    var arr = date.split('年');
    var year = arr[0];
    var monthStr = arr[1].split('月');
    var month = monthStr[0];
    var date = monthStr[1].split('日')[0];


    if(parseInt(month) < 10){
      month = '0' + month;
    }

    if(parseInt(date) < 10){
      date = '0' + date;
    }

    this.props.nav.push({  path:"dependencies",
      component:Dependence,
      title:'依赖关系',
      passProps: {
        AppID: appID,
        ErrCount: num,
        RoundRate: rate,
        date: year + '-' + month + '-' + date,
        time: this.state.title
      }
    });
  },

  componentDidMount: function(){
    this.showDetail(0, 0);
    var data = this.state.data;
    //取第一块第一条记录的高的
    var errors = data[0]['domains'][0]['errors'];
    this.appendHeight(errors.length);

  },

  //追加动态高度
  appendHeight: function(n){
    this.setState({
      heightAttach: DETAIL_ERROR_HEIGHT * n + DETAIL_ERROR_TITLE_HEIGHT + 100
    });
  },

  //刷新加载新数据
  refresh: function(){
    if(this.state.data){
      this.setState({
        title: ''
      });
      this.getData(new Date(), '&latest=latest');
    }else{
      AlertIOS.alert('提示', '正在加载数据...');
    }
  },

  //获取最新数据
  getData: function(timeStr, addParam){
    var date = this.getDateStr(timeStr);
    var that = this;
    var path = '/getErrors?count=6&tops=10&date=' + date + '&env=' + global.CAT_APP.server_url_setting+"&token="+global.CAT_APP.server_token;

    if(addParam){
      path += addParam;
    }
    that.setState({
      data: null
    });

    Util.post(path, function(data){
      if(!data.length){
        AlertIOS.alert('提示', '对不起，服务异常没有获取最新数据');
      }else{
        if(data&&data.status&&data.status.status_code=="1004"){
          AlertIOS.alert('提示', '对不起，服务异常,请重试');
          return;
        }
        that.setState({
          data: data,
          title: data[0].minute
        });
      }
    });
  },
  //获取3条数据
  getNewData: function(timeStr, min, count, callback){
    var that =this;
    var date = this.getDateStr(timeStr);
    var path = '/getErrors?count=' + count +  '&tops=10&date=' + date + '&minute=' + min
      + '&env=' + global.CAT_APP.server_url_setting+"&token="+global.CAT_APP.server_token;
    Util.post(path, function(data){
      if(!data.length){
        return AlertIOS.alert('提示', '对不起，服务异常，无法静默更新数据');
      }
      if(data&&data.status&&data.status.status_code=="1004"){
        AlertIOS.alert('提示', '对不起，服务异常,无法静默更新数据');
        return;
      }
      callback(data);
    });
  },
  //格式化时间
  getDateStr: function(date){
    var month = parseInt(date.getMonth())+1;
    var date2 = parseInt(date.getDate());
    var hour = parseInt(date.getHours());
    if(month < 10){
      month = '0' + month.toString();
    }

    if(date2 < 10){
      date2 = '0' + date2.toString();
    }

    if(hour < 10){
      hour = '0' + hour.toString();
    }
    return date.getFullYear().toString() + month + date2 + hour;
  }

});

var styles = StyleSheet.create({
  border:{
    borderBottomWidth:px,
    borderColor:'#ddd'
  },
  flex_1:{
    flex:1
  },
  row:{
    flexDirection:'row',
    borderTopWidth:px,
    borderColor:'#ddd',
    height:ROW_HEIGHT,
    alignItems: 'center'
  },
  item:{
    flex:1,
    alignItems:'center'
  },
  fontBold:{
    fontWeight:'700'
  },
  title:{
    alignItems:'center',
    height:ROW_HEIGHT,
    justifyContent:'center',
    textAlign:'center',
    fontSize: 20,
    color:'#38c'
  },
  title_text:{
    fontSize:30,
    color:'#368CE9'
  },
  red:{
    color:'red',
  },
  green:{
    color:'#00C349'
  },
  fontBig:{
    fontSize:15
  },
  yellow:{
    color:'#F78900'
  },
  grey:{
    color:'#757575'
  },
  maRight:{
    alignItems:'flex-end'
  },
  textCenter:{
    textAlign:'center'
  },
  btn:{
    borderWidth:px,
    borderColor:"#007AFF",
    height:30,
    width:65,
    borderRadius:4,
    justifyContent:'center',
    alignItems:'center',
  },
  errorsItem:{
    color:'#4D4D4D',
    fontSize:13,
    height:DETAIL_ERROR_HEIGHT
  },
  refresh:{
    position:'absolute',
    top:0,
    borderWidth:1,
    borderColor:'#000',
    paddingTop: 8,
    paddingBottom: 8,
    width:80,
    right:10,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#333',
    borderRadius:5
  },
  loading: {
    position:'absolute',
    top:100,
    left: (SCREE_WIDTH/2) - 18
  },

  miniButton: {
    width: 85,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  miniButtonText: {
    fontSize: 14,
    color: '#333'
  },
  miniButtonIcon: {
    width: 14,
    height: 14,
    marginRight: 5
  }
});

/*add animate*/
var animations = {
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
};


module.exports = Table;