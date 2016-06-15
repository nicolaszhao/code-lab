
/*!
 *
 * @author: lh_wang@ctrip.com
 * @time: 2015-10-21
 * @module: 满足报错大盘轮播效果的slider
 *
 */

var React = require('react-native');
var Dimensions = require('Dimensions');
var TimerMixin = require('react-timer-mixin');

var {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} = React;

var { width, height } = Dimensions.get('window');

module.exports = React.createClass({

  /**
   * 属性校验
   * @type {Object}
   */
  propTypes: {
    horizontal                       : React.PropTypes.bool,
    children                         : React.PropTypes.node.isRequired,
    style                            : View.propTypes.style,
    pagingEnabled                    : React.PropTypes.bool,
    showsHorizontalScrollIndicator   : React.PropTypes.bool,
    showsVerticalScrollIndicator     : React.PropTypes.bool,
    bounces                          : React.PropTypes.bool,
    scrollsToTop                     : React.PropTypes.bool,
    removeClippedSubviews            : React.PropTypes.bool,
    automaticallyAdjustContentInsets : React.PropTypes.bool,
    showsPagination                  : React.PropTypes.bool,
    showsButtons                     : React.PropTypes.bool,
    loop                             : React.PropTypes.bool,
    index                            : React.PropTypes.number,
    renderPagination                 : React.PropTypes.func,
  },

  mixins: [TimerMixin],

  /**
   * Default props
   * @return {object} props
   * @see http://facebook.github.io/react-native/docs/scrollview.html
   */
  getDefaultProps() {
    return {
      horizontal                       : true,
      pagingEnabled                    : true,
      showsHorizontalScrollIndicator   : false,
      showsVerticalScrollIndicator     : false,
      bounces                          : false,
      scrollsToTop                     : false,
      removeClippedSubviews            : true,
      automaticallyAdjustContentInsets : false,
      showsPagination                  : true,
      showsButtons                     : false,
      loop                             : true,
      index                            : 0
    }
  },

  /**
   * 初始化状态
   * @return {object} states
   */
  getInitialState() {
    let props = this.props;

    let initState = {
      isScrolling: false
    };

    initState.total = props.children
      ? (props.children.length || 1)
      : 0;

    //获取最大index，容错处理
    initState.index = initState.total > 1
      ? Math.min(props.index, initState.total - 1)
      : 0;

    //默认水平
    initState.dir = props.horizontal == false ? 'y' : 'x';
    initState.width = props.width || width;
    initState.height = props.height || height;
    initState.offset = {};

    if(initState.total > 1) {
      let setup = props.loop ? 1 : initState.index;
      initState.offset[initState.dir] = initState.dir == 'y'
        ? initState.height * setup
        : initState.width * setup;
    }

    return initState
  },

  //处理传入的函数
  componentWillMount() {
    this.props = this.injectState(this.props)
  },


  componentDidMount() {

  },

  /**
   * Scroll begin handle
   * @param  {object} e native event
   */
  onScrollBegin(e) {
    // update scroll state
    this.setState({
      isScrolling: true
    });

    this.setTimeout(() => {
      this.props.onScrollBeginDrag && this.props.onScrollBeginDrag(e, this.state, this)
    })
  },

  /**
   * Scroll end handle
   * @param  {object} e native event
   */
  onScrollEnd(e) {

    // update scroll state
    this.setState({
      isScrolling: false
    });

    this.updateIndex(e.nativeEvent.contentOffset, this.state.dir)

    // Note: `this.setState` is async, so I call the `onMomentumScrollEnd`
    // in setTimeout to ensure synchronous update `index`
    this.setTimeout(() => {
      // if `onMomentumScrollEnd` registered will be called here
      this.props.onMomentumScrollEnd && this.props.onMomentumScrollEnd(e, this.state, this)
    })
  },

  /**
   * Update index after scroll
   * @param  {object} offset content offset
   * @param  {string} dir    'x' || 'y'
   */
  updateIndex(offset, dir) {

    let state = this.state;
    let index = state.index;
    let diff = offset[dir] - state.offset[dir];
    let step = dir == 'x' ? state.width : state.height;

    // Do nothing if offset no change.
    if(!diff) return;

    // Note: if touch very very quickly and continuous,
    // the variation of `index` more than 1.
    index = index + diff / step;

    if(this.props.loop) {
      if(index <= -1) {
        index = state.total - 1;
        offset[dir] = step * state.total;
      }

      else if(index >= state.total) {
        index = 0;
        offset[dir] = step;
      }
    }

    this.setState({
      index: index,
      offset: offset,
    })
  },

  scrollTo(index) {
    if(this.state.isScrolling) return;
    let state = this.state;
    let diff = (this.props.loop ? 1 : 0) + index + this.state.index;
    let x = 0;
    let y = 0;
    if(state.dir == 'x') x = diff * state.width;
    if(state.dir == 'y') y = diff * state.height;
    this.refs.scrollView && this.refs.scrollView.scrollTo(y, x);

    // update scroll state
    this.setState({
      isScrolling: true
    })
  },


  injectState(props) {
    for(let prop in props) {
      if(typeof props[prop] === 'function'
        && prop !== 'onMomentumScrollEnd'
        && prop !== 'renderPagination'
        && prop !== 'onScrollBeginDrag'
      ) {
        let originResponder = props[prop];
        props[prop] = (e) => originResponder(e, this.state, this);
      }
    }

    //重新构建
    /*
    * function(e, state, context){
    *   //TODO: ..
    * }
    *
    * */
    return props
  },


  render() {
    let state = this.state;
    let props = this.props;
    let children = props.children;
    let index = state.index;
    let total = state.total;
    let loop = props.loop;
    let dir = state.dir;
    let key = 0;

    let pages = [];
    let pageStyle = [{width: state.width, height: state.height}];

    if(total > 1) {
      pages = Object.keys(children);
      if(loop) {
        pages.unshift(total - 1);
        pages.push(0)
      }
      pages = pages.map((page, i) =>
        <View style={pageStyle} key={i}>{children[page]}</View>
      )
    }else{
      pages = <View style={pageStyle}>{children}</View>;
    }

    return (
      <View style={[styles.container, {
        width: state.width,
        height: state.height
      }]}>
        <ScrollView ref="scrollView"
          {...props}
          contentContainerStyle={[styles.wrapper, props.style]}
          contentOffset={state.offset}
          onScrollBeginDrag={this.onScrollBegin}
          onMomentumScrollEnd={this.onScrollEnd}>
          {pages}
        </ScrollView>
      </View>
    )
  }
});


/**
 * 默认样式
 * @type {StyleSheetPropType}
 */
let styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'relative'
  },

  wrapper: {
    backgroundColor: 'transparent'
  },

  slide: {
    backgroundColor: 'transparent'
  },

  pagination_x: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent'
  },

  pagination_y: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent'
  },

  title: {
    height: 30,
    justifyContent: 'center',
    position: 'absolute',
    paddingLeft: 10,
    bottom: -30,
    left: 0,
    flexWrap: 'nowrap',
    width: 250,
    backgroundColor: 'transparent'
  },

  buttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  buttonText: {
    fontSize: 50,
    color: '#007aff',
    fontFamily: 'Arial'
  }
});
