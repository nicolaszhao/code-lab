
/*!
 *
 * @author: lh_wang@ctrip.com
 * @time: 2015-10-01
 * @module: 报错大盘入口文件
 *
 */

var React = require('react-native');
var Dimensions = require('Dimensions');
var Table = require('./errors/table');
var Util = require('./../util/util');

var Loading = require('./../util/loading');

import Header from '../../components/Header';

var {
    Text,
    View,
    Image,
    WebView,
    AlertIOS,
    PickerIOS,
    TextInput,
    StyleSheet,
    ScrollView,
    PixelRatio,
    AppRegistry,
    StatusBarIOS,
    DatePickerIOS,
    TouchableOpacity,
    ActivityIndicatorIOS,
    InteractionManager
    } = React;

var pt = Util.pixel;
var height = Util.size.height;
var width = Util.size.width;

var Errors = React.createClass({

  getInitialState: function(){
    return{
      isLoading:true,
      showDate: false,
      mode: 'date',
      date: new Date(),
      time: new Date(),
      data: null,
      dateIOS: new Date(),
      dateText: this.getDate(new Date()),
      timeText: this.getTime(new Date()),
      /*以下作为时间传递参数*/
      year: 2015,
      month: 10,
      dayri: 18,
      hour: 13
    };
  },

  getDate: function(date){
    return date.getFullYear() + '年'
        +    (parseInt(date.getMonth()) + 1) + '月'
        +    date.getDate() + '日';
  },

  getTime: function(date){
    return date.getHours()   + '点'
        +    date.getMinutes() + '分';
  },

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
  },

  getYearMonthDate: function(){
    var arr = this.state.dateText.split('年');
    var year = arr[0];
    var dateArr = arr[1].split('月');
    var month = dateArr[0];
    var date = dateArr[1].split('日')[0];
    return {
      year: year,
      month: parseInt(month) - 1,
      date: date
    };
  },

  getHourMin: function(){
    var arr = this.state.timeText.split('点');
    var hour = parseInt(arr[0]);
    var min = parseInt(arr[1].split('分')[0]);
    return {
      hour: hour,
      min: min
    };
  },

  selectDate: function(){
    this.setState({
      showDate: true,
      mode: 'date',
      dateIOS: new Date(this.getYearMonthDate().year, this.getYearMonthDate().month, this.getYearMonthDate().date)
    });
  },

  selectTime: function(){
    var date = new Date();
    this.setState({
      showDate: true,
      mode: 'time',
      dateIOS: new Date(date.getFullYear(), date.getMonth(), date.getDate(),
          this.getHourMin().hour, this.getHourMin().min)
    });
  },

  componentDidMount: function(){
    var that =this;
    InteractionManager.runAfterInteractions(() => {
      //传递时间
      var date = new Date();
      that.setState({
        year: date.getFullYear(),
        month: date.getMonth(),
        dayri: date.getDate(),
        hour: date.getHours()
      });
      that.getData(date);
    });

  },

  getData: function(timeStr, min){
    var date = this.getDateStr(timeStr);
    var that = this;

    var path = '/getErrors?count=6&tops=10&date=' + date + '&env=' + global.CAT_APP.server_url_setting+"&token="+global.CAT_APP.server_token;
    if(min || min === 0){
      path += '&minute=' + min;
    }
    that.setState({
      data: null

    });
    Util.post(path, function(data){
      if(data&&data.status&&data.status.status_code=="1004"){
        that.setState({isLoading:false});
        AlertIOS.alert('提示', '对不起，服务异常,请重试');
        return;
      }
      that.setState({
        data: data
      });
      if(!data.length){
        AlertIOS.alert('提示', '对不起，服务没有返回数据或者服务异常');
        that.setState({
          data: []
        });
      }
      that.setState({isLoading:false});
    },function(){
      that.setState({isLoading:false});
      //that.props.homenav.push({ id: 'login' });
      //setTimeout(function(){
      //
      //  that.props.homenav.push({ id: 'login' });
      //  that.setState({isLoading:false});
      //},3000);

    });

  },

  complete: function(){
    if(this.state.mode === 'time'){
      this.setState({
        timeText: this.getTime(this.state.time)
      });
    }else{
      this.setState({
        dateText: this.getDate(this.state.date)
      });
    }

    this.setState({
      showDate: false,
      isLoading:true
    });
    //这里进行查询
    //处理日期和小时
    var year = this.state.date.getFullYear();
    var month = this.state.date.getMonth();
    var date = this.state.date.getDate();
    //处理小时分钟
    var hour = this.state.time.getHours();
    var min = this.state.time.getMinutes();
    //传递时间参数
    this.setState({
      year: year,
      month: month,
      dayri: date,
      hour: hour
    });
    //请求数据
    this.getData(new Date(year, month, date, hour), min);
  },
  cancel: function(){
    this.setState({
      showDate: false
    })
  },
  dateChange: function(date){
    if(this.state.mode === 'time'){
      this.setState({
        time: date,
        dateIOS: new Date(date)
      });
    }else{
      this.setState({
        date: date,
        dateIOS: new Date(date)
      });
    }
  },

  render: function(){
    var buttons = {
      left: true
    };
    return (
        <View style={{flex:1}}>
          <Header buttons={buttons} title="报错大盘" navigator={this.props.navigator} />
          <View style={{flex: 1}}>
            <ScrollView
                automaticallyAdjustContentInsets={true}>
              <View style={{alignItems:'center', marginTop:10}}>
                <View style={[styles.inputCenter, styles.row]}>
                  <TouchableOpacity onPress={this.selectDate} style={[styles.button, styles.buttonGroupFirst]}>
                    <Image style={styles.buttonIcon} source={require('../../images/calendar-black.png')} />
                    <Text style={styles.date}>
                      {this.state.dateText}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.selectTime} style={[styles.button, styles.buttonGroupLast]}>
                    <Image style={styles.buttonIcon} source={require('../../images/clock-black.png')} />
                    <Text style={styles.date}>
                      {this.state.timeText}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginTop:10}}>
            {
                this.state.data?
                    <Table
                        data={this.state.data}
                        date={this.state.dateText}
                        year={this.state.year}
                        month={this.state.month}
                        dayri={this.state.dayri}
                        hour={this.state.hour}
                        ref="table"
                        nav={this.props.navigator}/>
                    :
                    null
                }
              </View>
            </ScrollView>

                 {
                     this.state.showDate?
                         <View style={styles.picker}>
                           <View style={ {flex:1,flexDirection:'row',  backgroundColor:"#EBEBEB"}}>
                             <Text style={{flex:1}}></Text>
                             <TouchableOpacity onPress={this.cancel}>
                               <Text style={styles.dateText}>取消</Text>
                             </TouchableOpacity>
                             <TouchableOpacity onPress={this.complete}>
                               <Text style={styles.dateText}>完成</Text>
                             </TouchableOpacity>
                           </View>
                           <View style={{flex:1,justifyContent:'center',alignItems:"center",marginBottom:40}}>
                             <DatePickerIOS
                                 maximumDate={new Date()}
                                 onDateChange={this.dateChange}
                                 date={this.state.dateIOS}
                                 mode={this.state.mode}/>
                           </View>
                         </View>
                         : null
                     }
          </View>
          <Loading display={this.state.isLoading}/>




        </View>
    );
  }
});

