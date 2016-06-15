/**
 * Created by mikejay on 15/10/27.
 */

var React = require('react-native');

var {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    } = React;

module.exports = React.createClass({
    getInitialState() {
        return {
            active: false
        };
    },

    _onHighlight() {
        this.setState({active: true});
    },

    _onUnhighlight() {
        this.setState({active: false});
    },

    render() {
        var colorStyle = {
            color: this.state.active ? '#fff' : '#000'
        };
        return (
            <TouchableHighlight
                onHideUnderlay={this._onUnhighlight}
                onPress={this.props.onPress}
                onShowUnderlay={this._onHighlight}
                style={[styles.button, this.props.style]}
                underlayColor="#a9d9d4">
                <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
            </TouchableHighlight>
        );
    }
});

var styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        flex: 1,
        height: 44,
        justifyContent: 'center',
        overflow: 'hidden'
    },
    buttonText: {
        fontSize: 18,
        margin: 5,
        textAlign: 'center'
    },
    modalButton: {
        marginTop: 10
    }
});