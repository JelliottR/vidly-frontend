import { Component } from 'react';
import auth from '../services/authService';

import { rootUrl } from '../config.json';

class Logout extends Component {
	componentDidMount() {
		auth.logout();
		window.location = rootUrl;
	}

	render() {
		return null;
	}
}

export default Logout;
