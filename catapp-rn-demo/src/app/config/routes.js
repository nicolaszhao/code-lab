import SignIn from '../pages/SignIn/SignIn.component';
import Pending from '../pages/Pending/Pending.component';
import Home from '../pages/Home/Home.component.js';
import Settings from '../pages/Settings/Settings.component';

var routes = [
	{
		pathname: '/',
		component: Home
	},
	{
		pathname: '/home',
		component: Home
	},
	{
		pathname: '/signin',
		component: SignIn
	},
	{
		pathname: '/pending/:message/:state',
		component: Pending
	},
	{
		pathname: '/charts/settings',
		component: Settings
	}
];

export default routes;