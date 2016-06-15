/*!
 *
 * @author: lh_wang@ctrip.com
 * @time: 2015-10-26
 * @module: 向右的箭头
 *
 */

var React = require('react-native');
var Util = require('./util');

var {
  StyleSheet,
  Text,
  View
  } = React;

module.exports = React.createClass({
  render: function(){
    return (
      <View style={[styles.position]}>
        <View style={styles.go}>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  position:{
    position:'absolute',
    right:10,
    top:16
  },
  go:{
    borderTopWidth: 4 * Util.pixel,
    borderRightWidth: 4 * Util.pixel,
    width:8,
    height:8,
    transform: [{rotate: '45deg'}],
    borderColor:'#ABABAB'
  }
});