var styles = StyleSheet.create({
  flex:{
    flex:1
  },
  picker:{
    position:'absolute',
    flex:1,
    bottom:0,
    left:0,
    right:0,
    borderTopWidth:pt,
    borderTopColor:'#767676',
    backgroundColor:"#fff"
  },
  row:{
    flexDirection:'row'
  },
  search:{
    height:35,
    width:110,
    borderWidth:1,
    paddingLeft:5,
    borderRadius:4,
    borderColor:'#ccc',
    fontSize:13
  },
  inputCenter:{
    width:300
  },
  date:{
    textAlign:'center',
    fontSize:14,
    color: '#333'
  },
  dateText:{
    fontSize:14,
    width:50,
    borderWidth:1,
    textAlign:'center',
    marginTop:5,
    marginBottom:5,
    marginRight:5,
    height:30,
    lineHeight:21,
    borderColor:'#14B3FF',
    borderRadius:4
  },
  slide: {
    flex: 1
  },
  loadingView:{
    flex:1,
    height:200,
    justifyContent:'center',
    alignItems:'center'
  },

  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 5,
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  buttonGroupFirst: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  buttonGroupLast: {
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  buttonIcon: {
    width: 14,
    height: 14,
    marginRight: 10
  }
});


module.exports = Errors;




