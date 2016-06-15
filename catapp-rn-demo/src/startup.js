import React, {
    Component,
    Navigator
} from 'react-native';

import fetch from './app/utils/fetch';
import storage from './app/utils/userStorage.js';
import { CHECK_TOKEN_REQUEST } from './app/config/requestUrls';
import Home from './app/pages/Home/Home.component.js';
import SignIn from './app/pages/SignIn/SignIn.component.js';

class CatApp2016 extends Component {
    componentWillMount() {
        var that = this;

        // redirect to signin
        this._checkToken().catch(function() {
            that.refs.navigator.push({pathname: '/signin', component: SignIn});
        });
    }

    render() {
        return (
            <Navigator
                ref="navigator"
                initialRoute={{pathname: '/home', component: Home}}
                configureScene={() => {
			        return Navigator.SceneConfigs.FloatFromRight;
			    }}
                renderScene={this._renderScene}
                />
        );
    }

    _renderScene(route, navigator) {
        let Component = route.component;
        return <Component {...route.passProps} {...route.params} navigator={navigator} />
    }

    _checkToken() {
        return new Promise(function(resolve, reject) {
            storage.token()
                .then(function(token) {
                    if (!token) {
                        return reject();
                    }

                    fetch(CHECK_TOKEN_REQUEST, {
                        params: {
                            token: token
                        }
                    })
                        .then(function(ret) {
                            ret ? resolve() : reject();
                        })
                        .catch(function(err) {
                            reject(err);
                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    }
}

export default CatApp2016;
