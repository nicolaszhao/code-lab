/**
 * Created by mikejay on 15/9/23.
 */
var React = require('react-native');

var {
    StyleSheet,
    View,
    Text,
    ActivityIndicatorIOS
    } = React;

var loading=React.createClass({
    styles:StyleSheet.create({
        absoluteFlex:{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor:'transparent',
            alignItems: 'center',
            justifyContent: 'center'
        },
        maskA: {
            backgroundColor: '#333',
            opacity: 0.5
        },
        maskB: {
            width: 70,
            height: 70,
            backgroundColor: '#333',
            borderWidth: 10,
            borderColor: '#333',
            borderRadius: 10,
            opacity: 0.7
        },
        indicator:{
            marginTop:3,
            marginLeft:3
        },
        text:{
            color:'#FFF',
            fontWeight:'bold'
        }
    }),
    render:function(){
        return !!this.props.display?
            ( <View style={[this.styles.absoluteFlex,{top: this.props.top || 0}]}>
                <View style={[this.styles.absoluteFlex,this.styles.maskA]} />
                <View style={[this.styles.absoluteFlex]}>
                    <View style={[this.styles.maskB]}></View>
                </View>
                <View style={this.styles.absoluteFlex}>
                    <ActivityIndicatorIOS
                        style={this.styles.indicator}
                        animating={!!this.props.display}
                        size="large" />
                    <Text style={this.styles.text}>加载中</Text>
                </View>
            </View>
            ):null;
    }
});

module.exports=loading;